/* global chrome */
// Create a new panel
import Perf from 'react-addons-perf';

var script = 
  `
  if(window.Perf){
    console.log('script injected!');
    var MutationObserver = window.MutationObserver;
    var button = document.createElement('button');

    Perf.start()
    
    var observer = new MutationObserver((mutations, observer) => {
      document.body.appendChild(button);
      button.innerHTML = Math.floor(Math.random() * 100);
      Perf.stop();
      Perf.printInclusive()
      Perf.printExclusive()
      Perf.printWasted()
      Perf.printOperations()
      Perf.printDOM()
      Perf.start();
      return true;
    })
    
    observer.observe(document, {
      subtree: true,
      attributes: true
    });
  }`

chrome.devtools.panels.create('ReactRPM',
  null,
  'devpanel.html',
  null
);

chrome.devtools.inspectedWindow.eval(script,
  (result, isException) => {
    console.log('!!!!!!!',result);
  });


function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

    