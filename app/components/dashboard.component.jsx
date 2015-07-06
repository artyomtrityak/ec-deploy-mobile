'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';


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
    };
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
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <Text style={styles.tabText}>{'Dashboard'}</Text>
        <Text style={styles.tabText}>{'Details'}</Text>
      </View>
    );
  }
});
