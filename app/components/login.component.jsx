'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

//Components
import LoaderComponent from './shared/loader.component';
import ButtonComponent from './shared/button.component';

//Actions
import SettingsActions from 'actions/settings.actions';

//Stores
import SettingsStore from 'stores/settings.store';

//Styles
import LoaderJSS from './jss/loader';
import FormJSS from './jss/forms';


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
    //if (!this.state.server || !this.state.userName || !this.state.password) {
    //  return;
    //}
    SettingsActions.login('192.168.7.182', 'admin', 'changeme');
    //SettingsActions.login(
    //  this.state.server, this.state.userName, this.state.password
    //);
  },

  onChangeText(field, value) {
    SettingsActions.credentialsChange(field, value);
  },

  render() {
    if (this.state.loading) {
      return (
        <View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <View style={ FormJSS.forms.main }>
        <View style={ FormJSS.forms.firstRow }>
          <Image source={require('image!logo')} />
          <Text style={[ FormJSS.texts.main, FormJSS.texts.bold ]}>
            Server
          </Text>
          <TextInput
            style={ FormJSS.inputs.main }
            placeholder={'Deploy server address'}
            onChangeText={this.onChangeText.bind(this, 'server')}
            value={this.state.server}
          />
        </View>

        <View style={ FormJSS.forms.row }>
          <Text style={[ FormJSS.texts.main, FormJSS.texts.bold ]}>
            Login
          </Text>
          <TextInput
            style={ FormJSS.inputs.main }
            placeholder={'Your Deploy username'}
            onChangeText={this.onChangeText.bind(this, 'userName')}
            value={this.state.userName}
          />
        </View>

        <View style={ FormJSS.forms.row }>
          <Text style={[ FormJSS.texts.main, FormJSS.texts.bold ]}>
            Password
          </Text>
          <TextInput
            style={ FormJSS.inputs.main }
            password={true}
            secureTextEntry={true}
            placeholder={'Your Deploy password'}
            onChangeText={this.onChangeText.bind(this, 'password')}
            value={this.state.password}
          />
        </View>

        <View style={ FormJSS.forms.row }>
          <ButtonComponent onPress={this.onConnect} text={'Connect'} icon={'sign-in'} />
        </View>
      </View>
    );
  }
});
