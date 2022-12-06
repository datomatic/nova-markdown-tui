<template>
  <component
    :is="field.fullWidth ? 'FullWidthField' : 'DefaultField'"
    :dusk="field.attribute"
    :field="field"
    :show-help-text="showHelpText"
    :errors="errors"
    full-width-content
  >
    <template #field>
      <div class="datomatic-nova-markdown-tui flex flex-col">
        <div :id="field.name" ref="editor" :class="editorClass" />
      </div>
    </template>
  </component>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova';
import HasEditor from '../mixins/HasEditor';
import FullWidthField from './FullWidthField';

export default {
  components: { FullWidthField },

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
