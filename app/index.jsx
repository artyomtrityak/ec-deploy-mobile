/**
 * Electric Cloud Deploy Mobile App
 */
'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

console.log('REACTR!', React);

import AppStore from 'stores/app.store';


import SettingsComponent from './components/settings.component';
//import JobsComponent from './components/jobs.component';
//import DashboardComponent from './components/dashboard.component';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

var ECDeploy = React.createClass({
  statics: {
    title: 'Electric Deploy',
    description: 'Electric Deploy mobile app'
  },

  getInitialState: function() {
    return {
      activeTab: 'redTab'
    };
  },

  render: function() {
    return (
      <SettingsComponent />
    );
  }
});

AppRegistry.registerComponent('ecdeploy2', () => ECDeploy);
