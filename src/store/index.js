/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		options: {
			genNum: '',
			genRangeStart: '',
			genRangeEnd: '',
			genExact: '',
			genPass: '',
			genDescription: false,
			genPng: false,
			genSelectClass: '',
			genAddClass: '',
			genWrapClass: '',
			genPath: '',
			genTopMargin: '2',
			genBottomMargin: '2',
			genBottomMarginDescription: '1',
			genTopCode: '',
			genBottomCode: ''
		}, //Настройки 
		textHTML: '', // Весь HTML текст
		imageHTML: '', // Весь HTML изображений
		arrImageHTML: [], // Весь HTML изображений массивом
		genHTML: '', // Весь HTML сгенерированный
		arrGenHTML: [] // Весь HTML сгенерированный массивом
	},
	mutations: {
		setOptions(state, newOptions) {
			state.options = newOptions;
		},
		setTextHTML(state, newTextHTML) {
			state.textHTML = newTextHTML;
		},
		setArrImageHTML(state, newArrImageHTML) {
			state.arrImageHTML = newArrImageHTML;
		},
		setImageHTML(state, newImageHTML) {
			state.imageHTML = newImageHTML;
		},
		setArrGenHTML(state, newArrGenHTML) {
			state.arrGenHTML = newArrGenHTML;
		},
		setGenHTML(state, newGenHTML) {
			state.genHTML = newGenHTML;
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
		},
		async copyToClipboardGen({
			state,
			dispatch
		}) {
			await navigator.clipboard.writeText(state.genHTML);
			console.log('Text copied');
		}
	},
	modules: {}
});