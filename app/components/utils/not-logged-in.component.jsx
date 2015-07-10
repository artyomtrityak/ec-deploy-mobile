'use strict';

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native';


export default React.createClass({
  displayName: 'NotLoggenInComponent',

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>You should log in</Text>
      </View>
    );
  }
});