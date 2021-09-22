<template>
  <div>
    <div class="upload-form">
      <div class="header">
        <div class="header-wrapper">
          <div class="logo">Squ <span>eee</span> ze</div>
          
          <div v-if="imgFile == null"></div>
          <div @click="download()" v-if="imgFile != null && !loading" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            
            Download
          </div>
        </div>
      </div>
      <div v-if="!loading">
        <div>
          <div class="preview-images"  v-if="imgFile != null">
            <img class="preview" height="268" width="356" :src="previewImg" />
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="dodgerblue" stroke="dodgerblue" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <img class="preview" height="268" width="356" :src="compressedImagePreview" />
          </div>

          <div class="sizes"  v-if="imgFile != null">
            <div>{{originalSize}}mb</div>
            <div>{{compressedSize}}mb</div>
          </div>

          <div class="choose-photo-btn" @click="click1">Choose photo</div>
          <br />

          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="previewImage"
            accept="image/*"/>
        </div>
      </div>

      <div class="no-data" v-if="loading">
        Squeeezing 💪
      </div>
      <div class="footer">&copy;2021 All Rights Reserved Squeeeze</div>
      <vue-topprogress
        ref="topProgress"
        :height="topProgressHeight"
        colorShadow="=dodgerblue"
        color="dodgerblue"
      ></vue-topprogress>
    </div>
  </div>
</template>

<script>
import "./styles/style.css";
import imageCompression from "browser-image-compression";
import { vueTopprogress } from "vue-top-progress";
import VOffline from "v-offline";

export default {
  name: "app",

  data: () => ({
    onLine: null,
    onlineSlot: "online",
    offlineSlot: "offline",
    topProgressHeight: 5,

    previewImg: null,
    imgFile: null,
    loading: false,
    compressedImage: null,
    compressedImagePreview: null,

    fileName: '',
    originalSize: 0,
    compressedSize: 0,
  }),

  components: {
    VOffline,
    vueTopprogress,
  },

  methods: {
    amIOnline(e) {
      this.onLine = e;
    },

    click1() {
      this.$refs.input1.click();
    },

    download() {
      try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(this.compressedImage);

        const data = window.URL.createObjectURL(this.compressedImage);

        const link = document.createElement("a");
        link.href = data;
        link.download = `${Date.now()}-squeeezed.jpg`;

        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      } catch(e) {
        console.log(e)
      }
    },

    async previewImage(event) {
      this.imgFile = event.target.files[0];
      this.loading = true;
      this.$refs.topProgress.start();
      this.previewImg = URL.createObjectURL(this.imgFile);

      const options = {
        maxSizeMB: 0.6,
        maxWidthOrHeight: 1500,
        useWebWorker: true,
      };

      try {
        if (
          this.imgFile.type == "image/png" ||
          this.imgFile.type == "image/jpg" ||
          this.imgFile.type == "image/jpeg"
        ) {
          const compressedFile = await imageCompression(this.imgFile, options);

          this.originalSize = (this.imgFile.size / 1024 / 1024).toFixed(2)
          this.compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2)
          this.fileName = this.imgFile.name

          this.compressedImage = compressedFile;
          this.loading = false;
          this.$refs.topProgress.done();

          this.compressedImagePreview = URL.createObjectURL(this.compressedImage)

          console.log(this.compressedImage, this.imgFile)
        } else {
          alert("File is not an image");
          this.loading = false;
          this.$refs.topProgress.done();

          this.previewImg = null
          this.imgFile = null
          this.loading = false
          this.compressedImage = null
          this.compressedImagePreview = null
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.$refs.topProgress.done();
      }
    },
  },
};
</script>