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
    let graphStyle = 'Line'//this.state.selectGraphValue
    if (graphStyle.includes('Secondary')) {
      graph = 1;
      this.props.twoGraphToggler(true);
      this.graphs.forEach(graph =>{
        if(graphStyle.includes(graph)) {
          graphStyle = graph;
        }
      })
    }

    this.props.allComponents.forEach(component => {
      if (component.name === this.state.selectComponentValue){
        component.toggleActiveMetric('RENDER', this.state.selectMetricValue, graph, graphStyle, this.state.selectColorValue);
        this.props.updateGraph();
      }
    })

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