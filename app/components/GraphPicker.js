import React, { Component } from 'react';
import styles from './../assets/graph_picker.css'
import Select from 'react-select';
import ComponentSelectorPane from './ComponentSelectorPane';
import GraphStyleSelectorPane from './GraphStyleSelectorPane';

class GraphPicker extends Component { 

  constructor(props){
    super(props)

    const metrics = [
                      'timeWasted',
                      'averageRenderTime',
                      'instanceCount',
                      'renderCount',
                      'totalLifeCycleTime',
                      'totalRenderTime',
                      'totalTime',
                    ]
    this.graphs = ['Bar', 'Line', 'Area'];
    this.graphsLabels = ['Bar', 'Line', 'Area', 'Bar (Secondary Graph)', 'Line (Secondary Graph)',  'Area (Secondary Graph)']

    const colors = ['Blue', 'Green', 'Red', 'Random'];

    this.disabled =  false //this.props.disabled;

    this.componentOptions = this.loadOptions(this.props.allComponents);
    this.metricOptions = this.loadOptions(metrics);
    this.graphOptions = this.loadOptions(this.graphsLabels);
    this.colorOptions = this.loadOptions(colors);

    this.state = {
      selectComponentValue: null,
      selectMetricValue: 'timeWasted',
      selectGraphValue: '0',
      selectColorValue: 'Blue',
    }

    this.counter = 1;

  }

  componentWillReceiveProps(props){
      this.componentOptions = this.loadOptions(this.props.allComponents);
      this.props.allComponents;
      this.forceUpdate();
  }
  updateComponentValue (newValue) {
    this.handleClick(newValue);
    // this.setState({
    //   selectComponentValue: newValue
    // });
  }

  updateMetricValue (newValue) {
    this.setState({
      selectMetricValue: newValue
    });
  }

  updateGraphValue (newValue) {
    this.setState({
      selectGraphValue: newValue
    });
  }

  updateColorValue (newValue) {
    this.setState({
      selectColorValue: newValue
    });
  }

  loadOptions(options){
    let arr = []

    options.forEach(option => {
        if(option.name) {
          option = option.name;
        }
        arr.push(option)
    })
    return arr;
  }

  handleClick(component){
    let graph = 0;

    let graphStyle;
    if (this.counter === 1) graphStyle = 'Line'//this.state.selectGraphValue
    if (this.counter === 2) graphStyle = 'Area'//this.state.selectGraphValue

    // if (graphStyle.includes('Secondary')) {
    //   graph = 1;
    //   this.props.twoGraphToggler(true);
    //   this.graphs.forEach(graph =>{
    //     if(graphStyle.includes(graph)) {
    //       graphStyle = graph;
    //     }
    //   })
    // }

    let colorValue = this.counter === 0 ? 'Blue' : 'Green'

    this.props.allComponents.forEach(component => {
      if (component.name === this.state.selectComponentValue){
        component.toggleActiveMetric('RENDER', this.state.selectMetricValue, graph, graphStyle, colorValue);
        this.props.updateGraph();
      }
    })

    if(this.counter === 3) this.counter = 1;
    else this.counter++;

    console.log('selectComponentValue:',component);

    console.log('selectMetricValue:',this.state.selectMetricValue);

    console.log('selectColorValue:',this.state.selectColorValue)
    
    this.setState({selectComponentValue: component});
  }

  render () {

    return(
     <div id={styles.graphPickerContainer}>
       <div>
        <ComponentSelectorPane 
          componentOptions={this.componentOptions}
          handleComponentClick={this.updateComponentValue.bind(this)}
        />
        </div>
        <div>
        <GraphStyleSelectorPane/>
        </div>
     </div>
    )
  }
}

export default GraphPicker;