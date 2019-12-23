<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/bold.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/italic.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/strike.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/underline.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/code.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/paragraph.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <div class="btn-editor-text">H1</div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <div class="btn-editor-text">H2</div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <div class="btn-editor-text">H3</div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/ul.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/ol.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/quote.svg" alt />
          </div>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <div class="btn-editor">
            <img src="../assets/images/icons/code.svg" alt />
          </div>
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <div class="btn-editor">
            <img src="../assets/images/icons/hr.svg" alt />
          </div>
        </button>

        <button class="menubar__button" @click="commands.undo">
          <div class="btn-editor">
            <img src="../assets/images/icons/undo.svg" alt />
          </div>
        </button>

        <button class="menubar__button" @click="commands.redo">
          <div class="btn-editor">
            <img src="../assets/images/icons/redo.svg" alt />
          </div>
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions';

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: ``
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style scoped>
.editor__content {
  background-color: #fff;
}

.menubar{
	display: flex;
	align-items: center;
}

.btn-editor-text {
  display: flex;
  align-items: center;
	justify-content: center;
	flex-wrap: wrap;
  width: 2rem;
	height: 2rem;
	font-weight: 700;
}

.btn-editor {
  width: 2rem;
  height: 2rem;
}
</style>
