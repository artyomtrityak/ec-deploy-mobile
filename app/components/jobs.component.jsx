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
  displayName: 'JobsComponent',

  statics: {
    title: 'Jobs'
  },

  getInitialState() {
    return {
    };
  },

  render() {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <Text style={styles.tabText}>{'Jobs'}</Text>
        <Text style={styles.tabText}>{'Details'}</Text>
      </View>
    );
  }
});
