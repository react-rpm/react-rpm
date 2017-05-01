/* global chrome */
(function load() {
  chrome.runtime.sendMessage({
    name: 'content-init',
    source: 'react-rpm',
  });
}());
