<template>
  <PanelItem :index="index" :field="field">
    <template #value>
      <div class="datomatic-nova-markdown-tui flex flex-col">
        <div :id="field.name" ref="editor" :class="editorClass" />
      </div>
    </template>
  </PanelItem>
</template>

<script>
import HasEditor from '../mixins/HasEditor';

export default {
  mixins: [HasEditor],

  props: ['index', 'resource', 'resourceName', 'resourceId', 'field'],

  computed: {
    decodedFieldValue() {
      return this.decodeEntities(this.field.value ?? '');
    },
  },

  created() {
    this.initializeEditorConfig({ ...this.field.editor, viewer: true });
  },
};
</script>
