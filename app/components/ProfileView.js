import React, { Component } from 'react';
import ProfileViewChart from './ProfileViewChart';
import ProfileToolbar from './ProfileToolbar';
import { samplePerfs } from './sample_perfs';
import styles from './styles/visualizer.css';

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
      <div id='plot-container'>
        <img src={require('./styles/banner_logo.png')} />
        <ProfileViewChart
          perfData = {this.perfData}
          checkIfTwoGraphsActive={this.checkIfTwoGraphsActive}
          twoGraphToggler={this.twoGraphToggler}
          perfItems={this.state.perfItems}
          onPerfItemClick={this.onPerfItemClick}
        />
        {/*<ProfileToolbar
          twoGraphsAreActive={this.checkIfTwoGraphsActive}
          twoGraphToggler={this.twoGraphToggler}
        />*/}
      </div>
    </div>
    );
  }
}

export default ProfileView;
