import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from "./store";
import router from './routes';
import 'normalize.css';
import './assets/css/style.css';

Vue.use(VueRouter);

Vue.config.productionTip = false;



new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')