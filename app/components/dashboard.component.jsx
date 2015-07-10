'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import SettingsStore from 'stores/settings.store';
import NotLoggenInComponent from './utils/not-logged-in.component';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'black',
    margin: 50
  }
});

export default React.createClass({
  displayName: 'DashboardComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Dashboard'
  },

  getInitialState() {
    return {
      settings: SettingsStore.getState()
    };
  },

  componentDidMount() {
    SettingsStore.on('change', this.handleChange);
    //JobsActions.getJobs();
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

  render() {
    console.log(this.state);

    if (!this.state.settings.user) {
      return (<NotLoggenInComponent />);  
    }
    
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <Text style={styles.tabText}>{'Dashboard'}</Text>
        <Text style={styles.tabText}>{'Details'}</Text>
      </View>
    );
  }
});
