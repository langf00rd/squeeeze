import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase';
import vueScrollBehavior from 'vue-scroll-behavior'
import VueMeta from 'vue-meta'
// import VuePageTransition from 'vue-page-transition'
// import axios from 'axios'
// import VueRandomColor from 'vue-randomcolor'
// import VueImageLoader from '@kevindesousa/vue-image-loader'
// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'


// Vue.component('VOffline', require('v-offline'));



// import Vue from 'vue'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

Vue.config.productionTip = false

// Vue.prototype.$http = axios;
Vue.use(firebase)
// Vue.use(VuePageTransition)
// Vue.use(VueRandomColor)
// Vue.use(VueImageLoader)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(vueScrollBehavior, { router: router })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
