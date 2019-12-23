import VueRouter from 'vue-router';

 import TextEditor from './components/TextEditor.vue';





const router = new VueRouter({
	routes: [{
			path: '/',
			component: TextEditor,
		},
	],
	mode: 'history'
});


export default router;