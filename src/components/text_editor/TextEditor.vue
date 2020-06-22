
<template>
  <div class="editor">
    <div class="top">
      <Header></Header>
    </div>

    <ckeditor :editor="editor" v-model="editorData" @ready="onReady" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapState } from 'vuex';
import CKEditor from '@ckeditor/ckeditor5-vue';
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ru';

import Header from './Header.vue';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
// import {
//   Blockquote,
//   // CodeBlock,
//   HardBreak,
//   Heading,
//   HorizontalRule,
//   OrderedList,
//   BulletList,
//   ListItem,
//   TodoItem,
//   TodoList,
//   Bold,
//   // Code,
//   Italic,
//   Link,
//   Strike,
//   Underline,
//   History,
//   Focus
// } from 'tiptap-extensions';

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    Header,
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: DocumentEditor,
      editorData: '',
      editorConfig: {
				language: 'ru'
			}

      // editor: new Editor({
      //   extensions: [
      //     new Blockquote(),
      //     new BulletList(),
      //     // new CodeBlock(),
      //     new HardBreak(),
      //     new Heading({ levels: [1, 2, 3] }),
      //     new HorizontalRule(),
      //     new ListItem(),
      //     new OrderedList(),
      //     new TodoItem(),
      //     new TodoList(),
      //     new Link(),
      //     new Bold(),
      //     // new Code(),
      //     new Italic(),
      //     new Strike(),
      //     new Underline(),
      //     new History(),
      //     new Focus({
      //       className: 'has-focus',
      //       nested: true
      //     })
      //   ],
      //   autoFocus: true,
      //   onUpdate: ({ getHTML, getJSON }) => {
      //     this.textHTML = getHTML();
      //     // this.textJSON = getJSON();
      //   }
      // })
    };
  },
  computed: {
    /*    ...mapState({
      textHTML: state => state.textHTML
    }), */
    /*    textJSON: {
      get() {
        return this.$store.state.textJSON;
      },
      set(value) {
        this.$store.commit('setTextJSON', value);
      }
    }, */
    textHTML: {
      get() {
        return this.$store.state.textHTML;
      },
      set(value) {
        this.$store.commit('setTextHTML', value);
      }
    }
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );

      // CKEditorInspector.attach(editor);
    }
  },
  mounted() {
    // this.editor.setContent(this.textHTML);
  },
  beforeDestroy() {
    // this.editor.destroy();
  }
};
</script>

<style scoped>
.top {
  position: sticky;
  top: 0;
  padding-top: 0.5rem;
  background-color: hsl(var(--main-color));
  z-index: 1;
}

.editor__content {
  min-height: 15rem;
  padding: 0.1rem;
  background-color: #fff;
}

.menubar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.menubar button {
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
  border: 1px solid hsl(var(--accent-color));
  cursor: pointer;
}

.menubar button.is-active {
  background-color: hsl(var(--accent-color));
}

.btn-editor-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-weight: 700;
}

.btn-editor-img {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
