import React, { Component } from 'react';
import Plot from './Plot';
import PerfComponent from './PerfComponent';
import Toolbar from './Toolbar';
import CustomToolTip from './CustomToolTip';

// import Sample from './sample_perfs'

// import { getUIName } from '../utils/UI_metricText';
// import Toolbar from './Toolbar';
// import TagSelect from './TagSelect';

class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.compiledGraphData = [];
    // this stores all plot data for each active PerfComponent, and is passed to the Plot component as a prop in render
    // see compileGraphData() below to see how that information is compiled.
    // I will probably make this a state object at some point, but for the sake of testing it was easier to not include in state

    this.componentsActiveOnGraphs = [];
    // array of perf component objects

    this.state = {
      allComponents: this.createTestComponents(),
      // an array that holds every PerfComponent that exists during the life-span of the app.
      // here, I built a tester method to build four components and fill them with random values
      // see createTestComponents() for more details on how I create and initiate them so they show on the graph

      twoGraphsAreActive: false,
      // this is just a boolean toggle that tracks whether or not the user wants to display one or two graphs
      // its in the state beacuse we want to trigger the page to rerender immediately when this changes

      tooltipValues: {
        timeWasted: true,
        instanceCount: false,
        renderCount: false,
        renderTime: false,
        totalRenderTime: false,
        averageRenderTime: false,
        totalTime: false,
      },

      // Can we use this instead:
      dataItems: [
        { id: 0, selected: true, label: 'Time Wasted' },
        { id: 1, selected: false, label: 'Instance Count' },
        { id: 2, selected: false, label: 'Render Count' },
        { id: 3, selected: false, label: 'Render Time' },
        { id: 4, selected: false, label: 'Total Render Time' },
        { id: 5, selected: false, label: 'Avg Render Time' },
        { id: 6, selected: false, label: 'Total Time' },
      ],

      simData: false
    };

    for (let key in this.state.allComponents[0]) {
      console.log('{');
      console.log(key + ':' + JSON.stringify(this.state.allComponents[0][key]));
      console.log('}');
    }
    // this.importPerfs(Sample);
  }

  // this method handles creation of PerfComponent elements and returns an array
  // it accepts any number of strings (the names of the components), or a single string if we only want one.
  createPerfComponent(...args) {
    if (args.length === 1) return new PerfComponent(args[0]);
    const array = [];
    let temp;

    args.forEach(newComponent => {
      temp = new PerfComponent(newComponent);
      array.push(temp);
    });
    return array;
  }

  // this is strictly for testing. It's hardcoded to create four PerfComponents
  // I set an array of testComponentValues with the following format:
  //  [Random Number Gen starting number, Random Number Gen Range, metric to activate, graph to activate on]
  // GRAPH 0 is the top graph, or when there's only one graph displayed. GRAPH 1 is for the bottom graph when both are displayed
  // Iterate through those components and pass the test values to a PerfComponent method to take care of filling it up
  // I return the value, which gets sent to allComponents in the state.
  createTestComponents(testValuesArray) {
    let testComponentArray = this.createPerfComponent(
      'Dashboard',
      'Comment',
      'Profile',
      'Message'
    );

    let testComponentValues = [
      [100, 30, 'timeWasted', 0],
      [100, 15, 'instanceCount', 0],
      [5, 5, 'renderCount', 1],
      [5, 5, 'timeWasted', 1]
    ];

    testComponentValues.forEach((valuesArray, i) => {
      testComponentArray[i].addRandomValues(...valuesArray);
    });

    return testComponentArray;
  }

  getComponent(name) {
    let perfIndex;
    let allComponents = this.state.allComponents;

    this.allComponents.forEach((component, i) => {
      if (component.name === name) perfIndex = i;
    });

    if (!perfIndex) return false;
    return allComponents[perfIndex];
  }

  importPerfs(perfs) {
    let perfComponent;
    let currentPerfCategory = 'wasted';
    let currentPerfData;

    for (perfData in perfs[currentPerfCategory]['0'])
      currentPerfData = perfs[currentPerfCategory]['0'][perfData];
    if (typeof currentPerfData === 'string') {
      console.log(currentPerfData.substring(currentPerfData.indexOf('>') + 2));
    }
  }

  // This iterates through this.state.allComponents and calls each PerfComponent's exportGraphData method, which returns all the data for graphs that is ACTIVE on, ignoring all data that isn't active.
  // the compiledGraphData gets passed to the Plot component as a prop
  compileGraphData() {
    this.compiledGraphData = [];
    let placeHolder = [];
    this.state.allComponents.forEach(component => {
      component.exportGraphData().forEach(array => {
        if (array.length) {
          this.componentsActiveOnGraphs.push(component);
          this.compiledGraphData.push(array);
        }
      });
    });
    return this.compiledGraphData;
  }

  // this get's passed to the TwoGraphToggler component as a bound prop, which is a radio button used by the Plot component.
  // this method gets fired every time the user presses one of the button, and we update the state accordingly
  twoGraphToggler(bool) {
    this.resetComponentGraphAnimation();
    this.setState({ twoGraphsAreActive: bool });
  }

  resetComponentGraphAnimation() {
    this.state.allComponents.forEach(component => {
      component.enableAllMetricAnimation();
    });
  }

  fireDataScript() {
    this.state.allComponents.forEach((component, i) => {
      // ('Dashboard', 'Comment', 'Profile', 'Message');

      let metrics = [
        [100, 30, 'timeWasted', 0],
        [100, 15, 'instanceCount', 0],
        [5, 5, 'renderCount', 1],
        [5, 5, 'timeWasted', 1]
      ];

      let componentMetric = metrics[i][2];
      let data = component.getValue('RENDER', componentMetric);
      let num = data[data.length - 1];
      let negative;

      component.disableMetricOnGraph('timeWasted', 0);

      Math.random() < 0.5 ? (negative = -1) : (negative = 1);

      component.addValue(
        num + Math.floor(Math.random() * 10 * negative),
        'RENDER',
        componentMetric
      );
      // component.addRandomValues(1, range, componentMetric, metrics[i][3])

      let temp = this.state.simData;
      temp = !temp;

      this.setState({ simData: temp });
    });
  }

  fireComponentScript() {
    let allComponents = this.state.allComponents;
    let settings = [100, 30, 'timeWasted', 0];
    allComponents.push(new PerfComponent('new!' + Math.random()));
    allComponents[allComponents.length - 1].addRandomValues(...settings);
    this.setState({ simData: !this.state.simData });
  }

  toggleTooltipValues(value) {
    let tooltipValues = this.state.tooltipValues;
    tooltipValues[value] = !tooltipValues[value];
    this.setState({ tooltipValues });
  }

  removeActiveComponentFromGraph(componentName, graph) {}

  render() {
    const compiledGraphData = this.compileGraphData();

    return (
      <div id="main_container">
        <div id="plot-container">

          <Plot
            compiledGraphData={compiledGraphData}
            twoGraphsAreActive={this.state.twoGraphsAreActive}
            twoGraphToggler={this.twoGraphToggler.bind(this)}
            tooltipValues={this.state.tooltipValues}
            dataItems={this.state.dataItems}
          />
          <Toolbar
            tooltipValues={this.state.tooltipValues}
            toggleTooltipValues={this.toggleTooltipValues.bind(this)}
            componentsActiveOnGraphs={this.componentsActiveOnGraphs}
            removeActiveComponentFromGraph={this.removeActiveComponentFromGraph.bind(
              this
            )}
          />
          {/*<Tooltip content={<CustomToolTip />} 
          componentsActiveOnGraphs = {this.componentsActiveOnGraphs}
          tooltipValues = {this.tooltipValues}
          />*/}

          <button onClick={this.fireDataScript.bind(this)}>Add Data</button>
          <button onClick={this.fireComponentScript.bind(this)}>
            Add Component
          </button>
        </div>

      </div>
    );
  }
}

export default Visualizer;
