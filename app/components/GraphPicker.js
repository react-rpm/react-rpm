import React, { Component } from 'react';
import styles from './../assets/graph_picker.css'
import Select from 'react-select';
import {graphColors} from './../assets/colors.js'
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

    this.disabled = false //this.props.disabled;

    this.componentOptions = this.loadComponentOptions(this.props.allComponents);
    this.metricOptions = this.loadOptions(metrics);
    // this.graphOptions = this.loadOptions(this.graphsLabels);
    // this.colorOptions = this.loadOptions(colors);

    this.state = {
      selectComponentValue: null,
      selectMetricValue: 'timeWasted',
      selectGraphValue: 'null',
      selectColorValue: 'null',
    }
    console.log(graphColors);
    this.colorButtons = graphColors.map(color =>
      <button
        className={styles.colorButton}
        style=
          {{background: color}}
        onClick={
          () => {this.updateColorValue(color)}
        }
      />
    )

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

  updateGraphValue(newValue){
    this.setState({
      selectGraphValue: newValue
    });
  }

  updateColorValue(newValue) {
    console.log('New Color',newValue);
    this.setState(
      {selectColorValue: newValue}
    );
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

  handleClick = (whichGraph) => {
    if (whichGraph) this.props.twoGraphToggler(true);
    this.props.allComponents.forEach(component => {
      if (component.name === this.state.selectComponentValue) {
        component.toggleActiveMetric('RENDER', this.state.selectMetricValue, whichGraph, this.state.selectGraphValue, this.state.selectColorValue);
        this.props.updateGraph();
      }
    })
  }

  render() {
    return (

      <div id={styles.graph_picker}>

        <div className="section">
          <Select 
            placeholder='Performance Metric' 
            autofocus={false} 
            options={this.metricOptions} 
            simpleValue clearable={true} 
            name="selected-state" 
            disabled={false} 
            value={this.state.selectMetricValue} 
            onChange={this.updateMetricValue.bind(this)} 
            searchable={true} 
          />
        </div>

        <div className="section">
          <Select 
            placeholder='Component' 
            autofocus={false} 
            options={this.componentOptions} 
            simpleValue 
            clearable={true} 
            name="selected-state" 
            disabled={false} 
            value={this.state.selectComponentValue} 
            onChange={this.updateComponentValue.bind(this)} 
            searchable={true} 
          />
        </div>

        {/*<div className="section">
          <Select placeholder='Style' autofocus={false} options={this.graphOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectGraphValue} onChange={this.updateGraphValue.bind(this)} searchable={true} />
        </div>*/}

        <div className={styles.graphSelectorBin}>

          <button 
            className={
              this.state.selectGraphValue === 'line' ? styles.graphButtonSelected : styles.graphButton
              }
            style={{
              background: this.state.selectGraphValue === 'line' ? this.state.selectColorValue : 'transparent'
            }}
            >
            <img 
              className={styles.graphButtonImage} 
              src={require('./../assets/images/graph_button_line.png')}
              onClick={ () => this.updateGraphValue('line') }
            />
          </button>

          <button 
            className={
              this.state.selectGraphValue === 'area' ? styles.graphButtonSelected : styles.graphButton
              }
            style={{
              background: this.state.selectGraphValue === 'area' ? this.state.selectColorValue : 'transparent'
            }}
            >
            <img 
              className={styles.graphButtonImage} 
              src={require('./../assets/images/graph_button_area.png')}
              onClick={ () => this.updateGraphValue('area') }
            />
          </button>


          <button
            className={
              this.state.selectGraphValue === 'bar' ? styles.graphButtonSelected : styles.graphButton
              }
              style={{
              background: this.state.selectGraphValue === 'bar' ? this.state.selectColorValue : 'transparent'
            }}
            >
            <img
              className={styles.graphButtonImage}
              src={require('./../assets/images/graph_button_bar.png')}
              onClick={ () => this.updateGraphValue('bar') }
            />
          </button>
        </div> 
        
        {/*<div className="section">
          <Select placeholder='Select Color' autofocus={false} options={this.colorOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectColorValue} onChange={this.updateColorValue.bind(this)} searchable={true} />
        </div>*/}

        <div id={styles.colorSelectorBin}>
          {this.colorButtons}
        </div>

        <div id={styles.renderButtonContainer}>
          <button 
            className={styles.button} 
            onClick={
              () => this.handleClick(0)
            }
            style={
              {background: this.state.selectColorValue}
            }
          >
            Main [+]
          </button>
          <button 
            className={styles.button} 
            onClick={
              () => this.handleClick(1)}
            style={
              {background: this.state.selectColorValue}
            }
          >
            Comparison [+]
          </button>
        </div>
      </div>
    );
  }
}

export default GraphPicker;