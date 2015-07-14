'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import LoaderComponent from './shared/loader.component';
import ButtonComponent from './shared/button.component';
import SettingsActions from 'actions/settings.actions';
import SettingsStore from 'stores/settings.store';

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

  handleChange() {
    console.log('handle change', SettingsStore.getState());
    this.setState(SettingsStore.getState());
  },

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.tabContent, {marginTop: 200}]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <View style={{marginTop: 80}}>
          <ButtonComponent onPress={this.onLogout} text={'Logout'} icon={'user'} />
        </View>
      </View>
    );
  }
});
