<template>
  <default-field :field="field" :errors="errors" :full-width-content="true">
    <template #field>
      <editor
        :id="field.name"
        ref="editor"
        :class="errorClasses"
        :initial-value="decodedFieldValue"
        :initial-edit-type="editorConfig.initialEditType"
        :preview-style="editorConfig.previewStyle"
        :height="editorConfig.height"
        :options="editorConfig.options"
        @change="editorChange"
        @load="editorLoad"
      />
    </template>
  </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova';
import { Editor } from '@toast-ui/vue-editor';
import HasEditor from '../mixins/HasEditor';

export default {
  components: {
    editor: Editor,
  },

  mixins: [FormField, HandlesValidationErrors, HasEditor],

  props: ['resourceName', 'resourceId', 'field'],

  computed: {
    decodedFieldValue() {
      if (this.field.value) {
        return this.decodeEntities(this.field.value);
      } else {
        return '';
      }
    },
  },

  created() {
    this.compileEditorOptions(this.field.editor);
  },

  methods: {
    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
      this.value = this.decodedFieldValue;
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      formData.append(this.field.attribute, this.value || '');
    },

    /**
     * Update the field's internal value.
     */
    handleChange(value) {
      this.value = value;
    },
  },
};
</script>
