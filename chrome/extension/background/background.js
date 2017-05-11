
console.log('BG loaded');
function onModuleMessage(event) {

  const message = event.data;

  console.log('Background Script Receiving Message From react-rpm-module...', message);

  if (event.source !== window) {
    return;
  }

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || message.source !== 'react-rpm-module') {
    return;
  }

}

// function onMessage(message, /* sender, sendResponse */) {
//   // relay all messages to pageScript
//   window.postMessage({ ...message, sender: 'contentScript' }, '*');
// }

window.addEventListener('message', onModuleMessage);