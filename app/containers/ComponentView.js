import React, { Component } from 'react';
import Plot from './../components/Plot';
import PerfComponent from './../components/PerfComponent';
import Toolbar from './../components/Toolbar';
import CustomToolTip from './../components/CustomToolTip';
import styles from './../assets/componentView.css';

class ComponentView extends Component {

  constructor(props) {
    super(props);
    this.compiledGraphData = [];
    this.componentVisibility = this.props.componentVisibility;
    // this stores all plot data for each active PerfComponent, and is passed to the Plot component as a prop in render

    this.renderCount = 0;
    this.componentsActiveOnGraphs = [];
    this.loadToolbar = false;
    this.twoGraphsAreActive = false,
    
    this.state = {
      allComponents: [],
      simData: false,
      perfs: this.props.perfData
    };
  }

  componentWillReceiveProps = (props) => {
    this.renderCount++;
    this.importPerfs(this.props.perfData);
    this.setState({perfs: this.props.perfData});
  }

  // method for toggling the listed data items
  onDataItemClick = (dataItem) => {
    dataItem.selected = !dataItem.selected;
    const dataItems = this.state.dataItems;
    this.setState({ dataItems });
  }

  createPerfComponent = (...args) => {
    return args.map(newComponent => {
      return new PerfComponent(newComponent)
    });
  }

  updateGraph = () => {
    this.setState({simData: !this.state.simData});
  }

  //if only name specified as parameter, will return reference to PerfComponent
  //if name and metrics specified as parameters, will return data value array for that perf component's metric
  getComponent = (name, metric = null) => {
    let perfIndex;
    let allComponents = this.state.allComponents;
    allComponents.forEach((component, i) => {
      if (component.name === name) perfIndex = i;
    });

    if (perfIndex === undefined) return false;
    if (metric) return allComponents[perfIndex].RENDER[metric].data;
    return allComponents[perfIndex];
  }

  importPerfs = (perfs) => {

    let newPerfComponent;
    let perfsInState = {}

    this.state.allComponents.forEach(item => {
      perfsInState[item.name] = item;
      item.addValue(0.0, 'RENDER', 'timeWasted')
    });

    let exclusiveDataTitles = {
      'Average render time (ms)': 'averageRenderTime',
      'Total lifecycle time (ms)': 'totalLifeCycleTime', 
      'Total render time (ms)': 'totalRenderTime',
      'Total time (ms)': 'totalTime', 
    };

    perfs['exclusive'].forEach(data => {
      let componentName = data.Component;
      if (perfsInState.hasOwnProperty(componentName)) 
        newPerfComponent = perfsInState[componentName];
      else {
        newPerfComponent = new PerfComponent(data['Component']);
        perfsInState[componentName] = newPerfComponent;
      }
      Object.keys(exclusiveDataTitles).forEach(metric => {
        newPerfComponent.addValue(data[metric], 'RENDER', exclusiveDataTitles[metric]);
      });
    })
    if(perfs['wasted']){
      perfs['wasted'].forEach(data =>{

        let componentName = data['Owner > Component'];
        componentName = componentName.substring(componentName.indexOf('>')+2)

        newPerfComponent = perfsInState[componentName];

        let newData = data['Inclusive wasted time (ms)'];
        const previousTimeWasted = newPerfComponent.RENDER.timeWasted.data

        newPerfComponent.replaceLastValue(newData, 'RENDER', 'timeWasted')
      });
    }
    
    let arr = Object.keys(perfsInState).map(item => {
      return perfsInState[item];
    })
    this.setState({ allComponents: arr});
  }

  // This iterates through this.state.allComponents and calls each PerfComponent's exportGraphData method, which returns all the data for graphs that is ACTIVE on, ignoring all data that isn't active.
  // the compiledGraphData gets passed to the Plot component as a prop
  compileGraphData() {
    let compiledGraphData = [];
    let placeHolder = [];
    let newActiveComponent;
    let secondGraphIsActive = 0;
    this.componentsActiveOnGraphs = [];
    this.state.allComponents.forEach(component => {
      component.exportGraphData().forEach(array => {

        //this helps track if we should be displaying one graph or two
        if(array[3]) secondGraphIsActive++;
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
    if(!secondGraphIsActive) this.twoGraphsAreActive = false;
    return compiledGraphData;

  }

  twoGraphToggler = (bool) => {
    this.resetComponentGraphAnimation();
    this.twoGraphsAreActive = bool;
  }

  resetComponentGraphAnimation = () => {
    this.state.allComponents.forEach(component => {
      component.enableAllMetricAnimation();
    });
  }

  toggleTooltipValues = (value) => {
    let tooltipValues = this.state.tooltipValues;
    tooltipValues[value] = !tooltipValues[value];
    this.setState({ tooltipValues });
  }

  checkIfTwoGraphsActive = () => {
    return this.twoGraphsAreActive;
  }

  sortByWasteful = () => {
    let sortedComponents = this.state.allComponents;
    sortedComponents.sort((a, b) =>
      a.getMetricTotal('timeWasted') - b.getMetricTotal('timeWasted')
    )
  }

  render() {
    this.compiledGraphData = this.compileGraphData();

    let visibilityClass;
    this.componentVisibility = this.props.componentVisibility;
    visibilityClass = this.componentVisibility 
      ? styles.componentOnScreen
      : styles.componentOffScreen

    return (
        <div id={styles.mainContainer} className={visibilityClass}>
          <div id={styles.plotWrapper} >
            <Plot
              compiledGraphData={this.compiledGraphData}
              checkIfTwoGraphsActive={this.checkIfTwoGraphsActive}
              twoGraphToggler={this.twoGraphToggler}
              //for custom tooltip
              componentsActiveOnGraphs={this.componentsActiveOnGraphs}
              //for data items selector && custom tooltip
              dataItems={this.state.dataItems}
              onDataItemClick={this.onDataItemClick}
              tooltipValues={this.state.tooltipValues}
              //for custom tooltip
              getComponent={this.getComponent}
              simData={this.state.simData}
            />
          </div>
            <Toolbar
              //---GraphPicker Props---//
              allComponents={this.state.allComponents}
              twoGraphsAreActive={this.checkIfTwoGraphsActive}
              twoGraphToggler={this.twoGraphToggler}
              updateGraph={this.updateGraph}
              //---DisplayedGraphs Props---//
              componentsActiveOnGraphs={this.componentsActiveOnGraphs}
              getComponent={this.getComponent}
              compileGraphData={this.compileGraphData}
            />
        </div>
    );
  }
}

export default ComponentView;
