'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  SwitchIOS
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
import SettingsJSS from './jss/settings';
import Colors from './jss/colors-scheme';


export default React.createClass({
  displayName: 'SettingsComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Settings'
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

  onLogout() {
    SettingsActions.logout();
  },

  onAutoSyncChange(newVal) {
    SettingsActions.changeAutoSync(newVal);
  },

  onRememberMeChange(newVal) {
    SettingsActions.changeRememberMe(newVal);
  },

  onJobsNotificationsChange(newVal) {
    SettingsActions.changeJobsNotifications(newVal);
  },

  handleChange() {
    console.log('handle change', SettingsStore.getState());
    this.setState(SettingsStore.getState());
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
      <View style={[FormJSS.forms.main, SettingsJSS.mainContainer ]}>

        <View style={[FormJSS.login.line, SettingsJSS.firstRow]}/>
        <View style={[SettingsJSS.field]}>
          <View style={[SettingsJSS.fieldInner, SettingsJSS.fieldTxt ]}>
            <Text style={[SettingsJSS.userText, SettingsJSS.label]}>
              User
            </Text>
            <Text style={ SettingsJSS.userText }>
              {this.state.user.userName}
            </Text>
          </View>
          <View style={FormJSS.login.line}/>
          <View style={[SettingsJSS.fieldInner, SettingsJSS.fieldTxt ]}>
            <Text style={[SettingsJSS.userText, SettingsJSS.label]}>
            Server
            </Text>
            <Text style={ SettingsJSS.userText }>
              {this.state.server}
            </Text>
          </View>
        </View>

        <View style={FormJSS.login.line}/>
        <View style={SettingsJSS.gutter} />

        <ButtonComponent
          onPress={this.onLogout}
          text={'Logout'}
          color={Colors.get('red')}
          backgroundColor={Colors.get('white')}
          btnWrapperStyle={SettingsJSS.btn}
          btnStyle={SettingsJSS.btn}
        />


        <View style={SettingsJSS.gutter} />
        <View style={FormJSS.login.line}/>

        <View style={[SettingsJSS.field]}>
          <View style={ FormJSS.forms.row }>
            <View style={[SettingsJSS.togglerContainer ]}>

              <View style={SettingsJSS.togglerTxtWrapper}>
                <Text style={SettingsJSS.togglerTxt}>
                Remember my credentials
                </Text>
              </View>
              <View>
                <SwitchIOS
                  onValueChange={this.onRememberMeChange}
                  value={this.state.rememberMe}
                />
              </View>
            </View>
          </View>

          <View style={FormJSS.login.line}/>

          <View style={ FormJSS.forms.row }>
            <View style={[SettingsJSS.togglerContainer ]}>
              <View style={SettingsJSS.togglerTxtWrapper}>
                <Text style={SettingsJSS.togglerTxt}>
                Auto sync every 30 seconds
                </Text>
              </View>
              <View>
                <SwitchIOS
                  onValueChange={this.onAutoSyncChange}
                  value={this.state.autoSync}
                />
              </View>
            </View>
          </View>

          <View style={FormJSS.login.line}/>

          <View style={ FormJSS.forms.row }>
            <View style={[SettingsJSS.togglerContainer ]}>
              <View style={SettingsJSS.togglerTxtWrapper}>
                <Text style={SettingsJSS.togglerTxt}>
                Jobs Notifications
                </Text>
              </View>
              <View>
                <SwitchIOS
                  onValueChange={this.onJobsNotificationsChange}
                  value={this.state.jobsNotifications}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={FormJSS.login.line}/>

      </View>
    );
  }
});