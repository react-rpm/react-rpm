import React, { Component } from 'react';
import Plot from './Plot';
import PerfComponent from './PerfComponent';
import Toolbar from './Toolbar';
import CustomToolTip from './CustomToolTip';
import { sample_perfs } from './sample_perfs'
import styles from './styles/visualizer.css';
require('./styles/rpm_bg.png');

// import Sample from './sample_perfs'

// import { getUIName } from '../utils/UI_metricText';
// import Toolbar from './Toolbar';
// import TagSelect from './TagSelect';

class Visualizer extends Component {

  constructor(props) {
    super(props);
    this.compiledGraphData = [];
    // this stores all plot data for each active PerfComponent, and is passed to the Plot component as a prop in render

    this.componentsActiveOnGraphs = [];
    this.loadToolbar = false;
    console.log('loading visualizer');
    this.state = {

      allComponents: [],
      // an array that holds every PerfComponent that exists during the life-span of the app.

      twoGraphsAreActive: false,
      //boolean toggle that tracks whether or not the user wants to display one or two graphs

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

      perfs: this.props.perfData
    };
  }

  componentWillReceiveProps(props){
    this.importPerfs(this.props.perfData);
    this.setState({perfs: this.props.perfData});
  }

  // method for toggling the listed data items
  onDataItemClick(dataItem) {
    dataItem.selected = !dataItem.selected;
    const dataItems = this.state.dataItems;
    this.setState({ dataItems });
  }

  createPerfComponent(...args) {
    return args.map(newComponent => {
      return new PerfComponent(newComponent)
    });
  }

  updateGraph() {
    this.forceUpdate();
    // this.setState({simData: !this.state.simData});
  }

  //if only name specified as parameter, will return reference to PerfComponent
  //if name and metrics specified as parameters, will return data value array for that perf component's metric
  getComponent(name, metric = null) {
    let perfIndex;
    let allComponents = this.state.allComponents;
    allComponents.forEach((component, i) => {
      if (component.name === name) perfIndex = i;
    });

    if (perfIndex === undefined) return false;
    if (metric) return allComponents[perfIndex].RENDER[metric].data;
    return allComponents[perfIndex];
  }

  importPerfs(perfs) {

    let newPerfComponent;
    let perfsInState = {}

    this.state.allComponents.forEach(item => {
      perfsInState[item.name] = item;
    });

    let exclusiveDataTitles = {
      'Average render time (ms)': 'averageRenderTime',
      'Instance count': 'instanceCount',
      'Render count': 'renderCount',
      'Total lifecycle time (ms)': 'totalLifeCycleTime', 
      'Total render time (ms)': 'totalRenderTime',
      'Total time (ms)': 'totalTime', 
    };

    console.log('//////////////////////////////////////\n',
                'Processing Perf Data...\n//////////////////////////////////////\n',
                'Perfs:', perfs,'//////////////////////////////////////\n');

    perfs['exclusive'].forEach(data => {
      let componentName = data.Component;
      if (perfsInState.hasOwnProperty(componentName)) 
        newPerfComponent = perfsInState[componentName];
      else {
        console.log('\n[creating new perf component]\n', componentName, '\n')
        newPerfComponent = new PerfComponent(data['Component']);
        perfsInState[componentName] = newPerfComponent;
      }
      Object.keys(exclusiveDataTitles).forEach(metric => {
        newPerfComponent.addValue(data[metric], 'RENDER', exclusiveDataTitles[metric]);
      });
    })
    console.log(perfs['wasted']);
    if(perfs['wasted']){
      perfs['wasted'].forEach(data =>{

        let componentName = data['Owner > Component'];
        componentName = componentName.substring(componentName.indexOf('>')+2)

        console.log('[WASTED]\nProcessing component:',componentName);

        newPerfComponent = perfsInState[componentName];

        if (!newPerfComponent) console.log('Error: component not found -',componentName);
        else newPerfComponent.addValue(data['Inclusive wasted time (ms)'], 'RENDER', 'timeWasted')
      });
    }

    console.log('\n\nPERFS IN STATE \n[object]:\n',perfsInState);
    
    let arr = Object.keys(perfsInState).map(item => {
      return perfsInState[item];
    })
    console.log('[array]:\n',arr);
    this.setState({ allComponents: arr});
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

  twoGraphToggler(bool) {
    this.resetComponentGraphAnimation();
    this.setState({ twoGraphsAreActive: bool });
  }

  resetComponentGraphAnimation() {
    this.state.allComponents.forEach(component => {
      component.enableAllMetricAnimation();
    });
  }

  toggleTooltipValues(value) {
    let tooltipValues = this.state.tooltipValues;
    tooltipValues[value] = !tooltipValues[value];
    this.setState({ tooltipValues });
  }

  checkIfTwoGraphsActive() {
    let returnVal = this.state.twoGraphsAreActive;
    return returnVal
  }

  render() {
    console.log('CURRENT COMPONENTS:\n');
    if (!this.state.allComponents.length) console.log('[no components loaded]\n');
    else console.log(this.state.allComponents);

    this.compiledGraphData = this.compileGraphData();
    
    return (
        <div id={styles.plotContainer}>
          <div id={styles.plotWrapper}>
            <Plot
              compiledGraphData={this.compiledGraphData}
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
    );
  }
}

export default Visualizer;
