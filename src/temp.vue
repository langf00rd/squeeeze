<template>
  <!-- <div class="post-card" v-if="fullyLoaded"> -->
  <div>
    <div class="post-card">
      <div @click="viewPhoto()">
        <!-- <v-lazy-image
          class="post-image"
          :src="webp"
          :alt="title"
          :src-placeholder="webp"
        /> -->

        <v-lazy-image
          class="post-image"
          :src="webp"
          :alt="title"
          :src-placeholder="thumbnail"
        />

        <!--       <image-loader
        :src="webp"
        class="post-image"
        width="100%"
        height="auto"
      /> -->
      </div>

      <span>
        <div class="bottom">
          <p class="post-title">{{ title }}</p>

          <svg
            @click="showPostDialog = !showPostDialog"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2b2b2b"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-more-horizontal"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </span>

      <div class="poster-info" @click='viewUser()'>
        <v-lazy-image
          class="poster-image"
          :src="posterProfilePhoto"
          :src-placeholder="thumbnail"
        />

        <b>{{ posterName }}</b>
      </div>
    </div>
    <br />

    <div class="dialog-sheet" v-if="showPostDialog" key="postDialog">
      <h1 class="closeDialogBtn" @click="showPostDialog = false">&times;</h1>
      <!--  <div @click="save()" v-if="!isSaved && isSignedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>Save
      </div>
      <div @click="removeSaved()" v-if="isSaved && isSignedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Saved!</div> -->
      <div @click="downloadPhoto()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-download"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download
      </div>
      <div @click="sharePhoto()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#242424"
          stroke="#242424"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-share-2"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        Share to...
      </div>
      <div @click="openCollectionDialog()" v-if="isSignedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add to collection
      </div>
      <router-link to="/login" v-if="!isSignedIn" class="primary-color"
        >Login / Signup</router-link
      >
      <router-link to="/feedback" v-if="isSignedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-slash"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        Block / hide</router-link
      >
      <div
        @click="deletePhoto()"
        v-if="isMyPhoto && isSignedIn"
        class="primary-color"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="red"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Delete photo
      </div>
    </div>

    <div
      class="dialog-sheet"
      v-if="showCollectionDialog"
      key="collectionDialog"
      style="max-height: 60vh; overflow-y: scroll;"
    >
      <h1 class="closeDialogBtn" @click="closeCollectionDialog()">&times;</h1>

      <!-- <div v-if="loading" class="loading-more" style="padding-left: 0">
        <div class="big-spin">
          <div class="small-spin"></div>
        </div>
      </div> -->

      <div class="loading-more" style="width: 100%; padding-left: 0">
        <half-circle-spinner
          v-if="loading"
          :animation-duration="1000"
          :size="30"
          color="#242424"
        />
      </div>

      <span class="dialog-main" v-if="!loading">
        <p
          class="title"
          style="margin-bottom: 0; margin-top: -124px; font-size: 20px;"
        >
          Choose a collection
        </p>
        <div @click="goToCreateCollection()" class="custom-link">
          <div class="custom-link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="middle-bottom-nav feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <p>New collection</p>
        </div>

        <span v-if="hasCollection">
          <div
            style="width: auto"
            v-for="collection in collections"
            :key="collection.id"
          >
            <div>
              <div class="collection-card" @click="getPostInfo(collection.id)">
                <v-lazy-image
                  class="collection-photo"
                  :src="collection.photo"
                />
                <div class="name-num">
                  <p class="collection-name">{{ collection.collectionName }} <span v-if='collection.isPublic == false'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#313131" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>

                  </span> </p>
                  <p class="collection-num" v-if="collection.photosNum === 1">
                    {{ collection.photosNum }} photo
                  </p>
                  <p
                    class="collection-num"
                    v-if="collection.photosNum > 1 || collection.photosNum <= 0"
                  >
                    {{ collection.photosNum }} photos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import AddCollectionCard from "@/components/AddCollectionCard";
import VLazyImage from "v-lazy-image";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "PostCard",

  data() {
    return {
      webp: "",
      fullyLoaded: false,
      showPostDialog: false,
      showCollectionDialog: false,
      isSaved: false,
      isMyPhoto: false,
      isSignedIn: false,
      srcPlaceholder:
        "https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg",

      loading: true,
      hasCollection: false,
      collections: [],
      routeId: this.$route.params.id,
      newId: "",

      posterName: '',
      posterProfilePhoto: '',

      // posterId: "",
      // photoUrl: "",
      // title: "",
    };
  },

  components: {
    VLazyImage,
    AddCollectionCard,
    HalfCircleSpinner,
  },

  props: {
    photoUrl: {
      type: String,
      default: "",
      required: true,
    },

    posterId: {
      type: String,
      default: "",
      required: true,
    },

    title: {
      type: String,
      default: "",
      required: true,
    },

    id: {
      type: String,
      default: "",
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
      required: true,
    },
  },

  mounted() {
    // this.checkSaved();
    this.checkIsMyPhoto();
    this.checkAuthState();
    this.checkLoaded()
    this.getPosterInfo();
  },

  created() {
    this.changeToWebp();
  },

  watch: {
    $route(to, from) {
      this.showPostDialog = false;
    },

    $props: {
      handler(val) {
        // console.log('handler or something', val.id)
        this.newId = val.id;
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {

    viewUser() {
      this.$router.push({
        name: "User",
        params: {
          id: this.posterId,
        },
      });
    },


    async getPosterInfo() {
      await db
        .collection("Users")
        .doc(this.posterId)
        .onSnapshot((doc) => {
          this.posterName = doc.data()["name"];
          this.posterProfilePhoto = doc.data()["photoUrl"];
        })
    },

    checkLoaded() {
      // console.log('checking...')
      // let ele = document.querySelector('.post-image')
      // console.log(ele)
      // ele.style.background = 'red'
    },

    async getPostInfo(collectionId) {
      // console.log(id)
      // this.loading = true

      this.showCollectionDialog = false;
      this.showPostDialog = false;
      await db
        .collection("Posts")
        .doc(this.newId)
        .get()
        .then((doc) => {
          this.photoUrl = doc.data()["photo"];
          this.posterId = doc.data()["posterUid"];
          this.title = doc.data()["title"];
          this.chooseCollection(collectionId);

          console.log(this.title);
        })
        .catch((err) => {
          // this.loading = false;
          console.log(err.message);
        });
    },

    async chooseCollection(collectionId) {
      console.log("choosing collection...", collectionId);
      const myId = localStorage.getItem("uid");
      await db
        .collection("Collections")
        .doc(collectionId)
        .collection("Photos")
        .doc(this.newId)
        .set({
          posterUid: this.posterId,
          photo: this.photoUrl,
          title: this.title,
          savedTime: firebaseApp.serverTimestamp,
          postId: this.newId,
        })
        .then((val) => {
          this.updatePhoto(collectionId);
          this.updatePhotosNum(collectionId);
        })
        .catch((err) => {
          // this.loading = false
          console.log(err.message);
        });
    },

    async updatePhoto(collectionId) {
      console.log("updating photo...", collectionId);

      await db
        .collection("Collections")
        .doc(collectionId)
        .update({
          // 'photo': this.webp
          photo: this.photoUrl,
        })
        .then((val) => {
          // this.refreshData()
          // this.loading = false
          console.log("Added to collection...");
        });
    },

    async updatePhotosNum(collectionId) {
      console.log("updating photo num...", collectionId);
      var num;

      await db
        .collection("Collections")
        .doc(collectionId)
        .get()
        .then((doc) => {
          num = doc.data()["photosNum"] + 1;
        })
        .catch((err) => {
          console.log(err.message);
        });

      await db
        .collection("Collections")
        .doc(collectionId)
        .update({
          photosNum: num,
        })
        .then((val) => {
          //TODO
          // this.collectionPhotosNum = this.collectionPhotosNum + 1
          // this.refreshData()
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    goToCreateCollection() {
      this.$router.push({
        name: "NewCollection",
        params: {
          id: this.$route.params.id,
        },
      });
    },

    async checkCollections() {
      await db
        .collection("Collections")
        .where("owner", "==", localStorage.getItem("uid"))
        .orderBy("created", "desc")
        // .get()
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.hasCollection = true;
            this.loading = false;
            this.collections = [];

            snapshot.forEach((doc) => {
              let collection = doc.data();
              collection.id = doc.id;
              this.collections.push(collection);
            });
          } else {
            this.loading = false;
            this.hasCollection = false;
          }
        });
    },

    openCollectionDialog() {
      this.showCollectionDialog = true;
      this.showPostDialog = false;
      this.checkCollections();
    },

    closeCollectionDialog() {
      this.showCollectionDialog = false;
    },

    addToCollection() {
      this.$router.push({
        name: "Collection",
        params: {
          id: this.newId,
        },
      });
    },

    convertImgToBase64URL(url, callback, outputFormat) {
      var img = new Image();
      var t = this;
      img.crossOrigin = "Anonymous";

      img.onload = function() {
        var canvas = document.createElement("CANVAS"),
          ctx = canvas.getContext("2d"),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat);

        canvas.toBlob(
          (dataURL) => {
            var uri = URL.createObjectURL(dataURL);
            var img = new Image();

            img.src = uri;
            t.webp = img.src;
            // document.querySelector('.post-image').src = img.src

            img.onload = function() {
              setTimeout(() => {
                t.fullyLoaded = true;
                // console.log(t.id)
              }, 1000);
              // img.style.background = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'
            };
          },
          "image/webp",
          0.3
        );
      };
      img.src = url;
    },

    changeToWebp() {
      this.convertImgToBase64URL(this.photoUrl, function(base64Img) {});
    },

    checkAuthState() {
      if (
        localStorage.getItem("uid") != null &&
        localStorage.getItem("photoUrl") != null &&
        localStorage.getItem("name") != null
      ) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    },

    checkIsMyPhoto() {
      const myId = localStorage.getItem("uid");

      if (this.posterId == myId) {
        this.isMyPhoto = true;
      } else {
        this.isMyPhoto = false;
      }
    },

    async checkSaved() {
      const myId = localStorage.getItem("uid");

      if (myId != null) {
        await db
          .collection("Users")
          .doc(myId)
          .collection("Saved")
          .doc(this.newId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.isSaved = true;
            } else {
              this.isSaved = false;
            }
          });
      }
    },

    async deletePhoto() {
      await db
        .collection("Posts")
        .doc(this.newId)
        .delete()
        .then((val) => {
          // alert("Photo will be deleted");
        });
    },

    async save() {
      const myId = localStorage.getItem("uid");

      if (myId != null) {
        this.isSaved = true;
        this.showPostDialog = false;

        await db
          .collection("Users")
          .doc(myId)
          .collection("Saved")
          .doc(this.newId)
          .set({
            posterUid: this.posterId,
            photo: this.photoUrl,
            title: this.title,

            savedTime: firebaseApp.serverTimestamp,
            postId: this.newId,
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert("Oops! login to save photos");
      }
    },

    async removeSaved() {
      const myId = localStorage.getItem("uid");

      if (myId != null) {
        this.isSaved = false;
        this.showPostDialog = false;

        await db
          .collection("Users")
          .doc(myId)
          .collection("Saved")
          .doc(this.newId)
          .delete()
          .then(() => {
            this.checkSaved();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert("Oops! login to remove photos");
      }
    },

    async sharePhoto() {
      this.showPostDialog = false;
      const shareData = {
        title: this.title,
        text: `Gridd photo - ${this.title} \n`,
        url: `https://grrid.netlify.app/photo/${this.newId}`,
      };

      try {
        await navigator.share(shareData);
        // alert("Photo shared! ✌️");
      } catch (err) {
        console.log("Share failed");
      }
    },

    downloadPhoto() {
      this.showPostDialog = false;
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        var blob = xhr.response;

        let randomNumber = Date.now() + Math.floor(Math.random() * 100);
        this.downloadBlob(blob, `gridd-${randomNumber}.jpg`);
      };
      xhr.open("GET", this.photoUrl);
      xhr.send();
    },

    downloadBlob(blob, name = "file.jpg") {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(blob);

      const data = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = data;
      link.download = name;

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
    },

    viewPhoto() {
      this.showPostDialog = false;
      this.$router.push({
        name: "Photo",
        params: {
          id: this.newId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .v-lazy-image {
// filter: blur(10px);
// transition: filter 0.7s;
// background-color: rgb(238, 238, 238);
// background-image: linear-gradient(
//   90deg,
//   rgb(238, 238, 238),
//   rgb(245, 245, 245),
//   rgb(238, 238, 238)
// );
// animation: 1.5s ease-in-out 0s infinite normal none running SkeletonLoading;
// }

// .v-lazy-image-loaded {
//   filter: blur(0);
// }

// .grid-container .post-card div span .box-image img {
//   position: relative;
//   display: block
// }

.poster-info {
  display: flex;
  align-items: center;
  margin-top: 6px;

  img {
    width: 25px;
    height: 25px;
    background: gainsboro;
    border-radius: 100px;
    margin-right: 10px;
    object-fit: cover;
  }
}

.v-lazy-image {
  // filter: opacity(0.3) blur(5px);
  filter: opacity(0.3);
  transition: ease 0.7s;
  background: gainsboro;
  height: 180px;
}
.v-lazy-image-loaded {
  filter: opacity(1);
  // filter: opacity(1) blur(0);
}

// .loading-more {

// }

.collection-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding-left: 0;
  margin-left: -40px;

  .collection-name {
    font-size: 16px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-left: 5px;
      margin-top: -3px;
    }
  }

  .name-num {
    line-height: 1.5;
    margin-left: -24px;
  }

  .collection-photo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 100px;
    background: #f1f1f1;
  }
}

.dialogue-sheet a,
.dialogue-sheet div {
  &:hover {
    background: #f4f4f4;
  }
}

.custom-link {
  margin-left: -40px;
  align-items: center;
}

.title {
  margin-bottom: 0px;
  margin-left: 26px;
  margin-top: -36px;
  font-size: 19px;
}

.post-card {
  margin-bottom: 10px;
  color: #000;
  cursor: pointer;

  &:hover {
    background: #fff;
  }

  .bottom {
    margin-top: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-title {
    padding: 0;
    left: 3px;
    max-width: 81%;
    text-align: left;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-size: 14px;
  }

  .poster-info {
    color: #000;
    display: flex;
    align-items: center;

    b {
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      font-size: 14px;
    }
  }

  .profile-avatar {
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }
}

.post-image {
  text-indent: -9999px;
  width: 100%;
  border-radius: 20px;
  min-height: 100px;
  min-width: 150px;
  height: auto;
  display: block;
  position: relative;
  margin-bottom: 10px;
  // background-color: rgb(238, 238, 238);
  // background-image: linear-gradient(
  //   90deg,
  //   rgb(238, 238, 238),
  //   rgb(245, 245, 245),
  //   rgb(238, 238, 238)
  // );
  // animation: 1.5s ease-in-out 0s infinite normal none running SkeletonLoading;
}

@media screen and (min-width: 320px) {
  .post-card {
    // margin: 0;
    // width: auto;
  }

  .post-card .post-top p {
    font-size: 15px;
  }

  .post-title {
    font-size: 12px;
  }
}

@media screen and (min-width: 1160px) {
  .post-card {
    // width: 272px;
    margin-bottom: 24px;
  }

  .post-card .post-top p {
    font-size: 16px;
  }
}
</style>


