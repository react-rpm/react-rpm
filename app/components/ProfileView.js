import React, { Component } from 'react';
import ProfileViewChart from './ProfileViewChart';
import ProfileToolbar from './ProfileToolbar';
import styles from './styles/profileView.css';
import { samplePerfs } from './sample_perfs';

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      twoGraphsAreActive: false,
      perfItems: [
        { id: 0, selected: true, label: 'Wasted Time' },
        { id: 1, selected: false, label: 'Inclusive' },
        { id: 2, selected: false, label: 'Exclusive' },
        { id: 3, selected: false, label: 'Operations' },
      ],
      dataKeys: [
        { id: 0, selected: true, label: 'Inclusive wasted time (ms)' },
        { id: 1, selected: false, label: 'Instance count' },
        { id: 2, selected: false, label: 'Render count' },
      ],
    };
    const wastedTime = [];
    const inclusive = [];
    const exclusive = [];
    const dom = [];
    samplePerfs.wasted[0].forEach((set) => { wastedTime.push(set); });
    samplePerfs.inclusive[0].forEach((set) => { inclusive.push(set); });
    samplePerfs.exclusive[0].forEach((set) => { exclusive.push(set); });
    samplePerfs.dom[0].forEach((set) => { dom.push(set); });
    const perfData = [];
    perfData.push(wastedTime);
    perfData.push(inclusive);
    perfData.push(exclusive);
    perfData.push(dom);
    this.perfData = perfData;
  }

  onPerfItemClick = (perfItem) => {
    perfItem.selected = !perfItem.selected;
    const perfItems = this.state.perfItems;
    this.setState({ perfItems });
  }

  showDataKeys = (perfItem) => {
    let dataKeys;
    switch (perfItem.label) {
      case 'Wasted Time':
        dataKeys = [
          { id: 0, selected: true, label: 'Inclusive wasted time (ms)' },
          { id: 1, selected: false, label: 'Instance count' },
          { id: 2, selected: false, label: 'Render count' },
        ];
        this.setState({ dataKeys });
        break;
      case 'Inclusive':
        dataKeys = [
          { id: 0, selected: true, label: 'Inclusive render time (ms)' },
          { id: 1, selected: false, label: 'Instance count' },
          { id: 2, selected: false, label: 'Render count' },
        ];
        this.setState({ dataKeys });
        break;
      case 'Exclusive':
        dataKeys = [
          { id: 0, selected: true, label: 'Total time (ms)' },
          { id: 1, selected: false, label: 'Instance count' },
          { id: 2, selected: false, label: 'Total render time (ms)' },
          { id: 3, selected: false, label: 'Average render time (ms)' },
          { id: 4, selected: false, label: 'Render count' },
          { id: 5, selected: false, label: 'Total lifecycle time (ms)' },
        ];
        this.setState({ dataKeys });
        break;
    }
  }

  onDataKeyClick = (dataKey) => {
    dataKey.selected = !dataKey.selected;
    const dataKeys = this.state.dataKeys;
    this.setState({ dataKeys });
  }

  twoGraphToggler = (bool) => {
    this.resetComponentGraphAnimation();
    this.setState({ twoGraphsAreActive: bool });
  }

  resetComponentGraphAnimation = () => {
    this.state.allComponents.forEach(component => {
      component.enableAllMetricAnimation();
    });
  }

  checkIfTwoGraphsActive = () => {
    const returnVal = this.state.twoGraphsAreActive;
    return returnVal;
  }

  render() {
    return (
    <div id={styles.main_container}>
      <img src={require('./styles/banner_logo.png')} />
      <ProfileViewChart
        perfData = {this.perfData}
        perfItems={this.state.perfItems}
        dataKeys={this.state.dataKeys}
        onPerfItemClick={this.onPerfItemClick}
        showDataKeys={this.showDataKeys}
        checkIfTwoGraphsActive={this.checkIfTwoGraphsActive}
        twoGraphToggler={this.twoGraphToggler}
      />
      <ProfileToolbar
        perfItems={this.state.perfItems}
        dataKeys={this.state.dataKeys}
        onDataKeyClick={this.onDataKeyClick}
      />
    </div>
    );
  }
}

export default ProfileView;
