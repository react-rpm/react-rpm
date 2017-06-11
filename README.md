# react-rpm
![react-rpm](http://i.imgur.com/YHaLs6a.png)
## Overview

react-rpm is a Chrome DevTool that displays clear and customizable visualizations of your React app's performance metrics.

react-rpm relies on React's built-in Perf tool, which is designed to log performance data as you use your React app. Though React is already fast, its diffing algorithm may cause unnecessary re-renders, which can result in performance issues in large, complex apps. To optimize the diffing algorithm, React provides a shouldComponentUpdate() hook. Incorporating React's Perf tool, react-rpm shows you exactly where your app can be optimized. See https://facebook.github.io/react/docs/perf.html for more information.

Note: react-rpm only works when using the development build of React.

## Setup Instructions

Step 1: Set up react-rpm node module in your project

```bash
# Install react-rpm
$ npm install --save-dev react-rpm
```
```javascript
// Import react-rpm in entry point or App.js.
import react-rpm;
```

Step 2: Set up react-rpm

```bash
# Clone this repo.
$ git clone https://github.com/jhen0409/react-chrome-extension-boilerplate.git

# Install dependencies.
$ npm install

# Build.
$ npm run build
```
