'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  SwitchIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

var SettingsStyles = StyleSheet.create({
  togglerContainer: {
    justifyContent: 'space-between',
    height: 50,
    width: 250
  },
  userIcons: {
    width: 25
  },
  userText: {
    marginLeft: 5
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
      <View style={ FormJSS.forms.main }>
        <View style={ FormJSS.forms.firstRow }>
          <View style={ FormJSS.forms.flexRow }>
            <View style={ SettingsStyles.userIcons }>
              <Icon name='user' style={{marginLeft: 2}} size={20} color='#00adee' />
            </View>
            <Text style={ SettingsStyles.userText }>
              {this.state.user.userName}
            </Text>
          </View>
          <View style={ FormJSS.forms.flexRow }>
            <View style={ SettingsStyles.userIcons }>
              <Icon name='laptop' size={20} color='#00adee' />
            </View>
            <Text style={ SettingsStyles.userText }>
              {this.state.server}
            </Text>
          </View>
          <ButtonComponent onPress={this.onLogout} text={'Logout'} icon={'sign-out'} />
        </View>

        <View style={ FormJSS.forms.firstRow }>
          <View style={[ FormJSS.forms.flexRow, SettingsStyles.togglerContainer ]}>

            <View>
              <Text style={[ FormJSS.texts.small ]}>
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

        <View style={ FormJSS.forms.row }>
          <View style={[ FormJSS.forms.flexRow, SettingsStyles.togglerContainer ]}>
            <View>
              <Text style={[ FormJSS.texts.small ]}>
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

        <View style={ FormJSS.forms.row }>
          <View style={[ FormJSS.forms.flexRow, SettingsStyles.togglerContainer ]}>
            <View>
              <Text style={[ FormJSS.texts.small ]}>
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
    );
  }
});
