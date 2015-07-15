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
import NotLoggedInComponent from './utils/not-logged-in.component';
import JobsComponent from './jobs.component';
//import ApplicationComponent from './application.component';
//import EnvironmentComponent from './environment.component';
//import PipelinesComponent from './pipelines.component';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.gray
  },
  icon: {
    marginRight: 10,
    color: '#000'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  text: {
    flex: 1,
    fontSize: 25
  }
});

var listItems = [
  {
    name: 'Applications',
    icon: 'toggle-right',
    targetComponent: JobsComponent,
    targetComponentTitle: 'Jobs list'
  },
  {
    name: 'Environments',
    icon: 'server',
    targetComponent: JobsComponent,
    targetComponentTitle: 'Jobs list'
  },
  {
    name: 'Pipelines',
    icon: 'pied-piper',
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
          this.goToNextScreen.bind(rowData.targetComponent, rowData.targetComponentTitle)
        }
        //Change this color to darker one
        underlayColor={Colors.gray}
      >
        <View>
          <View style={styles.row}>
            <Icon name={rowData.icon} style={styles.icon} size={30}/>
            <Text style={styles.text}>{rowData.name}</Text>
          </View>
          <View style={styles.separator} />
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
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
});
