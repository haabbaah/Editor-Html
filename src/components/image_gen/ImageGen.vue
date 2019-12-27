<template>
  <div class="image-gen">
    <div class="top">
      <div class="top-wrapper">
        <div class="item">
          <label>
            Количество элементов
            <input
              type="text"
              class="top-input gen-num"
              data-gen="1"
              @change="setActiveField"
              v-model="genNum"
            />
          </label>
          <div class="block">
            <label>
              Диапазон
              <input
                type="text"
                class="top-input gen-range-start"
                data-gen="2"
                @change="setActiveField"
                v-model="genRangeStart"
              />
            </label>
            <p>...</p>
            <input
              type="text"
              ref="genRangeEnd"
              class="top-input gen-range-end alert"
              v-model="genRangeEnd"
              data-gen="2"
              @change="setActiveField"
            />
          </div>
        </div>
        <div class="item">
          <label>
            Только эти фото (ч-з пробел)
            <input
              type="text"
              class="top-input gen-exact"
              data-gen="3"
              @change="setActiveField"
              v-model="genExact"
            />
          </label>
          <label>
            Пропуск фото (ч-з пробел)
            <input
              type="text"
              class="top-input gen-pass"
              data-gen="4"
              @change="setActiveField"
              v-model="genPass"
            />
          </label>
        </div>
      </div>
    </div>

    <div class="button-group main-btn">
      <button
        type="button"
        ref="btnCopyToClipboard"
        @click="copyToClipboard"
        class="button"
      >Получить</button>
      <button
        type="button"
        ref="btnCopyToClipboardSlider"
        @click="copyToClipboardSlider"
        class="button"
      >Получить SLIDER</button>
      <button
        type="button"
        @click="mergeWithText"
        ref="btnMergeWithText"
        class="button"
      >Слияние с текстом</button>
      <button type="button" ref @click="clear" class="alert button">Очистить</button>
    </div>

    <div class="options">
      <div class="options-wrapper">
        <div class="item">
          <div class="inner">
            <label for="description">
              <div class="switch">
                <input
                  class="switch-input"
                  id="description"
                  type="checkbox"
                  name="description"
                  v-model="genDescription"
                />
                <label class="switch-paddle" for="description">
                  <span class="show-for-sr"></span>
                </label>
              </div>
              <p>С подписью</p>
            </label>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <label for="png">
              <div class="switch">
                <input class="switch-input" id="png" type="checkbox" name="png" v-model="genPng" />
                <label class="switch-paddle" for="png">
                  <span class="show-for-sr"></span>
                </label>
              </div>
              <p>PNG</p>
            </label>
          </div>
        </div>
        <div class="item">
          <label>
            Класс для img
            <select
              multiple
              size="3"
              class="gen-select-class"
              v-model="genSelectClass"
            >
              <option value="frame">frame</option>
              <option value="round">round</option>
              <option value="obj">obj</option>
            </select>
          </label>
        </div>
        <div class="item">
          <label>
            Добавить классы для img (ч-з пробел)
            <input
              type="text"
              class="gen-add-class"
              v-model="genAddClass"
            />
          </label>
        </div>
        <div class="item">
          <label>
            Обернуть в DIV с классом:
            <input
              type="text"
              class="gen-wrap-class"
              v-model="genWrapClass"
            />
          </label>
        </div>
        <div class="item">
          <label>
            Путь до img
            <input type="text" class="gen-path" v-model="genPath" />
          </label>
        </div>
      </div>
      <div class="options-wrapper">
        <div class="item">
          <label>
            Отступ сверху
            <input type="text" class="gen-top-margin" v-model="genTopMargin" />
          </label>
        </div>
        <div class="item">
          <label>
            Отступ снизу
            <input type="text" class="gen-bottom-margin" v-model="genBottomMargin" />
          </label>
        </div>
        <div class="item">
          <label>
            Добавить код сверху
            <textarea class="gen-top-code" v-model="genTopCode"></textarea>
          </label>
        </div>
        <div class="item">
          <label>
            Добавить код снизу
            <textarea class="gen-bottom-code" v-model="genBottomCode"></textarea>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
/* eslint-disable */
export default {
  name: '',
  data: function() {
    return {
      genNum: '',
      genRangeStart: '',
      genRangeEnd: '',
      genExact: '',
      genPass: '',
      genDescription: false,
      genPng: false,
      genSelectClass: [],
      genAddClass: '',
      genWrapClass: '',
      genPath: '',
      genTopMargin: '',
      genBottomMargin: '',
      genBottomMarginDescription: '',
      genTopCode: '',
      genBottomCode: '',

      arrNumRange: [] // Диапазон для создания элементов фото
    };
  },
  computed: {
    options: {
      get() {
        return this.$store.state.options;
      },
      set(value) {
        this.$store.commit('setOptions', value);
      }
    },
    arrGenHTML: {
      get() {
        return this.$store.state.arrGenHTML;
      },
      set(value) {
        this.$store.commit('setArrGenHTML', value);
      }
    },
    genHTML: {
      get() {
        return this.$store.state.genHTML;
      },
      set(value) {
        this.$store.commit('setGenHTML', value);
      }
    }
  },
  watch: {
    genDescription(newLocalOptions) {
      if (newLocalOptions) {
        this.genBottomMargin = this.genBottomMarginDescription;
      } else {
        this.genBottomMargin = this.options.genBottomMargin;
      }
    }
  },
  methods: {
    async mergeWithText() {
      await this.$store.dispatch('mergeWithText', 1);
      this.$refs.btnMergeWithText.classList.add('success');
      setTimeout(() => {
        this.$refs.btnMergeWithText.classList.remove('success');
      }, 1000);
    },
    async copyToClipboard() {
      this.getSingleTags();
      this.genHTML = this.arrGenHTML.join('');

      await this.$store.dispatch('copyToClipboardGen');
      this.$refs.btnCopyToClipboard.classList.add('success');
      setTimeout(() => {
        this.$refs.btnCopyToClipboard.classList.remove('success');
      }, 1000);
    },
    async copyToClipboardSlider() {
      this.getSliderTags();
      this.genHTML = this.arrGenHTML.join('');

      await this.$store.dispatch('copyToClipboardGen');
      this.$refs.btnCopyToClipboardSlider.classList.add('success');
      setTimeout(() => {
        this.$refs.btnCopyToClipboardSlider.classList.remove('success');
      }, 1000);
    },
    getSingleTags() {
      this.arrGenHTML = [];
      function getFigcaption() {
        return `
					<figcaption itemprop="caption description">
						
					</figcaption>`;
      }
      function getTopWrap(text) {
        return `<div class="${text}">
					`;
      }
      function getTopCode(text) {
        return `
					${text}
					`;
      }
      function getBottomCode(text) {
        return `${text}
					`;
      }

      for (const numRange of this.arrNumRange) {
        this.arrGenHTML.push(`
				
				 ${this.genTopCode ? getTopCode(this.genTopCode) : ''}	${
          this.genWrapClass ? getTopWrap(this.genWrapClass) : ''
        }	<div class="zooming">
							<figure itemprop="associatedMedia" style="margin-top: ${
                this.genTopMargin
              }rem; margin-bottom: ${this.genBottomMargin}rem">
								<a href="${this.genPath}${numRange}.${
          this.genPng ? 'png' : 'jpg'
        }" itemprop="contentUrl">
									<img src="${this.genPath}${numRange}.${
          this.genPng ? 'png' : 'jpg'
        }" itemprop="thumbnail" class="${this.genSelectClass.join(' ')}${
          this.genAddClass ? ` ` + this.genAddClass : ''
        }" />
								</a>${this.genDescription ? getFigcaption() : ''}
							</figure>
						</div>${this.genWrapClass ? '</div>' : ''} ${
          this.genDescription ? getFigcaption() : ''
        }
						  ${this.genBottomCode ? getBottomCode(this.genBottomCode) : ''}`);
      }
    },
    getSliderTags() {
      this.arrGenHTML = [];

      let arrLocalGenHTML = [];
      for (const numRange of this.arrNumRange) {
        arrLocalGenHTML.push(`
				
					<figure itemprop="associatedMedia">
						<a href="${this.genPath}${numRange}.${
          this.genPng ? 'png' : 'jpg'
        }" itemprop="contentUrl">
							<img src="${this.genPath}${numRange}.${
          this.genPng ? 'png' : 'jpg'
        }" itemprop="thumbnail" class="item ${this.genSelectClass.join(' ')}${
          this.genAddClass ? ` ` + this.genAddClass : ''
        }" />
						</a>
						<figcaption itemprop="caption description">

						</figcaption>
						<pswp__caption__center itemprop="caption description">
							<div class="caption_padding">

							</div>
						</pswp__caption__center>
					</figure>
				`);
      }

      this.arrGenHTML.push(`
				<div class="zooming sliding_gallery" itemscope style="margin: auto; margin-top: ${
          this.genTopMargin
        }rem; margin-bottom: ${this.genBottomMargin}rem;">
					${arrLocalGenHTML.join('')}
				</div>
			`);
    },
    setActiveField(event) {
      let data = +event.target.dataset.gen;
      switch (data) {
        case 1: // Просто число от 1 до заданного
          this.arrNumRange = [];
          for (let i = 1; i <= this.genNum; i++) {
            this.arrNumRange.push(`${i}`);
          }
          break;
        case 2: // Диапазон чисел
          if (!this.genRangeStart) {
            this.genRangeStart = '1';
          }
          if (this.genRangeEnd) {
            this.$refs.genRangeEnd.style.backgroundColor = '#fefefe';
            this.$refs.genRangeEnd.style.color = '#0a0a0a';
          } else {
            this.$refs.genRangeEnd.style.backgroundColor = '#cc4b37';
            this.$refs.genRangeEnd.style.color = '#fefefe';
          }
          this.arrNumRange = [];
          for (let i = this.genRangeStart; i <= this.genRangeEnd; i++) {
            this.arrNumRange.push(`${i}`);
          }
          break;
        case 3: // Только эти фото
          this.arrNumRange = [];
          this.arrNumRange = this.genExact.trim().split(' ');
          break;
        case 4: // Пропуск фото
          this.arrNumRange = [];
          this.arrNumRange = this.genPass.trim().split(' ');
          break;
        default:
          break;
      }
    },
    mergeOptions() {
      for (const key in this.options) {
        if (this.options[key]) {
          this[key] = this.options[key];
        }
      }
    },
    clear() {
      this.genNum = '';
      this.genRangeStart = '';
      this.genRangeEnd = '';
      this.genExact = '';
      this.genPass = '';
    }
  },
  mounted() {
    this.mergeOptions();
  },
  created() {}
};
</script> 

 <style scoped>
.top-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  align-content: space-between;
}

.top-wrapper .item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.block {
  display: flex;
  align-items: flex-end;
}

.block p {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.8;
  color: #0a0a0a;
  margin: 0 0.5rem;
  margin-bottom: 1rem;
}

.main-btn {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 2rem;
  margin-top: 3rem;
}

.options .inner {
  display: inline-block;
}

.options .inner label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.options p {
  margin-bottom: 0;
  margin-left: 1rem;
}

.options .switch,
.options select {
  margin-bottom: 0;
}

.options-wrapper .item {
  margin-bottom: 1rem;
}
</style>