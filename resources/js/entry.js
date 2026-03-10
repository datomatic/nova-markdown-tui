import DetailField from './components/DetailField';
import FormField from './components/FormField';

const handleDarkMode = () => {
  const cls = document.documentElement.classList;
  const isDarkMode = cls.contains('dark');

  if (isDarkMode && !cls.contains('datomatic-dark')) {
    cls.add('datomatic-dark');
  } else if (!isDarkMode && cls.contains('datomatic-dark')) {
    cls.remove('datomatic-dark');
  }
};

Nova.booting((app, store) => {
  handleDarkMode();
  new MutationObserver(handleDarkMode).observe(document.documentElement, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  });

  app.component('detail-nova-markdown-tui', DetailField);
  app.component('form-nova-markdown-tui', FormField);
});
