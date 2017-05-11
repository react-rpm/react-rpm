/* global chrome */


console.log('✔ devtools.js')

chrome.devtools.panels.create('react-rpm',
  null,
  'devpanel.html',
  () => {
    chrome.devtools.inspectedWindow.eval(
      `console.log('✔ script injected')`,
      true,
      (isException) => {
        console.log(isException);
      }
    )   
  }
);
