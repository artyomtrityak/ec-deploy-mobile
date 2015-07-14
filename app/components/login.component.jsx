'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

import LoaderComponent from './shared/loader.component';
import ButtonComponent from './shared/button.component';
import SettingsActions from 'actions/settings.actions';
import SettingsStore from 'stores/settings.store';

//Styles
import { MainJSS } from './jss/layouts';
import LoaderJSS from './jss/loader';
import { BoldTextJSS, InputJSS } from './jss/forms';


export default React.createClass({
  displayName: 'LoginComponent',

  statics: {
    title: 'Login'
  },

  getInitialState() {
    return SettingsStore.getState();
  },

  componentDidMount() {
    SettingsStore.on('change', this.handleChange);
  },

  componentWillUnmount() {
    SettingsStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState(SettingsStore.getState());
  },

  onConnect() {
    if (!this.state.server || !this.state.userName || !this.state.password) {
      return;
    }
    //SettingsActions.login('192.168.7.182', 'admin', 'changeme');
    SettingsActions.login(
      this.state.server, this.state.userName, this.state.password
    );
  },

  onChangeText(field, value) {
    SettingsActions.credentialsChange(field, value);
  },

  render() {
    if (this.state.loading) {
      return (
        <View style={ [ MainJSS(), {marginTop: 200} ] }>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <View style={ MainJSS() }>
        <View style={{marginTop: 80}}>
          <Image source={require('image!logo')} />
          <Text style={ BoldTextJSS() }>
            Server
          </Text>
          <TextInput
            style={ InputJSS() }
            placeholder={'Deploy server address'}
            onChangeText={this.onChangeText.bind(this, 'server')}
            value={this.state.server}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={ BoldTextJSS() }>
            Login
          </Text>
          <TextInput
            style={ InputJSS() }
            placeholder={'Your Deploy username'}
            onChangeText={this.onChangeText.bind(this, 'userName')}
            value={this.state.userName}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={ BoldTextJSS() }>
            Password
          </Text>
          <TextInput
            style={ InputJSS() }
            password={true}
            secureTextEntry={true}
            placeholder={'Your Deploy password'}
            onChangeText={this.onChangeText.bind(this, 'password')}
            value={this.state.password}
          />
        </View>

        <View style={{marginTop: 10}}>
          <ButtonComponent onPress={this.onConnect} text={'Connect'} icon={'user'} />
        </View>
      </View>
    );
  }
});
