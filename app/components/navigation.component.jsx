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


var Icon = require('react-native-vector-icons/FontAwesome');


export default React.createClass({
  statics: {
    title: 'Navigator'
  },

  getInitialState: function() {
    return {
      selectedTab: 'dashboard',
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
        <Icon.TabBarItem
          title="Dashboard"
          iconName="cloud"
          selectedIconName="cloud"
          selected={this.state.selectedTab === 'dashboard'}
          onPress={this.selectTab.bind(this, 'dashboard')}>

          <NavigatorIOS
            style={{flex: 1}}
            initialRoute={{
              component: DashboardComponent,
              title: 'Dashboard'
            }}
          />

        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Jobs"
          iconName="tasks"
          selectedIconName="tasks"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'jobs'}
          onPress={this.selectTab.bind(this, 'jobs')}>

          <NavigatorIOS
            style={{flex: 1}}
            initialRoute={{
              component: JobsComponent,
              title: 'Jobs'
            }}
          />

        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Settings"
          iconName="gear"
          selectedIconName="gear"
          selected={this.state.selectedTab === 'settings'}
          onPress={this.selectTab.bind(this, 'settings')}
          >

          <NavigatorIOS
            style={{flex: 1}}
            initialRoute={{
              component: SettingsComponent,
              title: 'Settings'
            }}
          />

        </Icon.TabBarItem>

      </TabBarIOS>
    );
  }
});
