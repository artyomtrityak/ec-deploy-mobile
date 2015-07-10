'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import JobsActions from 'actions/jobs.actions';
import SettingsStore from 'stores/settings.store';
import JobsStore from 'stores/jobs.store';
import NotLoggenInComponent from './utils/not-logged-in.component';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'black',
    margin: 50
  }
});

function Refresh () {
  if (!SettingsStore.getState().user) {
    return;
  }
}

export default React.createClass({
  displayName: 'JobsComponent',

  statics: {
    title: 'Jobs',
    refresh: Refresh
  },

  getInitialState() {
    return {
      jobs: JobsStore.getState(),
      settings: SettingsStore.getState()
    };
  },

  componentDidMount() {
    SettingsStore.on('change', this.handleChange);
    JobsStore.on('change', this.handleChange);
    //JobsActions.getJobs();
  },

  componentWillUnmount() {
    SettingsStore.off('change', this.handleChange);
    JobsStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState({
      jobs: JobsStore.getState(),
      settings: SettingsStore.getState()
    });
  },

  render() {
    console.log(this.state);

    if (!this.state.settings.user) {
      return (<NotLoggenInComponent />);  
    }

    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <Text style={styles.tabText}>{'Jobs'}</Text>
        <Text style={styles.tabText}>{'Details'}</Text>
      </View>
    );
  }
});
