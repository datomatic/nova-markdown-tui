window.Vue.component = () => false;

const handleDarkMode = () => {
  const cls = document.documentElement.classList;
  const isDarkMode = cls.contains('dark');

  if (isDarkMode && !cls.contains('datomatic-dark')) {
    cls.add('datomatic-dark');
  } else if (!isDarkMode && cls.contains('datomatic-dark')) {
    cls.remove('datomatic-dark');
  }
};

// eslint-disable-next-line no-undef
Nova.booting((Vue) => {
  handleDarkMode();
  // eslint-disable-next-line no-undef
  new MutationObserver(handleDarkMode).observe(document.documentElement, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  });

  Vue.component('detail-nova-markdown-tui', require('./components/DetailField').default);
  Vue.component('form-nova-markdown-tui', require('./components/FormField').default);
});
