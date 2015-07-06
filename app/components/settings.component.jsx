'use strict';

var Icon = require('react-native-vector-icons/FontAwesome');

var ROCK = (<Icon name="rocket" size={30} color="#900" />);

import React, {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import LoaderComponent from './loader.component';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  tabText: {
    color: 'black',
    margin: 50
  }
});

export default React.createClass({
  statics: {
    title: '<ListView> - Simple',
    description: 'Performant, scrollable list of data.'
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <View style={{margin: 50}}>
          {ROCK}

          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Server
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 250}}
            placeholder={'Deploy server address'}
            onChangeText={(text) => this.setState({input: text})}
          />
        </View>

        <View style={{}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Login
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 250}}
            placeholder={'Your Deploy username'}
            onChangeText={(text) => this.setState({input: text})}
          />
        </View>

        <View style={{}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Password
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 250}}
            password={true}
            secureTextEntry={true}
            placeholder={'Your Deploy password'}
          />
        </View>

        <LoaderComponent loading={true} />
      </View>
    );
  }
});
