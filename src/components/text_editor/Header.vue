<template>
  <div class="text-editor-header">
    <div class="get">
      <button
        type="button"
        ref="btnCopyToClipboard"
        @click="copyToClipboard"
        class="button"
      >Получить</button>
    </div>
  </div>
</template>

 <script>
/* eslint-disable */
// import { mapActions } from 'vuex';
export default {
  name: 'TextEditorHeader',
  data: function() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async copyToClipboard() {
      await this.$store.dispatch('copyToClipboard');
      this.$refs.btnCopyToClipboard.classList.add('success');
      setTimeout(() => {
        this.$refs.btnCopyToClipboard.classList.remove('success');
      }, 1000);
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
.text-editor-header {
  display: grid;
  margin-bottom: 2rem;
}
</style>