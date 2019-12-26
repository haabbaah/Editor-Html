/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		textHTML: '', // Весь HTML текст
		imageHTML: '', // Весь HTML изображений
		arrImageHTML: [] // Весь HTML изображений массивом
	},
	mutations: {
		setTextHTML(state, newTextHTML) {
			state.textHTML = newTextHTML;
		},
		setArrImageHTML(state, newArrImageHTML) {
			state.arrImageHTML = newArrImageHTML;
		},
		setImageHTML(state, newImageHTML) {
			state.imageHTML = newImageHTML;
		},
	},
	actions: {
		async copyToClipboard({
			state,
			dispatch
		}) {
			await navigator.clipboard.writeText(state.textHTML);
			console.log('Text copied');
		},
		async copyToClipboardDZImages({
			state,
			dispatch
		}) {
			await navigator.clipboard.writeText(state.imageHTML);
			console.log('Text copied');
		}
	},
	modules: {}
});