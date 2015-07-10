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
import LoaderComponent from './utils/loader.component';


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

function Refresh (smartLoad=false) {
  if (!SettingsStore.getState().user) {
    return;
  }
  if (smartLoad === true && JobsStore.getState().jobs) {
    return;
  }
  JobsActions.getJobs();
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
    if (this.state.jobs.loading) {
      return (
        <View style={[styles.tabContent, {marginTop: 200}]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

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
