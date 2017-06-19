# react-rpm
![react-rpm](http://i.imgur.com/YHaLs6a.png)
## Overview
[![React-RPM | Real-Time Performance Metrics](http://i.imgur.com/k6zAdOh.png)](https://www.youtube.com/watch?v=8Ye9b3RY7lQ)

react-rpm is a Chrome DevTool that displays clear and customizable visualizations of your React app's performance metrics.

react-rpm relies on React's built-in Perf tool, which is designed to log performance data as you use your React app. Though React is already fast, its diffing algorithm may cause unnecessary re-renders, which can result in performance issues in large, complex apps. To optimize the diffing algorithm, React provides a shouldComponentUpdate() hook. Incorporating React's Perf tool, react-rpm shows you exactly where your app can be optimized. See https://facebook.github.io/react/docs/perf.html for more information.

Note: react-rpm only works when using the development build of React.

## Setup Instructions

Step 1: Install Chrome DevTool

https://chrome.google.com/webstore/detail/react-rpm/ifaijhlkcmaimeaafnapdfmkghneffbp

Step 2: Set up react-rpm node module in your project

```bash
# Install react-rpm
$ npm install --save-dev react-rpm
```
```javascript
// Import react-rpm in entry point or App.js/Top Level Component
import react-rpm;
```

## Using react-rpm

React-rpm gathers performance data based on sessions, which are instigated by user interaction. Upon opening the DevTool, you'll be prompted that react-rpm is listening for renders. The dashboard will appear once performance data has been collected, and is ready to display.

While viewing timeWasted in the component view, react-rpm categorizes your components with color flags:
```bash
  #red: has current timeWasted in last render session
  #green: has had timeWasted in previous renders, but no timeWasted in last render session
  #gray: has not registered any timeWasted in lifeCycle of app.
```
More extensive documentation coming soon!