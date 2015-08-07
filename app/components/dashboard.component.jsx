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

//TODO: this component is cause of React packager errors.
//import LoaderComponent from './shared/loader.component';
import NotLoggedInComponent from './shared/not-logged-in.component';
import PipelineDashboardComponent from './pipeline-dashboard.component';
import JobsComponent from './jobs.component';
import GateApprovalComponent from './gate-approval.component';

import SettingsStore from 'stores/settings.store';
import DashboardStore from 'stores/dashboard.store';

import PipelinesActions from 'actions/pipelines.actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './jss/colors-scheme';
import Styles from './jss/dashboard';
import LoaderJSS from './jss/loader';
import FormJSS from './jss/forms';

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

  console.log('---');
  console.log('atscDynamicRefresh');
  console.log('---');
  console.log();

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
      notifications: DashboardStore.getState()
    };
  },

  componentDidMount() {
    DashboardStore.on('change', this.handleChange);
    SettingsStore.on('change', this.handleChange);
    PipelinesActions.fetchNotifications();
  },

  componentWillUnmount() {
    DashboardStore.off('change', this.handleChange);
    SettingsStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState({
      settings: SettingsStore.getState(),
      notifications: DashboardStore.getState()
    });
  },

  renderMenuRow (rowData, sectionID, rowID) {
    let notifications = DashboardStore.getState().notifications || [],
      badge = notifications.length && rowData.targetComponent === PipelineDashboardComponent ? (
      <View style={Styles.menuListBadge}>
        <Text style={Styles.menuListBadgeText}>{notifications.length}</Text>
      </View>
    ) : null;
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
            {badge}
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
          this.showApprovalDetails.bind(this, rowData.flowRuntimeId)
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

  showApprovalDetails(flowRuntimeId) {
    this.props.navigator.push({
      component: GateApprovalComponent,
      title: 'Job Details',
      passProps: {flowRuntimeId: flowRuntimeId},
      leftButtonTitle: 'Dashboard',
      onLeftButtonPress: () => this.goBackFromApprove()
    });
  },

  goBackFromApprove () {
    PipelinesActions.fetchNotifications();
    this.props.navigator.pop();
  },

  render() {
    if (!this.state.settings.user) {
      return (<NotLoggedInComponent />);
    }

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
          <ListView
            style={Styles.list}
            automaticallyAdjustContentInsets={false}
            dataSource={listViewDataSource.cloneWithRows(notifications)}
            renderRow={this.renderNotificationRow}
          />
        </View>) :
        null;

    return (
      <View style={Styles.tabContent}>
        {notificationView}
        <View style={Styles.menuListContainer}>
          <ListView
            style={Styles.list}
            automaticallyAdjustContentInsets={false}
            dataSource={listViewDataSource.cloneWithRows(menuListItems)}
            renderRow={this.renderMenuRow}
          />
        </View>
      </View>
    );
  }
});
