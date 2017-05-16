import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileView from './ProfileView';
import DoublePanel from '../components/DoublePanel';
import ProfileList from '../components/ProfileList';
import ProfileResult from '../components/ProfileResult';
import Visualizer from '../components/Visualizer';
import {
  connect as connectToContentScript
} from '../actions';

const propTypes = {
  connectToContentScript: PropTypes.func.isRequired,
  perfs: PropTypes.object.isRequired,
  showItems: PropTypes.object.isRequired,
  recording: PropTypes.bool.isRequired,
  perfReady: PropTypes.bool.isRequired,
};

class App extends Component {
  static propTypes = propTypes;


  componentWillMount() {
    this.props.connectToContentScript();
  }

  render() {

    // let view;
    // view = (<ProfileView perfs={this.props.perfs} />);
    // else view = (<Visualizer perfs={this.props.perfs} />);
    const output = (
      <div>
        <ProfileView perfs={this.props.perfs} />
        <DoublePanel>
          <ProfileList />
          <ProfileResult
            perfs={this.props.perfs}
            showItems={this.props.showItems}
            recording={this.props.recording}
          />
        </DoublePanel>
      </div>
    );
    return output;
  }
}

function mapStateToProps(state) {
  return {
    perfs: state.perfs,
    showItems: state.showItems,
    recording: state.recording,
    perfReady: state.perfReady,
  };
}

App.propTypes = propTypes;

export default connect(mapStateToProps, {
  connectToContentScript
})(App);


