import React, { Component } from 'react';
import Plot from './Plot';
import PerfComponent from './PerfComponent';
import Toolbar from './Toolbar';
import CustomToolTip from './CustomToolTip';
import {sample_perfs} from '.././sample_perfs';
import styles from './styles/visualizer.css';

const perf = window.Perf;

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

      simData: false,

      perfs: this.props.perfs
    };

    for (let key in this.state.allComponents[0]) {
      console.log('{');
      console.log(key + ':' + JSON.stringify(this.state.allComponents[0][key]));
      console.log('}');
    }
    // this.importPerfs(Sample);
  }

  // method for toggling the listed data items
  onDataItemClick(dataItem) {
    dataItem.selected = !dataItem.selected;
    const dataItems = this.state.dataItems;
    this.setState({ dataItems });
  }
  
  componentWillReceiveProps(){
    console.log(this.props.perfs);
    // this.importPerfs(this.props.perfs);
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

  updateGraph(){
    this.forceUpdate();
    // this.setState({simData: !this.state.simData});
  }

  //this is strictly for testing. It's hardcoded to create four PerfComponents
  //I set an array of testComponentValues with the following format:
  //  [Random Number Gen starting number, Random Number Gen Range, metric to activate, graph to activate on]
  // GRAPH 0 is the top graph, or when there's only one graph displayed. GRAPH 1 is for the bottom graph when both are displayed
  //Iterate through those components and pass the test values to a PerfComponent method to take care of filling it up 
  //I return the value, which gets sent to allComponents in the state. 
  createTestComponents(testValuesArray){

    let testComponentArray = this.createPerfComponent('Dashboard', 'Comment', 'Profile', 'Message');

    testComponentArray.forEach(component => {
      component.addRandomValues(10, 30)
    })

    // testComponentArray[0].toggleActiveMetric('RENDER', 'renderCount', 0)

    return testComponentArray;
  }

  //if only name specified as parameter, will return reference to PerfComponent
  //if name and metrics specified as parameters, will return data value array for that perf component's metric
  getComponent(name, metric=null) {
    let perfIndex;
    let allComponents = this.state.allComponents;
    allComponents.forEach((component, i) => {
      if (component.name === name) perfIndex = i;
    });

    if (perfIndex === undefined) return false;
    if (metric) return allComponents[perfIndex].RENDER[metric].data;
    return allComponents[perfIndex];
  }

  importPerfs(perfs){

    let componentDoesExist = false;
    let newPerfComponent;
    let arr = []
    let values = []
    const existingComponents = this.state.allComponents;

    for (let perfType in perfs) {
      perfs.excluded.forEach((data,i) => {
        let componentName = data.Component //string of the component's name. Will pass to getComponent to check to see if it exists. If it does, fill that component with new perf data. If it doesn't, you need to create a new perf component
        let temp = this.getComponent(componentName)
        if(!temp) 
          newPerfComponent = new PerfComponent(data['Component']);
        else 
          newPerfComponent = temp

          values.push(
            data['Average render time (ms)'],
            data['Instance count'],
            data['Render count'],
            data['Total lifecycle time (ms)'],
            data['Total render time (ms)'],
            data['Total time (ms)']
          )

          
          newPerfComponent.addValue(values[0], 'RENDER', 'averageRenderTime');
          newPerfComponent.addValue(values[1], 'RENDER', 'instanceCount');
          newPerfComponent.addValue(values[2], 'RENDER', 'renderCount');
          newPerfComponent.addValue(values[3], 'RENDER', 'totalLifeCycleTime');
          newPerfComponent.addValue(values[4], 'RENDER', 'totalRenderTime');
          newPerfComponent.addValue(values[5], 'RENDER', 'totalTime');

          existingComponents.push(data['Component']);
          arr.push(newPerfComponent);          
      })
    }
    this.setState({allComponents: arr,
                  });
    }

  // This iterates through this.state.allComponents and calls each PerfComponent's exportGraphData method, which returns all the data for graphs that is ACTIVE on, ignoring all data that isn't active.
  // the compiledGraphData gets passed to the Plot component as a prop
  compileGraphData() {
    let compiledGraphData = [];
    let placeHolder = [];
    let newActiveComponent;
    this.componentsActiveOnGraphs = [];
    this.state.allComponents.forEach(component => {
      component.exportGraphData().forEach(array => {
        if (array.length) {
          newActiveComponent = {
            name: component.name,
            metric: array[2],
            activeGraphs: array[3],
            data: component.RENDER[array[2]].data,
            colorTheme: component.RENDER[array[2]].colorTheme,
            graphDisplay: component.RENDER[array[2]].graphDisplay
          }
          this.componentsActiveOnGraphs.push(newActiveComponent);
          compiledGraphData.push(array)
        }
      })
    })
    return compiledGraphData;

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

  toggleTooltipValues(value){
    let tooltipValues = this.state.tooltipValues;
    tooltipValues[value] = !tooltipValues[value];
    this.setState({ tooltipValues });
  }

  checkIfTwoGraphsActive(){
    
    let returnVal = this.state.twoGraphsAreActive;
    return returnVal
  }

  render(){
    
    this.compiledGraphData = this.compileGraphData();
    

    return(

    <div id={styles.main_container}>

      <div id={styles.bannerContainer}>react rpm | real-time performance metrics</div>
      <div id={styles.plotContainer}>
        <div id={styles.plotWrapper}>
          <Plot 
            compiledGraphData = {this.compiledGraphData}
            checkIfTwoGraphsActive={this.checkIfTwoGraphsActive.bind(this)}
            twoGraphToggler={this.twoGraphToggler.bind(this)}
            

            //for custom tooltip
            componentsActiveOnGraphs={this.componentsActiveOnGraphs}

            //for data items selector && custom tooltip
            dataItems={this.state.dataItems}
            onDataItemClick={this.onDataItemClick.bind(this)}

            tooltipValues={this.state.tooltipValues}

            //for custom tooltip
            getComponent={this.getComponent.bind(this)}
            simData={this.state.simData}
          />
        </div>
        
        <Toolbar

          //GraphPicker Props
          allComponents={this.state.allComponents}
          twoGraphsAreActive={this.checkIfTwoGraphsActive.bind(this)}
          twoGraphToggler={this.twoGraphToggler.bind(this)}
          updateGraph={this.updateGraph.bind(this)}

          //DisplayedGraphs Props
          componentsActiveOnGraphs={this.componentsActiveOnGraphs}
          getComponent={this.getComponent.bind(this)}

          compileGraphData={this.compileGraphData.bind(this)}

        />
      </div>
    </div>
    );
  }
}

export default Visualizer;
