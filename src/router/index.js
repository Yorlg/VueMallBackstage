import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../components/Home.vue";
import Bas from "../components/Basicsettings.vue";
import Log from "../components/Logisticssetup.vue";
import Adm from "../components/Administrator.vue";
import Tra from "../components/Transaction.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    component: Login
  },
  { 
    path: '/Home',
    component: Home,
    children: [
      { 
        path: 'Basicsettings',
        component: Bas
      },
      { 
        path: 'Logisticssetup',
        component: Log
      },
      { 
        path: 'Administrator',
        component: Adm
      },
      { 
        path: 'Transaction',
        component: Tra
      },
      {
        path: '/Home',
        redirect: 'Basicsettings'
      },
      {
        path: '/Home',
        redirect: 'Logisticssetup'
      },
      {
        path: '/Home',
        redirect: 'Administrator'
      },
      {
        path: '/Home',
        redirect: 'Transaction'
      },
    ]
  },
  

];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
router.beforeEach((to,from,next)=>{
if(to.path=="/Login"){
		next()
	}else{
		if(sessionStorage.getItem("token")){
			next()
		}else{
      sessionStorage.setItem("Url",to.path)
			next('/Login')
		}
	}
})