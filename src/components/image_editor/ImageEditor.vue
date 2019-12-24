<template>
  <div class="image-editor">
    <div class="top">
      <button class="btn" ref="btnCopyToClipboard" @click="someMethod">Получить</button>
      <button class="btn" @click="removeImages">Удалить всё</button>
      <button class="btn" data-sort="dz-name">Sort by name</button>
    </div>

    <vue-dropzone
      ref="myVueDropzone"
      id="customdropzone"
      :include-styling="false"
      v-on:vdropzone-thumbnail="thumbnail"
      :options="dropzoneOptions"
      @vdropzone-queue-complete="sortImages"
    ></vue-dropzone>
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
  computed: {},
  watch: {},
  methods: {
    someMethod() {
      console.log(this.$refs.myVueDropzone.getAcceptedFiles());
    },
    sortImages() {
      console.log('sort');
      tinysort('.dz-preview', { selector: '.dz-name' });
    },
    removeImages() {
      this.$refs.myVueDropzone.removeAllFiles();
    },
    /*   createImages(files) {
      console.log(files);
    }, */
    async copyToClipboard() {
      await this.$store.dispatch('copyToClipboard');
      this.$refs.btnCopyToClipboard.classList.add('success');
      setTimeout(() => {
        this.$refs.btnCopyToClipboard.classList.remove('success');
      }, 1000);
    },

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
    }

    /*  ...mapActions({
      copyToClipboard: 'copyToClipboard'
    }) */
  },
  mounted() {},
  created() {}
};
</script>

 <style scoped>
.top {
  position: sticky;
  top: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: hsl(var(--main-color));
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.top .btn {
  margin-right: 1rem;
}
</style>