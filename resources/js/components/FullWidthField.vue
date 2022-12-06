<template>
  <FieldWrapper>
    <div class="py-6 px-8 w-full">
      <div v-if="fieldLabel" class="mb-6">
        <FormLabel :for="field.attribute" :class="{ 'mb-2': field.helpText && showHelpText }">
          {{ fieldLabel }}

          <span v-if="field.required" class="text-danger text-sm">{{ __('*') }}</span>
        </FormLabel>

        <HelpText v-if="showHelpText">
          {{ field.helpText }}
        </HelpText>
      </div>

      <slot name="field" />

      <HelpText v-if="showErrors && hasError" class="error-text mt-2 text-danger">
        {{ firstError }}
      </HelpText>
    </div>
  </FieldWrapper>
</template>

<script>
import { HandlesValidationErrors, mapProps } from 'laravel-nova';

export default {
  mixins: [HandlesValidationErrors],

  props: {
    field: { type: Object, required: true },
    fieldName: { type: String },
    showErrors: { type: Boolean, default: true },
    ...mapProps(['showHelpText']),
  },

  computed: {
    fieldLabel() {
      // If the field name is purposefully empty, hide the label altogether
      if (this.fieldName === '') {
        return false;
      }

      return this.fieldName || this.field.singularLabel || this.field.name;
    },
  },
};
</script>
