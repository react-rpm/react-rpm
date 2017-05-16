console.log('✔ devtools.js')

chrome.devtools.panels.create('react-rpm',
  null,
  'devpanel.html',
  () => {
  }
);