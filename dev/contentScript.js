// // import rpm from 'react-rpm';
console.log('Content Script: Running');

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
      !message.source === 'react-rpm-module') {
    return;
  }

  chrome.runtime.sendMessage(message);
});

// const port = chrome.runtime.connect({name: "rpm-content-script"});


// function onPageMessage(event) {
//   const message = event.data;
//   console.log('Content-script receiving message:', message);
//   if (event.source !== window) {
//     return;
//   }

//   // Only accept messages that we know are ours
//   if (typeof message !== 'object' || message === null ||
//     message.source !== 'react-rpm-module') {
//     return;
//   }

//   // Ignore messages send from contentScript, avoid infinite dispatching
//   if (message.sender === 'rpm-content-script') {
//     return;
//   }

//   port.postMessage({perfs: message});
// }

// function onMessage(message, /* sender, sendResponse */) {
//   // relay all messages to pageScript
//   //window.postMessage({ ...message, sender: 'contentScript' }, '*');
// }

// window.addEventListener('message', onPageMessage);
// //chrome.runtime.onMessage.addListener(onMessage);
