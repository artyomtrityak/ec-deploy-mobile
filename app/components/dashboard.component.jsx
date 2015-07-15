'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  UIExplorerPage,
  Image,
  TouchableHighlight
  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './jss/colors-scheme';
import SettingsStore from 'stores/settings.store';
import NotLoggedInComponent from './shared/not-logged-in.component';
import JobsComponent from './jobs.component';
import Styles from './jss/dashboard';
//import ApplicationComponent from './application.component';
//import EnvironmentComponent from './environment.component';
//import PipelinesComponent from './pipelines.component';

var listItems = [
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      settings: SettingsStore.getState(),
      dataSource: ds.cloneWithRows(listItems)
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

  _handleBackButtonPress() {
    console.log('back');
    this.props.navigator.pop();
  },

  _handleNextButtonPress(nextRoute) {
    console.log('next');
    this.props.navigator.push(nextRoute);
  },

  _renderRow: function(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={
          this.goToNextScreen.bind(this, rowData.targetComponent, rowData.targetComponentTitle)
        }
        underlayColor={Colors.get('white')}
      >
        <View>
          <View style={Styles.row}>
            <Image source={rowData.icon} style={Styles.icon}/>
            <Text style={Styles.text}>{rowData.name}</Text>
          </View>
          <View style={Styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  goToNextScreen: function(targetComponent, targetComponentTitle) {
    this.props.navigator.push({
      component: targetComponent,
      title: targetComponentTitle
    });
  },

  render() {
    if (!this.state.settings.user) {
      return (<NotLoggedInComponent />);
    }

    return (
      <View style={[Styles.tabContent, {backgroundColor: '#FFF'}]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
});
