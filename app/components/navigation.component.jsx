'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppStore from 'stores/app.store';
import DashboardComponent from './dashboard.component';
import JobsComponent from './jobs.component';
import SettingsComponent from './settings.component';
import GateApprovalComponent from './gate-approval.component';

export default React.createClass({
  displayName: 'NavigationComponent',

  getInitialState() {
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

  render() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="black">
        <Icon.TabBarItem
          badge={1}
          title="Dashboard"
          iconName="cloud"
          selectedIconName="cloud"
          selected={this.state.selectedTab === 'dashboard'}
          onPress={() => {
            this.selectTab('dashboard');
            DashboardComponent.refresh(true);
          }}>

          <NavigatorIOS
            barTintColor={'#98dfff'}
            tintColor={'#0471a2'}
            titleTextColor={'#000000'}
            style={{flex: 1}}
            initialRoute={{
              component: DashboardComponent,
              title: 'Dashboard',
              rightButtonTitle: 'Refresh',
              onRightButtonPress: DashboardComponent.refresh
            }}
          />

        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Jobs"
          iconName="tasks"
          selectedIconName="tasks"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'jobs'}
          onPress={() => {
            this.selectTab('jobs');
            JobsComponent.refresh(true);
          }}>

          <NavigatorIOS
            style={{flex: 1}}
            initialRoute={{
              component: JobsComponent,
              title: 'Jobs',
              rightButtonTitle: 'Refresh',
              onRightButtonPress: JobsComponent.refresh
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
              title: 'Settings',
              passProps: {
                flowRuntimeId: '5a559e9a-3b6e-11e5-8a41-005056330c34'
              }
            }}
          />

        </Icon.TabBarItem>

      </TabBarIOS>
    );
  }
});
