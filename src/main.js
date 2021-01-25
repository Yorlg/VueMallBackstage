import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	if (sessionStorage.getItem("uname")) {
		axios.defaults.headers.common['token'] = sessionStorage.getItem("token") //全局token	//利用路由守卫将token发送
		next()
	} else {
		next()
	}

})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
