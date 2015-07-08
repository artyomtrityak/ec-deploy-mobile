'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import LoaderComponent from './utils/loader.component';
import ButtonComponent from './utils/button.component';
import SettingsActions from 'actions/settings.actions';

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
  displayName: 'SettingsComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Settings'
  },

  getInitialState() {
    return {
    };
  },

  onConnect() {
    console.log('connect1234555');
    SettingsActions.login('admin', 'changeme');

    this.props.navigator.push({
      title: 'New title',
      component: LoaderComponent
    });
  },

  render() {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <View style={{margin: 80}}>
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

        <View style={{}}>
          <ButtonComponent onPress={this.onConnect} text={'Connect'} icon={'user'} />
        </View>

        <LoaderComponent loading={true} />
      </View>
    );
  }
});
