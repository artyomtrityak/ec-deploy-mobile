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
  propTypes: {
    navigator: React.PropTypes.array
  },

  statics: {
    title: 'Dashboard'
  },

  getInitialState: function() {
    return {
    };
  },
  
  _handleBackButtonPress: function() {
    console.log('back');
    this.props.navigator.pop();
  },

  _handleNextButtonPress: function(nextRoute) {
    console.log('next');
    this.props.navigator.push(nextRoute);
  },

  render: function() {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <Text style={styles.tabText}>{'Dashboard'}</Text>
        <Text style={styles.tabText}>{'Details'}</Text>
      </View>
    );
  }
});
