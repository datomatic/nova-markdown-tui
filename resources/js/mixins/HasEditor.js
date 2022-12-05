import DOMPurify from 'dompurify';
import toMark from 'to-mark';
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

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import chart from '@toast-ui/editor-plugin-chart';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import hljs from 'highlight.js';

export default {
  data: () => ({
    editorConfig: {},
    editorOptions: {},
  }),

  computed: {
    allowIframe() {
      return this.editorConfig.allowIframe === true;
    },

    errorClasses() {
      const classes = this.hasError ? [this.errorClass] : [];

      if (this.editorConfig.height === 'auto') {
        classes.push('auto-height');
      }

      return classes;
    },
  },

  methods: {
    /**
     * Add image in current editor.$
     *
     * @param {toastui.Editor} editor
     * @param {string} image
     */
    addImage(editor, image) {
      if (editor.isMarkdownMode()) {
        const modeEditor = editor.getCurrentModeEditor();
        const cm = modeEditor.getEditor();
        const doc = cm.getDoc();
        const range = modeEditor.getCurrentRange();

        const from = {
          line: range.from.line,
          ch: range.from.ch,
        };

        const to = {
          line: range.to.line,
          ch: range.to.ch,
        };

        doc.replaceRange(`![Description](${image})`, from, to);
        cm.focus();
      }

      if (editor.isWysiwygMode()) {
        const modeEditor = editor.getCurrentModeEditor();
        const sq = modeEditor.getEditor();

        modeEditor.focus();

        if (!sq.hasFormat('PRE')) {
          sq.insertImage(image, { alt: 'Description' });
        }
      }

      this.handleChange(editor.getMarkdown());
    },

    /**
     * Add link url in add link popup.
     *
     * @param {toastui.Editor} editor
     */
    addLinkUrl(editor) {
      if (!editor.isWysiwygMode()) {
        return;
      }

      const parent = editor.getRange().commonAncestorContainer.parentElement;

      if (typeof parent.href === 'undefined' || parent.href === null) {
        return;
      }

      const popup = editor.getUI()._popups.find((p) => p.hasOwnProperty('_inputURL'));

      if (typeof popup === 'undefined' || popup === null) {
        return;
      }

      popup._inputURL.value = parent.href;
    },

    /**
     * Change editor convertor to keep iframe tags.
     *
     * @param {toastui.Editor} editor
     */
    changeEditorConvertor(editor) {
      let convertor = editor.convertor;

      convertor.toMarkdown = (html, toMarkOptions) => {
        const resultArray = [];

        html = convertor.eventManager.emitReduce('convertorBeforeHtmlToMarkdownConverted', html);
        html = convertor._appendAttributeForLinkIfNeed(html);
        html = convertor._appendAttributeForBrIfNeed(html);

        let markdown = toMark(html, toMarkOptions);

        markdown = convertor.eventManager.emitReduce('convertorAfterHtmlToMarkdownConverted', markdown);
        // wrap iframe tags with new lines
        markdown = this.wrapTag('iframe', '\n\n', markdown);
        markdown = convertor._removeNewlinesBeforeAfterAndBlockElement(markdown);

        markdown.split('\n').forEach((line, index) => {
          const FIND_TABLE_RX = /^(<br>)+\||\|[^|]*\|/gi;
          const FIND_CODE_RX = /`[^`]*<br>[^`]*`/gi;
          const FIND_BRS_BEFORE_TABLE = /^(<br>)+\|/gi;

          if (FIND_TABLE_RX.test(line)) {
            line = line.replace(FIND_BRS_BEFORE_TABLE, (match) => match.replace(/<br>/gi, '<br>\n'));
          } else if (!FIND_CODE_RX.test(line)) {
            line = line.replace(/<br>/gi, '<br>\n');
          }
          resultArray[index] = line;
        });

        return resultArray.join('\n').replace(/^\s+|\s+$/g, '');
      };

      editor.convertor = convertor;
    },

    compileEditorOptions(config) {
      this.editorConfig = config;
      let options = this.editorConfig.options;

      options.customHTMLSanitizer = this.sanitizeHtml;
      options.useDefaultHTMLSanitizer = false;
      if (this.editorConfig.plugins) {
        options.plugins = this.editorConfig.plugins.map((plugin) => {
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
              return [codeSyntaxHighlight, { hljs }];
          }
        });
      }

      if (this.useCloudinary && options.toolbarItems.indexOf('image') > -1) {
        this.$cloudinaryMediaLibrary.init({
          ...this.editorConfig.cloudinary,
          multiple: false,
        });
      }

      this.editorConfig.options = options;
    },

    /**
     * Add link url in add link popup.
     *
     * @param {toastui.Editor} editor
     */
    editorLoad(editor) {
      if (this.allowIframe) {
        this.changeEditorConvertor(editor);
      }

      if (this.useCloudinary) {
        editor.addHook('openPopupAddImage', () => {
          this.$cloudinaryMediaLibrary.show((data) => {
            if (data.assets.length > 0) {
              this.addImage(editor, data.assets[0].secure_url);
            }
          });
        });
      }

      editor.on('openPopupAddLink', () => this.addLinkUrl(editor));
    },

    editorChange() {
      this.value = this.$refs.editor.invoke('getMarkdown').replace(/^\s+|\s+$/g, '');
    },

    sanitizeHtml(html) {
      let config = {};

      if (this.allowIframe === true) {
        config.ADD_TAGS = ['iframe'];
      }

      const sanitized = DOMPurify.sanitize(html, config);

      return this.decodeEntities(sanitized);
    },

    /**
     * wrap html tag with wrapper
     * @param tag
     * @param wrapper
     * @param content
     * @return {string} replaced content
     */
    wrapTag(tag, wrapper, content) {
      let newLines = ['\n', '\r', '\r\n'];
      let around = `((?:[${newLines.join('|')}]+?)*)?`;
      let regex = new RegExp(`${around}(<${tag}(?:(?!<\\/${tag}).*)<\\/${tag}>)${around}`, 'igm');

      return content.replace(regex, `${wrapper}$2${wrapper}`);
    },

    decodeEntities(value) {
      value = value.replace(/%7B/g, '{');
      value = value.replace(/%7D/g, '}');
      return value;
    },
  },
};
