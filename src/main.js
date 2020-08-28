import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex';
import StoreData from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FlashMessage from '@smartweb/vue-flash-message'
import Swal from 'sweetalert2'
import { Form, HasError, AlertError } from 'vform'
import money from 'v-money'

Vue.use(money, {precision: 2})

Vue.use(require('vue-moment'));
import { Picker } from 'emoji-mart-vue';
window.$ = window.jQuery = require('jquery');
try {
  window.Popper = require('popper.js').default;
  window.$ = window.jQuery = require('jquery');

  require('bootstrap');
  require('admin-lte');

} catch (e) {}
import 'bootstrap/dist/css/bootstrap.css';
import 'admin-lte/dist/css/adminlte.css';



import {initialize} from './helpers/general';

window.axios = require('axios');
// window.axios.defaults.baseURL = 'http://199.192.25.181';
 window.axios.defaults.baseURL = 'http://192.168.0.108';

Vue.prototype.$ipAdr = 'https://www.fxauction.trade'

// window.onbeforeunload = function() {
//   localStorage.removeItem("user");
//   return '';
// };
document.title = 'FXAuction';


import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '@fortawesome/fontawesome-free/css/brands.css'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(FlashMessage)


Vue.config.productionTip = false

window.Vue = require('vue');
window.Swal = Swal;
window.Form = Form;

// Vue.prototype.$appName = 'FXAuction'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

const store = new Vuex.Store(StoreData);

initialize(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
