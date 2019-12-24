/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		textHTML: '', // Весь HTML текст
		imageHTML: '' // Весь HTML изображений
	},
	mutations: {
		setTextHTML(state, newTextHTML) {
			state.textHTML = newTextHTML;
		},
	},
	actions: {
		async copyToClipboard({
			state,
			dispatch
		}) {
			await navigator.clipboard.writeText(state.textHTML);
			console.log('Text copied');
		}
	},
	modules: {}
});