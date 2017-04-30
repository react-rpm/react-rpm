import React, { Component } from 'react';
import styles from './styles/graph_picker.css'
import Select from 'react-select';

class GraphPicker extends Component { 

  constructor(props){
    super(props)

    this.label = 'Components'
    this.disabled =  false //this.props.disabled;
    this.componentOptions = this.loadComponentOptions(this.props.allComponents)

    this.state = {
      selectValue: this.componentOptions[0]
    }

  }
  updateValue (newValue) {
    this.setState({
      selectValue: newValue
    });
  }

  toggleCheckbox (e) {
    let newState = {};
    newState[e.target.name] = e.target.checked;
    this.setState(newState);
  }

  loadComponentOptions(components){
    let arr = []
    components.forEach(component =>{
      arr.push(
        {
          value: component.name, label: component.name
        }
      )
    })
    return arr;
  }
  

  render () {
    return (
      <div id="graph_picker">
        <div className="section">
          <Select ref="stateSelect" placeholder='Select Component' autofocus options={this.componentOptions} simpleValue clearable={true} name="selected-state" disabled={false} value={this.state.selectValue} onChange={this.updateValue} searchable={true} />
        </div>
      </div>
    );
  }
}

export default GraphPicker;