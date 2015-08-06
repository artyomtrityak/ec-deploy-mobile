'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  UIExplorerPage,
  Image,
  TouchableHighlight,
  ScrollView
  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './jss/colors-scheme';
import Styles from './jss/dashboard';
import LoaderJSS from './jss/loader';
import FormJSS from './jss/forms';

import SettingsStore from 'stores/settings.store';
import NotificationStore from 'stores/notification.store';

import PipelinesActions from 'actions/pipelines.actions';

import LoaderComponent from './shared/loader.component';
import NotLoggedInComponent from './shared/not-logged-in.component';
import ButtonComponent from './shared/button.component';
import PipelineDashboardComponent from './pipeline-dashboard.component';
import JobsComponent from './jobs.component';
//import ApplicationComponent from './application.component';
//import EnvironmentComponent from './environment.component';
//import PipelinesComponent from './pipelines.component';

let listViewDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  menuListItems = [
  {
    name: 'Applications',
    icon: require('image!appIcon'),
    targetComponent: JobsComponent,
    targetComponentTitle: 'Jobs list'
  },
  {
    name: 'Environments',
    icon: require('image!envIcon'),
    targetComponent: JobsComponent,
    targetComponentTitle: 'Jobs list'
  },
  {
    name: 'Pipelines',
    icon: require('image!pipeIcon'),
    targetComponent: PipelineDashboardComponent,
    targetComponentTitle: 'Pipelines'
  }
];

function Refresh () {
  let settingsState = SettingsStore.getState();

  if (!settingsState.user) {
    return;
  }

  if (!settingsState.autoSync) {
    PipelinesActions.manualNotificationsFetch();
  } else {
    PipelinesActions.fetchNotifications();
  }
}

export default React.createClass({
  displayName: 'DashboardComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Dashboard',
    refresh: Refresh
  },

  getInitialState() {
    return {
      settings: SettingsStore.getState(),
      menuDataSource: listViewDataSource.cloneWithRows(menuListItems),
      notifications: NotificationStore.getState(),
      notificationShowed: false
    };
  },

  componentDidMount() {
    NotificationStore.on('change', this.handleChange);
    SettingsStore.on('change', this.handleChange);
    if (SettingsStore.getState().autoSync) {
      PipelinesActions.fetchNotifications();
    }
  },

  componentWillUnmount() {
    NotificationStore.off('change', this.handleChange);
    SettingsStore.off('change', this.handleChange);
  },

  handleChange() {
    let notificationState = NotificationStore.getState(),
      notifications = notificationState.notifications || [],
      state = {
        settings: SettingsStore.getState(),
        notifications: notificationState
      };

    if (notifications.length) {
      state.notificationDataSource = listViewDataSource.cloneWithRows(notifications);
      state.notificationShowed = true;
    } else {
      state.notificationDataSource = null;
      state.notificationShowed = false;
    }

    this.setState(state);
  },

  renderMenuRow (rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={
          this.goToNextScreen.bind(this, rowData.targetComponent, rowData.targetComponentTitle)
        }
        underlayColor={Colors.get('white')}
      >
        <View>
          <View style={Styles.menuListRow}>
            <Image source={rowData.icon} style={Styles.menuListIcon}/>
            <Text style={Styles.menuListText}>{rowData.name}</Text>
          </View>
          <View style={Styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  renderNotificationRow (rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={
          this.goToNextScreen.bind(this, PipelineDashboardComponent, rowData.targetComponentTitle)
          }
        underlayColor={Colors.get('white')}
      >
        <View>
          <View style={Styles.notificationRow}>
            <Text style={Styles.notificationText}>{rowData.text}</Text>
            <Icon
              name="angle-double-right"
              style={Styles.notificationIcon}
              size={26} color="black"
            />
          </View>
          <View style={Styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  goToNextScreen (targetComponent, targetComponentTitle) {
    if (targetComponent) {
      this.props.navigator.push({
        component: targetComponent,
        title: targetComponentTitle,
        rightButtonTitle: 'Refresh',
        onRightButtonPress: PipelineDashboardComponent.refresh
      });
    }
  },

  render() {
    if (!this.state.settings.user) {
      return (<NotLoggedInComponent />);
    }

    if (this.state.notifications.loading) {
      return (
        <View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    let notification = this.state.notificationShowed ?
      (<View style={Styles.notificationContainer}>
        <ListView
          style={Styles.list}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.notificationDataSource}
          renderRow={this.renderNotificationRow}
        />
      </View>) :
      null;

    return (
      <View style={Styles.tabContent}>
        {notification}
        <View style={Styles.menuListContainer}>
          <ListView
            style={Styles.list}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.menuDataSource}
            renderRow={this.renderMenuRow}
          />
        </View>
      </View>
    );
  }
});
