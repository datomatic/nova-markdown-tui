import DOMPurify from 'dompurify';
import '@toast-ui/editor/dist/i18n/ar';
import '@toast-ui/editor/dist/i18n/cs-cz';
import '@toast-ui/editor/dist/i18n/de-de';
import '@toast-ui/editor/dist/i18n/es-es';
import '@toast-ui/editor/dist/i18n/fi-fi';
import '@toast-ui/editor/dist/i18n/fr-fr';
import '@toast-ui/editor/dist/i18n/gl-es';
import '@toast-ui/editor/dist/i18n/it-it';
import '@toast-ui/editor/dist/i18n/ja-jp';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/i18n/nb-no';
import '@toast-ui/editor/dist/i18n/nl-nl';
import '@toast-ui/editor/dist/i18n/pl-pl';
import '@toast-ui/editor/dist/i18n/ru-ru';
import '@toast-ui/editor/dist/i18n/sv-se';
import '@toast-ui/editor/dist/i18n/tr-tr';
import '@toast-ui/editor/dist/i18n/uk-ua';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/i18n/zh-tw';
import '@toast-ui/editor/dist/i18n/zh-tw';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import chart from '@toast-ui/editor-plugin-chart';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import Editor from '@toast-ui/editor';

export default {
  data: () => ({
    editor: null,
    editorConfig: {},
  }),

  computed: {
    allowIframe() {
      return this.editorConfig.allowIframe === true;
    },

    editorClass() {
      const classes = ['datomatic-rounded-[4px]'];

      if (this.hasError) {
        classes.push(this.errorClasses);
      }

      if (this.editorConfig.height === 'auto') {
        classes.push('auto-height');
      }

      return classes;
    },
  },

  mounted() {
    if (this.$refs.editor) {
      const editor = Editor.factory({
        ...this.editorConfig,
        el: this.$refs.editor,
        viewer: this.editorConfig.viewer ?? false,
        initialValue: this.decodedFieldValue,
        events: {
          change: this.editorChange,
        },
      });
      this.removeImageUpload();

      this.editor = editor;
    } else {
      console.error('No place where to initialize TuiEditor found.');
    }
  },

  methods: {
    removeImageUpload() {
      const observer = new MutationObserver(() => {
        if (document.querySelector('.toastui-editor-popup.toastui-editor-popup-add-image')) {
          document.querySelector('[aria-label="URL"]').click();
          document.querySelector('[aria-label="File"]').style.display = 'none';
        }
      });

      const target = document.querySelector('.toastui-editor-popup');
      if (target) {
        observer.observe(target, { attributes: true, attributeFilter: ['style'] });
      }
    },

    initializeEditorConfig(config) {
      this.editorConfig = {
        ...config,
        customHTMLSanitizer: this.sanitizeHtml,
        useDefaultHTMLSanitizer: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'ligth',
        plugins: config.plugins.map((plugin) => {
          switch (plugin) {
            case 'uml':
              return uml;
            case 'chart':
              return chart;
            case 'tableMergedCell':
              return tableMergedCell;
            case 'colorSyntax':
              return colorSyntax;
            case 'codeSyntaxHighlight':
              return codeSyntaxHighlight;
          }
        }),
      };
    },
    editorChange() {
      this.value = this.editor.getMarkdown().trim();
    },

    sanitizeHtml(html) {
      let config = {};

      if (this.allowIframe === true) {
        config.ADD_TAGS = ['iframe'];
      }

      let sanitized = DOMPurify.sanitize(html, config);
      return this.decodeEntities(sanitized);
    },

    decodeEntities(value) {
      value = value.replace(/%7B/g, '{');
      value = value.replace(/%7D/g, '}');
      return value;
    },
  },
};
