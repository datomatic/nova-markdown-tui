<template>
  <DefaultField :field="field" :show-help-text="false" :errors="errors" :full-width-content="true">
    <template #field>
      <p class="help-text help-text mb-2">{{ field.helpText }}</p>
      <div class="datomatic-nova-markdown-tui flex flex-col">
        <div :id="field.name" ref="editor" :class="editorClass" />
      </div>
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova';
import HasEditor from '../mixins/HasEditor';

export default {
  mixins: [FormField, HandlesValidationErrors, HasEditor],

  props: ['resourceName', 'resourceId', 'field'],

  computed: {
    decodedFieldValue() {
      return this.decodeEntities(this.field.value ?? '');
    },
  },

  created() {
    this.initializeEditorConfig(this.field.editor);
  },

  methods: {
    setInitialValue() {
      this.value = this.decodedFieldValue;
    },

    fill(formData) {
      formData.append(this.field.attribute, this.value || '');
    },

    handleChange(value) {
      this.value = value;
    },
  },
};
</script>
