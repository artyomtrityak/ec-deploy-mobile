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
import TweetButtonComponent from './shared/tweet-button.component';
import Colors from './jss/colors-scheme';

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
    SettingsActions.login('192.168.5.52', 'admin', 'changeme');
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
      <View style={ FormJSS.login.bg }>
        <View style={[ FormJSS.login.formRow, FormJSS.login.imageRow ]}>
          <Image source={require('image!flow_logo')}
                 style={{width: '275', height: '113'}}
                 resizeMode={Image.resizeMode.contain}
          />
        </View>
        <View style={FormJSS.login.formRow }>
          <Text style={FormJSS.login.flowLabel}>Electric Flow Mobile</Text>
        </View>
        <View style={FormJSS.login.line}/>
        <View style={FormJSS.login.formRow }>
          <TextInput
            style={ FormJSS.login.input }
            placeholder={'Deploy server address'}
            onChangeText={this.onChangeText.bind(this, 'server')}
            value={this.state.server}
          />
        </View>
        <View style={FormJSS.login.line}/>
        <View style={FormJSS.login.formRow }>
          <TextInput
            style={ FormJSS.login.input }
            placeholder={'Your Deploy username'}
            onChangeText={this.onChangeText.bind(this, 'userName')}
            value={this.state.userName}
          />
        </View>
        <View style={FormJSS.login.line}/>

        <View style={FormJSS.login.formRow }>
          <TextInput
            style={ FormJSS.login.input }
            password={true}
            secureTextEntry={true}
            placeholder={'Your Deploy password'}
            onChangeText={this.onChangeText.bind(this, 'password')}
            value={this.state.password}
          />
        </View>
        <View style={FormJSS.login.line}/>

        <View style={[FormJSS.login.formRow, FormJSS.login.btnRow]}>
          <ButtonComponent
            onPress={this.onConnect}
            style={ FormJSS.login.btn }
            text={'Log in'}
            color={Colors.get('white')}
            backgroundColor={Colors.get('darkBlue')}
          />

        </View>
      </View>
    );
  }
});
