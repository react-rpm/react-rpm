# ReactRPM

## Overview

ReactRPM is a Chrome DevTool that displays clear and customizable visualizations of your React app's performance metrics.

ReactRPM relies on React's built-in Perf tool, which is designed to log performance data as you use your React app. Though React is already fast, its diffing algorithm may cause unnecessary re-renders, which can result in performance issues in large, complex apps. To optimize the diffing algorithm, React provides a shouldComponentUpdate() hook. Incorporating React's Perf tool, ReactRPM shows you exactly where your app can be optimized. See https://facebook.github.io/react/docs/perf.html for more information.

Note: React's Perf tool only works when using the development build of React.

## Setup Instructions

Step 1: Set up Perf in your project

```bash
# Install Perf.
$ npm install --save-dev react-addons-perf
```
```javascript
// Import Perf in App.js.
import Perf from 'react-addons-perf'
window.Perf = Perf
```

Step 2: Set up ReactRPM

```bash
# Clone this repo.
$ git clone https://github.com/jhen0409/react-chrome-extension-boilerplate.git

# Install dependencies.
$ npm install

# Build.
$ npm run build
```
