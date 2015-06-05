/**
 * Electric Cloud Deploy Mobile App
 */
'use strict';
import React, {
  TabBarIOS,
  AppRegistry
} from 'react-native';

import SettingsComponent from './components/settings.component';
import JobsComponent from './components/jobs.component';
import DashboardComponent from './components/dashboard.component';

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
      <TabBarIOS tintColor="black" barTintColor='#3abeff'>
        <TabBarIOS.Item title="Dashboard" icon={require('image!icon4')}>
          <DashboardComponent />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Jobs" icon={require('image!icon4')}>
          <JobsComponent />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Settings" icon={require('image!ok')} selected={true} >
          <SettingsComponent />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('ecdeploy', () => ECDeploy);
