'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import JobsActions from 'actions/jobs.actions';
import SettingsStore from 'stores/settings.store';


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

export default React.createClass({
  displayName: 'JobsComponent',

  statics: {
    title: 'Jobs'
  },

  getInitialState() {
    return {
    };
  },

  componentDidMount() {
    console.log('jobs mount');
    //JobsActions.getJobs();
  },

  render() {
    console.log(JobsActions.getJobs());
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <Text style={styles.tabText}>{'Jobs'}</Text>
        <Text style={styles.tabText}>{'Details'}</Text>
      </View>
    );
  }
});
