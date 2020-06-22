/* eslint-disable */
import VueRouter from 'vue-router';

import TextEditor from './components/text_editor/TextEditor.vue';
import ImageEditor from './components/image_editor/ImageEditor.vue';
import ImageGen from './components/image_gen/ImageGen.vue';





const router = new VueRouter({
	routes: [{
			path: '/',
			component: TextEditor,
		},
		{
			path: '/image-gen',
			component: ImageGen,
		},
		{
			path: '/image-editor',
			component: ImageEditor,
		}
	],
	// mode: 'history'
});


export default router;