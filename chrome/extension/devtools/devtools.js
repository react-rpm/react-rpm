/* global chrome */


console.log('✔ devtools.js')

chrome.devtools.panels.create('react-rpm',
  null,
  'devpanel.html',
  () => {
  }
);

let perfs;
console.log('devtools.js loaded');
chrome.runtime.onConnect.addListener(function (port) {
  console.log('app listening to port...');
  port.onMessage.addListener(function (msg) {
    console.log('app incoming message:', msg);
    perfs = msg;
  })
});