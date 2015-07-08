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

  handleChange() {
    console.log('handle change', SettingsStore.getState());
    this.setState(SettingsStore.getState());
  },

  onConnect() {
    SettingsActions.login('192.168.7.182', 'admin', 'changeme');

    /*
    this.props.navigator.push({
      title: 'New title',
      component: LoaderComponent
    });
    */
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
      </View>
    );
  }
});
