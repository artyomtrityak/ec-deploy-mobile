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

import SettingsStore from 'stores/settings.store';

import ButtonComponent from './shared/button.component';
import NotLoggedInComponent from './shared/not-logged-in.component';
import JobsComponent from './jobs.component';

//import ApplicationComponent from './application.component';
//import EnvironmentComponent from './environment.component';
//import PipelinesComponent from './pipelines.component';
import PipelineDashboardComponent from './pipeline-dashboard.component';

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
],
  notificationsListItems = [
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various. Also it can have very various length',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    },
    {
      text: 'Notification Text may be very various',
      targetComponent: JobsComponent,
      targetComponentTitle: 'Jobs list'
    }
  ];

function Refresh (smartLoad=false) {
  if (!SettingsStore.getState().user) {
    return;
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
      notificationShowed: false
    };
  },

  componentDidMount() {
    SettingsStore.on('change', this.handleChange);
  },

  componentWillUnmount() {
    SettingsStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState({
      settings: SettingsStore.getState()
    });
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
          this.goToNextScreen.bind(this, rowData.targetComponent, rowData.targetComponentTitle)
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
        title: targetComponentTitle
      });
    }
  },

  toggleNotificationView (notifications) {
    let state;
    if (notifications.length) {
      listViewDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      state = {
        notificationDataSource: listViewDataSource.cloneWithRows(notifications),
        notificationShowed: true
      };
    } else {
      state = {
        notificationDataSource: null,
        notificationShowed: false
      };
    }
    this.setState(state);
  },

  render() {
    if (!this.state.settings.user) {
      return (<NotLoggedInComponent />);
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
        <View style={Styles.navListContainer}>
          <ListView
            style={Styles.list}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.menuDataSource}
            renderRow={this.renderMenuRow}
          />
        </View>
        <ButtonComponent
          onPress={
            this.toggleNotificationView.bind(
              this,
              this.state.notificationShowed ? [] : notificationsListItems
            )
            }
          text={'Toggle Notifications'}
          color={Colors.get('white')}
          backgroundColor={Colors.get('darkBlue')}
        />
      </View>
    );
  }
});
