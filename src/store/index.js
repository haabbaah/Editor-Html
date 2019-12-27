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
		mergedText: '', // Объедененный текст с картинками
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
		},
		async mergeWithText({
			state,
			dispatch
		}, type) {
			let arrMerged = [];
			if (type === 1) {
				arrMerged = state.arrGenHTML;
			} else {
				arrMerged = state.arrImageHTML;
			}

			let str = `<p>Результат аналогичен&nbsp;[...str].</p><p>Но между&nbsp;Array.from(obj)&nbsp;и&nbsp;[...obj]&nbsp;есть разница:</p><ul><li><p>Array.from&nbsp;работает как с псевдомассивами, так и с итерируемыми объектами</p></li><li><p>Оператор расширения работает только с итерируемыми объектами</p></li></ul><p>Выходит, что если нужно сделать из чего угодно массив, то&nbsp;Array.from&nbsp;— более универсальный метод.</p><p>У него 3 отличия от&nbsp;match:</p><ol><li><p>Он возвращает не массив, а перебираемый объект с результатами, обычный массив можно сделать при помощи&nbsp;Array.from.</p></li><li><p>Каждое совпадение возвращается в виде массива со скобочными группами (как&nbsp;str.match&nbsp;без флага&nbsp;g).</p></li><li><p>Если совпадений нет, то возвращается не&nbsp;null, а пустой перебираемый объект.</p></li></ol><p>Пример использования:</p>`;


			arrMerged = ['qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'ttttttttttttttttttttttttttttttt', 'dddddddddddddddddddddddddddddddddddddd', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'];
			let counterArr = 0;
			let arrLength = arrMerged.length;
			// let arrLength = 6;

			let regexp = /<\/p><p>|<\/ul><p>|<\/ol><p>/g;

			let matchAll = str.matchAll(regexp);
			let arrMatchAll = Array.from(matchAll);
			let freePlace = arrMatchAll.length;

			let part = 1;
			if (arrLength > freePlace) {
				part = Math.ceil(arrLength / freePlace);
			}

			// При добавлений тегов сразу меняется позиция //TODO

			for (const match of arrMatchAll) {
				switch (match[0]) {
					case '</p><p>':
						setTags(match.index + 4);
						console.log(match.index);
						break;
					case '</ol><p>':
					case '</ul><p>':
						setTags(match.index + 5);
						console.log(match.index);
						break;

					default:
						break;
				}
			}

			function setTags(position) {
				str = Array.from(str);
				str.splice(position, 0, arrMerged[counterArr]);
				str = str.join('');
				console.log(position);
				++counterArr;
			}

			console.log(str);
			// await navigator.clipboard.writeText(state.mergedText);
			// console.log('Text copied');
		}
	},
	modules: {}
});