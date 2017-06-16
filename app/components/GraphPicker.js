import React, { Component } from 'react';
import styles from './../assets/graph_picker.css'
import Select from 'react-select';
import {graphColors} from './../assets/colors.js'
import './../assets/react-select.css';
import tinycolor from 'tinycolor2';

class GraphPicker extends Component {

  constructor(props) {
    super(props)

    const metrics = [
      'timeWasted',
      'averageRenderTime',
      'totalLifeCycleTime',
      'totalRenderTime',
      'totalTime',
    ]

    this.displayNameMetrics = {
      'timeWasted': 'Time Wasted',
      'averageRenderTime': 'Avg. Render Time',
      'totalLifeCycleTime': 'Total Lifecycle Time',
      'totalRenderTime': 'Total Render Time',
      'totalTime': 'Total Time',
    }

    this.disabled = false //this.props.disabled;

    this.componentOptions = this.loadComponentOptions(this.props.allComponents);
    this.metricOptions = this.loadOptions(metrics);
    this.renderButtonsActive = false;

    this.state = {
      selectComponentValue: undefined,
      selectMetricValue: 'timeWasted',
      selectGraphValue: undefined,
      selectColorValue: undefined,
      showColorOptions: true
    }
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
    if (this.props.allComponents){
      this.componentOptions = this.loadComponentOptions(this.props.allComponents)
    }
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
    this.setState(
      {selectColorValue: newValue}
    );
  }

  toggleColorPanel = () => {
    this.setState(
      {showColorOptions: !this.state.showColorOptions}
    )
  }

  loadOptions(options) {
    let arr = []

    options.forEach(option => {
      if (option.name) {
        option = option.name;
      }

      let labelName = options[0] === 'timeWasted' ? this.displayNameMetrics[option] : option
      arr.push(
        { value: option, label: labelName}
      )
    })
    return arr;
  }

  loadComponentOptions(options) {
    const arr = [];
    const sorted = options.sort( (a,b) => {
      return a.getMetricTotal(this.state.selectMetricValue) < b.getMetricTotal(this.state.selectMetricValue)
    })

    sorted.forEach(option => {
      let wastedColor = 'grey';
      if (this.state.selectMetricValue === 'timeWasted'){
        if (option.getMetricTotal('timeWasted') != 0) {
          if (option.getLastValue('timeWasted')){
            wastedColor = '#ff5757';
          }else {
            wastedColor = '#57ff9e'
          }
        }
      }
      arr.push(
        {
        value: option.name, label: option.name, style: {background:wastedColor, color:'white'} 
        })
      }
    )
    return arr;
  }

  handleClick = (whichGraph) => {
    this.props.allComponents.forEach(component => {
      if (component.name === this.state.selectComponentValue) {
        component.toggleActiveMetric('RENDER', this.state.selectMetricValue, whichGraph, this.state.selectGraphValue, this.state.selectColorValue);
        if (whichGraph === 1) {
          this.props.twoGraphToggler(true);
        }
        this.props.updateGraph();
      }
    })
  }

getBackgroundColor = (hex) => {
  let thisColor = new tinycolor(hex);
  if (thisColor.getBrightness() < 160) return 'black';
  else return 'white';
}

canRenderToGraph = () => {
  return this.state.selectComponentValue && this.state.selectGraphValue && this.state.selectColorValue
}

  render() {
    return (

      <div id={styles.graph_picker}>

        <div className="section"
          style={{
              zIndex:'99998'
            }}
        >
        <img id={styles.dropDownIcon_metric} 
              src={require('./../assets/images/drop_down_icon.png')}
        />
        <img id={styles.dropDownIcon_component} 
              src={require('./../assets/images/drop_down_icon.png')}
        />
          <Select 
            placeholder='Performance Metric' 
            autofocus={false} 
            options={this.metricOptions} 
            simpleValue 
            clearable={true} 
            name="selected-state" 
            disabled={false} 
            value={this.state.selectMetricValue} 
            onChange={this.updateMetricValue.bind(this)} 
            searchable={true} 
            style={{
              zIndex:'999999'
            }}
          />
        </div>

        <div className="section"
            style={{
              zIndex:'99998'
            }}
        >
          <Select 
            placeholder={
              this.state.selectMetricValue 
              ? `Component (sorted by ${this.state.selectMetricValue})`
              : `Component`
            } 
            autofocus={false} 
            simpleValue
            options={this.componentOptions} 
            clearable={true} 
            name="selected-state" 
            disabled={false} 
            value={this.state.selectComponentValue} 
            onChange={this.updateComponentValue.bind(this)} 
            searchable={true} 
            
          />
        </div>
        <div className={styles.graphSelectorBin}>

          <button 
            className={
              this.state.selectGraphValue === 'line' ? styles.graphButtonSelected : styles.graphButton
              }
            >
            <img 
              className={styles.graphButtonImage} 
              src={require('./../assets/images/graph_button_line.png')}
              onClick={ () => this.updateGraphValue('line') }
            />
          </button>

          <button
            className={styles.colorOptionButton}
            onClick={this.toggleColorPanel}
            style={{background: this.state.selectColorValue}}
          >
            <img src={require('./../assets/images/drop_down_icon.png')}
                 id={styles.colorDropDownIcon}
            />
          </button>
          <button 
            className={
              this.state.selectGraphValue === 'area' ? styles.graphButtonSelected : styles.graphButton
              }
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
            >
            <img
              className={styles.graphButtonImage}
              src={require('./../assets/images/graph_button_bar.png')}
              onClick={ () => this.updateGraphValue('bar') }
            />
          </button>
        </div> 

        <div id={styles.colorSelectorBin} 
          className={this.state.showColorOptions ? styles.showColors : styles.hideColors }
          >
          {this.colorButtons}
        </div>

        <div id={styles.renderButtonContainer}>
          <button
            className= {
              this.canRenderToGraph() ? styles.renderButtonActive : styles.renderButtonInactive
            }
            onClick={ 
              () => this.canRenderToGraph() && this.handleClick(0)
            }
          >
            Graph I
          </button>
          {(this.props.componentsActiveOnGraphs.length > 0) && (
            <button
              className= {
                this.canRenderToGraph() ? styles.renderButtonActive : styles.renderButtonInactive
              }
              onClick={
                () => this.handleClick(1)}
            >
              Graph II
            </button>
          )
          }
        </div>
      </div>
    );
  }
}

export default GraphPicker;