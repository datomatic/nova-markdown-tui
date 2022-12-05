// eslint-disable-next-line no-undef
Nova.booting((Vue) => {
  Vue.component('detail-nova-markdown-tui', require('./components/DetailField').default);
  Vue.component('form-nova-markdown-tui', require('./components/FormField').default);
});
