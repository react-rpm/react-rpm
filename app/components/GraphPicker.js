import React, { Component } from 'react';
import styles from './../assets/graph_picker.css'
import Select from 'react-select';
import './../assets/react-select.css';

class GraphPicker extends Component {

  constructor(props) {
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

    this.displayNameMetrics = {
      'timeWasted': 'Time Wasted',
      'averageRenderTime': 'Avg. Render Time',
      'instanceCount': 'Instance Count',
      'renderCount': 'Render Count',
      'totalLifeCycleTime': 'Total Lifecycle Time',
      'totalRenderTime': 'Total Render Time',
      'totalTime': 'Total Time',
    }

    this.graphs = ['Bar', 'Line', 'Area'];
    this.graphsLabels = ['Bar', 'Line', 'Area', 'Bar (Secondary Graph)', 'Line (Secondary Graph)', 'Area (Secondary Graph)']

    const colors = ['Blue', 'Green', 'Red', 'Random'];

    this.disabled = false //this.props.disabled;

    this.componentOptions = this.loadComponentOptions(this.props.allComponents);
    this.metricOptions = this.loadOptions(metrics);
    this.graphOptions = this.loadOptions(this.graphsLabels);
    this.colorOptions = this.loadOptions(colors);

    this.state = {
      selectComponentValue: null,
      selectMetricValue: 'timeWasted',
      selectGraphValue: 'line',
      selectColorValue: 'red',
    }

  }

  componentWillReceiveProps(props) {
    if (this.props.allComponents)
      this.componentOptions = this.loadComponentOptions(this.props.allComponents)
    this.forceUpdate();
  }
  updateComponentValue(newValue) {
    this.setState({
      selectComponentValue: newValue
    });
  }

  updateMetricValue(newValue) {
    this.setState({
      selectMetricValue: newValue
    });
  }

  updateGraphValue(newValue) {
    this.setState({
      selectGraphValue: newValue
    });
  }

  updateColorValue(newValue) {
    this.setState({
      selectColorValue: newValue
    });
  }

  loadOptions(options) {
    let arr = []

    options.forEach(option => {
      if (option.name) {
        option = option.name;
      }

      let labelName = options[0] === 'timeWasted' ? this.displayNameMetrics[option] : option
      arr.push(
        { value: option, label: labelName }
      )
    })
    return arr;
  }

  loadComponentOptions(options) {
    const arr = [];
    const sorted = options.sort( (a,b) => {
      return a.getMetricTotal(this.state.selectMetricValue) < b.getMetricTotal(this.state.selectMetricValue)
    })

    console.log('sorted:',sorted);

    sorted.forEach(option => 
     arr.push({value: option.name, label: option.name })
    )
    return arr;
  }

  handleClick() {
    let graph = 0;
    let graphStyle = this.state.selectGraphValue
    if (graphStyle.includes('Secondary')) {
      graph = 1;
      this.props.twoGraphToggler(true);
      this.graphs.forEach(graph => {
        if (graphStyle.includes(graph)) {
          graphStyle = graph;
        }
      })
    }

    this.props.allComponents.forEach(component => {
      if (component.name === this.state.selectComponentValue) {
        component.toggleActiveMetric('RENDER', this.state.selectMetricValue, graph, graphStyle, this.state.selectColorValue);
        this.props.updateGraph();
      }
    })

  }

  render() {
    return (
      <div id={styles.graph_picker}>
        <div className="section">
          <Select placeholder='Performance Metric' autofocus={false} options={this.metricOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectMetricValue} onChange={this.updateMetricValue.bind(this)} searchable={true} />
        </div>
        <div className="section">
          <Select placeholder='Component' autofocus={false} options={this.componentOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectComponentValue} onChange={this.updateComponentValue.bind(this)} searchable={true} />
        </div>
        {/*<div className="section">
          <Select placeholder='Style' autofocus={false} options={this.graphOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectGraphValue} onChange={this.updateGraphValue.bind(this)} searchable={true} />
        </div>*/}
        <div className={styles.graphSelectorBin}>
          <button className={styles.graphButton}><img className={styles.graphButtonImage} src={require('./../assets/images/graph_button_line.png')}/></button>
          <button className={styles.graphButton}><img className={styles.graphButtonImage} src={require('./../assets/images/graph_button_area.png')}/></button>
          <button className={styles.graphButton}><img className={styles.graphButtonImage} src={require('./../assets/images/graph_button_bar.png')}/></button>
        </div> 
        {/*<div className="section">
          <Select placeholder='Select Color' autofocus={false} options={this.colorOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectColorValue} onChange={this.updateColorValue.bind(this)} searchable={true} />
        </div>*/}
        <button id={styles.button} onClick={this.handleClick.bind(this)}>+</button>
      </div>
    );
  }
}

export default GraphPicker;