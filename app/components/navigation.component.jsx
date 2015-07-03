/**
 * Electric Cloud Deploy Mobile App
 */
'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

import AppStore from 'stores/app.store';
import DashboardComponent from './dashboard.component';
import JobsComponent from './jobs.component';
import SettingsComponent from './settings.component';


export default React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'settings',
      notifCount: 0,
      presses: 0
    };
  },

  selectTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="black">
        <TabBarIOS.Item
          title="Dashboard"
          selected={this.state.selectedTab === 'dashboard'}
          onPress={this.selectTab.bind(this, 'dashboard')}>

          <DashboardComponent />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Jobs"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'jobs'}
          onPress={this.selectTab.bind(this, 'jobs')}>

          <JobsComponent />

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={this.selectTab.bind(this, 'settings')}>

          <SettingsComponent />

        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});
