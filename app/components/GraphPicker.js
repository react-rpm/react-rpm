import React, { Component } from 'react';
import styles from './styles/graph_picker.css'
import Select from 'react-select';

class GraphPicker extends Component { 

  constructor(props){
    super(props)

    const metrics = [
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
      selectMetricValue: null,
      selectGraphValue: null,
      selectColorValue: null,
    }

  }

  componentWillReceiveProps(){
    this.componentOptions = this.loadOptions(this.props.allComponents);
    this.forceUpdate();
  }
  updateComponentValue (newValue) {
    console.log(newValue);
    this.setState({
      selectComponentValue: newValue
    });
  }

  updateMetricValue (newValue) {
    console.log(newValue);
    this.setState({
      selectMetricValue: newValue
    });
  }

  updateGraphValue (newValue) {
    console.log(newValue);
    this.setState({
      selectGraphValue: newValue
    });
  }

  updateColorValue (newValue) {
    console.log(newValue);
    this.setState({
      selectColorValue: newValue
    });
  }

  loadOptions(options){
    let arr = []

    options.forEach(option => {

      if(this.graphsLabels.indexOf(option) && this.props.twoGraphsAreActive()) {
        console.log('OPTION:',option);
        arr.push(
        { value: option, label: option },
        )
      } else {

        if(option.name) {
          option = option.name;
        }

        arr.push(
          { value: option, label: option }
        )
      }
    })
    return arr;
  }

  handleClick(){
    let graph = 0;
    let graphStyle = this.state.selectGraphValue
    if (graphStyle.includes('Secondary')) {
      this.graphs.forEach(graph =>{
        if(graphStyle.includes(graph)) {
          graphStyle = graph;
        }
      })
      graph = 1;
    }

    this.props.allComponents.forEach(component => {
      if (component.name === this.state.selectComponentValue){
        component.toggleActiveMetric('RENDER', this.state.selectMetricValue, graph, graphStyle, this.state.selectColorValue);
        this.props.updateGraph();
      }
    })
    
  }

  render () {
    return (
      <div id="graph_picker">
        <div className="section">
          <Select placeholder='Select Component' autofocus options={this.componentOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectComponentValue} onChange={this.updateComponentValue.bind(this)} searchable={true} />
        </div>
        <div className="section">
          <Select placeholder='Select Performance Metric' autofocus options={this.metricOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectMetricValue} onChange={this.updateMetricValue.bind(this)} searchable={true} />
        </div>
        <div className="section">
          <Select placeholder='Select Graph' autofocus options={this.graphOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectGraphValue} onChange={this.updateGraphValue.bind(this)} searchable={true} />
        </div>
        <div className="section">
          <Select placeholder='Select Color' autofocus options={this.colorOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectColorValue} onChange={this.updateColorValue.bind(this)} searchable={true} />
        </div>
        <button id='button' onClick={this.handleClick.bind(this)}>Render Data</button>
      </div>
    );
  }
}

export default GraphPicker;