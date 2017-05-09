import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileChart from '.././components/ProfileChart';
import ProfileBar from '.././components/ProfileBar';
import ProfileContent from '.././components/ProfileContent';
import styles from '.././assets/profileView.css';
// import { samplePerfs } from '.././sample_perfs';

const propTypes = {
  perfs: PropTypes.object.isRequired,
};

class ProfileView extends Component {
  static propTypes = propTypes;
  constructor(props) {
    super(props);

    this.state = {
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
  }

  getPerfData = () => {
    const perfs = this.props.perfs;
    const perfData = [];
    const wastedTime = [];
    const inclusive = [];
    const exclusive = [];
    const dom = [];
    if (perfs.wasted[0]) perfs.wasted[0].forEach((set) => { wastedTime.push(set); });
    else {
      wastedTime.push({
        'Owner > Component': 'N/A',
        'Inclusive wasted time (ms)': 0,
        'Instance count': 0,
        'Render count': 0,
      });
    }
    if (perfs.inclusive[0]) perfs.inclusive[0].forEach((set) => { inclusive.push(set); });
    else {
      inclusive.push({
        'Owner > Component': 'N/A',
        'Inclusive render time (ms)': 0,
        'Instance count': 0,
        'Render count': 0,
      });
    }
    if (perfs.exclusive[0]) perfs.exclusive[0].forEach((set) => { exclusive.push(set); });
    else {
      exclusive.push({
        'Component': 'N/A',
        'Total time (ms)': 0,
        'Instance count': 0,
        'Total render time (ms)': 0,
        'Average render time (ms)': 0,
        'Render count': 0,
        'Total lifecycle time (ms)': 0,
      });
    }
    if (perfs.dom[0]) perfs.dom[0].forEach((set) => { dom.push(set); });
    else {
      dom.push({
        'Owner > Node': 'N/A',
        'Operation': 'N/A',
        'Payload': 'N/A',
        'Flush index': 0,
        'Owner Component ID': 0,
        'DOM Component ID': 0,
      });
    }
    perfData.push(wastedTime);
    perfData.push(inclusive);
    perfData.push(exclusive);
    perfData.push(dom);
    return perfData;
  }

  onPerfItemClick = (perfItem) => {
    const item = perfItem;
    item.selected = !item.selected;
    const perfItems = this.state.perfItems;
    perfItems.forEach((p) => {
      if (p.label !== item.label && p.selected) {
        p.selected = !p.selected;
      }
    });
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
      case 'Operations':
        dataKeys = [
          { id: 0, selected: true, label: 'Operation' },
          { id: 1, selected: false, label: 'Payload' },
          { id: 2, selected: false, label: 'Flush index' },
          { id: 3, selected: false, label: 'Owner Component ID' },
          { id: 4, selected: false, label: 'DOM Component ID' },
        ];
        this.setState({ dataKeys });
        break;
    }
  }

  onDataKeyClick = (dataKey) => {
    const key = dataKey
    key.selected = !key.selected;
    const dataKeys = this.state.dataKeys;
    dataKeys.forEach((k) => {
      if (k.label !== key.label && k.selected) {
        k.selected = !k.selected;
      }
    });
    this.setState({ dataKeys });
  }

  render() {
    return (
      <div id={styles.main_container}>
        <ProfileChart
          perfData={this.getPerfData()}
          perfItems={this.state.perfItems}
          dataKeys={this.state.dataKeys}
        />
        <ProfileBar
          perfItems={this.state.perfItems}
          onPerfItemClick={this.onPerfItemClick}
          showDataKeys={this.showDataKeys}
        />
        <ProfileContent
          dataKeys={this.state.dataKeys}
          onDataKeyClick={this.onDataKeyClick}
        />
      </div>
    );
  }
}

ProfileView.propTypes = propTypes;

export default ProfileView;
