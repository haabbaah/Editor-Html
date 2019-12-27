<template>
  <div class="image-editor">
    <div class="top">
      <div class="button-group main-btn">
        <button
          type="button"
          ref="btnCopyToClipboard"
          @click="copyToClipboard"
          class="button"
        >Получить</button>
        <button type="button" class="button" ref="btnGroup" @click="groupImages">объединить</button>
        <button type="button" class="button">Слияние с текстом</button>
        <button type="button" @click="removeImages" class="button alert">Очистить</button>
      </div>
    </div>

    <div class="wrapper-dz">
      <vue-dropzone
        ref="myVueDropzone"
        id="customdropzone"
        :include-styling="false"
        v-on:vdropzone-thumbnail="thumbnail"
        :options="dropzoneOptions"
        @vdropzone-queue-complete="sortImages"
        @vdropzone-files-added="addStub"
      ></vue-dropzone>

      <div class="stub" v-if="isStub"></div>
    </div>
  </div>
</template>

 <script>
/* eslint-disable */
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
// import Sortable from 'sortablejs';
import tinysort from 'tinysort';

export default {
  name: 'ImageEditorHeader',
  data: function() {
    return {
      arrRawData: [], // Массив с сырыми данными без тегов
      groupId: 0, // ID для группирования картинок
      groupColor: 'hsla(217, 23%, 51%, 1)', // Цвет для группирования картинок
      isStub: false,
      dropzoneOptions: {
        previewTemplate: this.template(),
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        maxFilesize: 50,
        addRemoveLinks: true,
        headers: { 'My-Awesome-Header': 'header value' }
      }
    };
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  computed: {
    arrImageHTML: {
      get() {
        return this.$store.state.arrImageHTML;
      },
      set(value) {
        this.$store.commit('setArrImageHTML', value);
      }
    },
    imageHTML: {
      get() {
        return this.$store.state.imageHTML;
      },
      set(value) {
        this.$store.commit('setImageHTML', value);
      }
    }
  },
  watch: {
    groupId() {
      this.groupColor = this.randomHsl();
    }
  },
  methods: {
    async copyToClipboard() {
      this.arrRawData = [];
      this.arrImageHTML = [];
      let items = document.querySelectorAll('.dz-preview');
      for (const item of items) {
        this.arrRawData.push({
          name: item.querySelector('.dz-name').textContent,
          description: item.querySelector('.dz-description').value,
          group: item.dataset.groupId
        });
      }
      this.arrRawData.sort((a, b) => this.trim(a.name) - this.trim(b.name));
      this.addTags();
      this.mergeGroup();
      this.imageHTML = this.arrImageHTML.join('');

      await this.$store.dispatch('copyToClipboardDZImages');
      this.$refs.btnCopyToClipboard.classList.add('success');
      setTimeout(() => {
        this.$refs.btnCopyToClipboard.classList.remove('success');
      }, 1000);
    },
    addTags() {
      function getFigcaption(text) {
        return `
					<figcaption itemprop="caption description">
						${text}
					</figcaption>`;
      }

      for (const rawData of this.arrRawData) {
        if (rawData.group) {
          this.arrImageHTML.push({
            id: rawData.group,
            index: +this.trim(rawData.name),
            tags: `
						<figure itemprop="associatedMedia">
							<a href="${rawData.name}" itemprop="contentUrl" data-size="">
								<img src="${rawData.name}" itemprop="thumbnail" class="item  " />
							</a>
							<figcaption itemprop="caption description">
								${rawData.description}
							</figcaption>
							<pswp__caption__center itemprop="caption description">
								<div class="caption_padding">
									${rawData.description}
								</div>
							</pswp__caption__center>
						</figure>
						`
          });
        } else {
          let isDescr = rawData.description ? true : false;
          this.arrImageHTML.push({
            id: null,
            index: +this.trim(rawData.name),
            tags: `
				
						<div class="zooming">
							<figure itemprop="associatedMedia" style="margin-top: 2rem; margin-bottom: 2rem">
								<a href="${rawData.name}" itemprop="contentUrl">
									<img src="${rawData.name}" itemprop="thumbnail" class=" " />
								</a>${isDescr ? getFigcaption(rawData.description) : ''}
							</figure>
						</div>${isDescr ? getFigcaption(rawData.description) : ''}
						`
          });
        }
      }
    },
    mergeGroup() {
      let onlyGroup = this.arrImageHTML.filter(
        (item, index, array) => !!item.id
      );
      let onlyWithoutGroup = this.arrImageHTML.filter(
        (item, index, array) => !item.id
      );

      let sortGroup = [];

      for (let i = 0; i < this.groupId; i++) {
        sortGroup[i] = onlyGroup.filter(item => item.id == i);
      }

      let sortGroupWithTags = sortGroup.map(function(item, index, array) {
        let group = '',
          min = item[0].index;
        for (const iterator of item) {
          group = group + iterator.tags;
          min = Math.min(min, iterator.index);
        }
        return {
          index: min,
          tags: `
					
					<div class="zooming sliding_gallery" itemscope style="margin:auto; margin-top: 2rem; margin-bottom: 2rem;">
						${group}
					</div>
					`
        };
      });

      let arrMerged = [...onlyWithoutGroup, ...sortGroupWithTags];

      arrMerged.sort((a, b) => a.index - b.index);

      this.arrImageHTML = [];
      for (const merge of arrMerged) {
        this.arrImageHTML.push(merge.tags);
      }
    },
    trim(name) {
      // Обрезать формат у картинки и оставить только число
      let notFormat = name.slice(0, -4);
      if (notFormat[0] == 0) {
        notFormat = notFormat.slice(1);
      }
      return notFormat;
    },
    addStub() {
      // Добавление заглушки до сортировки
      this.isStub = true;
    },
    sortImages() {
      console.log('sort');
      tinysort('.dz-preview', { selector: '.dz-name' });
      this.isStub = false;
    },
    removeImages() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.arrRawData = [];
      this.arrImageHTML = [];
      this.groupId = 0;
    },
    /*    async copyToClipboard() {
      await this.$store.dispatch('copyToClipboard');
      this.$refs.btnCopyToClipboard.classList.add('success');
      setTimeout(() => {
        this.$refs.btnCopyToClipboard.classList.remove('success');
      }, 1000);
    }, */
    template: function() {
      return `<div class="dz-preview dz-file-preview">
									<img src="" class="dz-img" data-dz-thumbnail-bg>
                <div class="dz-details">
										<div class="dz-filename"><span class="dz-name" data-dz-name></span></div>
										<textarea class="dz-description"></textarea>
                </div>
            </div>
        `;
    },
    thumbnail: function(file, dataUrl) {
      let j, len, ref, thumbnailElement;
      if (file.previewElement) {
        file.previewElement.classList.remove('dz-file-preview');
        ref = file.previewElement.querySelectorAll('[data-dz-thumbnail-bg]');
        for (j = 0, len = ref.length; j < len; j++) {
          thumbnailElement = ref[j];
          thumbnailElement.alt = file.name;
          thumbnailElement.setAttribute('src', dataUrl);
        }
      }
    },
    groupImages() {
      console.log('group');
      ++this.groupId;
      this.$refs.btnGroup.classList.add('success');
      setTimeout(() => {
        this.$refs.btnGroup.classList.remove('success');
      }, 1000);
    },
    keyNav(event) {
      if (event.ctrlKey && event.code == 'Space') {
        this.groupImages();
      }
    },
    keyDestroy() {
      document.removeEventListener('keyup', this.keyNav);
    },
    addEventForGroupingImages() {
      let customdropzone = document.getElementById('customdropzone');
      customdropzone.addEventListener(
        'click',
        event => {
          // делегирование
          let image = event.target.closest('.dz-img');
          if (!image) return;

          let parentImages = image.closest('.dz-preview');

          if (parentImages.hasAttribute('data-group-id')) {
            parentImages.removeAttribute('data-group-id');
            parentImages.style.backgroundColor = 'transparent';
          } else {
            parentImages.dataset.groupId = this.groupId;
            parentImages.style.backgroundColor = this.groupColor;
          }
        },
        false
      );
      // Запрет на перетаскивание картинок, что-бы случайно не кинуть на дроп-зону
      customdropzone.addEventListener(
        'dragstart',
        event => {
          // делегирование
          let image = event.target.closest('.dz-img');
          if (!image) return;
          event.preventDefault();
        },
        false
      );
    },
    randomHsl() {
      return 'hsla(' + Math.random() * 360 + ', 50%, 50%, 1)';
    }
    // data-group-id
    /*  ...mapActions({
      copyToClipboard: 'copyToClipboard'
    }) */
  },
  mounted() {
    this.addEventForGroupingImages();
    document.addEventListener('keyup', this.keyNav);
  },
  created() {},
  beforeDestroy() {
    this.keyDestroy();
  }
};
</script>

 <style scoped>
.main-btn {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
}

.top {
  position: sticky;
  top: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: hsl(var(--main-color));
  z-index: 1;
  margin-bottom: 2rem;
}

.top .btn {
  margin-right: 1rem;
}
</style>