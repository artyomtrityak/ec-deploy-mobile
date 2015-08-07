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
            <Image source={rowData.icon} style={Styles.menuListIcon}
                   resizeMode={Image.resizeMode.contain} />
            <Text style={Styles.menuListText}>{rowData.name}</Text>
<<<<<<< HEAD
=======
            {badge}
            <Icon
              name="chevron-right"
              style={Styles.menuRowIcon}
              size={26} color="#5d5d5d"
            />
>>>>>>> master
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
          <View style={Styles.notificationSeparator} />
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

<<<<<<< HEAD
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
=======
    if (this.state.notifications.loading) {
      //return (<LoaderComponent loading={true} />);
      //return (
        //<View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
        //  <LoaderComponent loading={true} />
        //</View>
      //);
    }

    let notificationState = DashboardStore.getState(),
      notifications = notificationState.notifications || [],
      notificationView = notifications.length ?
        (<View style={Styles.notificationContainer}>
          <View style={Styles.notigicationLabel}>
            <Text>Some stuff for your approve</Text>
          </View>
          <View style={Styles.notificationSeparator} />
          <ListView
            style={Styles.list}
            automaticallyAdjustContentInsets={false}
            dataSource={listViewDataSource.cloneWithRows(notifications)}
            renderRow={this.renderNotificationRow}
          />
          <View style={Styles.notificationSeparator} />
        </View>) :
        null;
>>>>>>> master

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
        <ButtonComponent
          style={Styles.toggleButton}
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
