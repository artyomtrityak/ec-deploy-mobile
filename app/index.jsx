'use strict';

/**
 * Electric Cloud Deploy Mobile App
 */

import React, { AppRegistry, NavigatorIOS } from 'react-native';

//Components
import NavigationComponent from './components/navigation.component';
import LoginComponent from './components/login.component';

//Stores
import SettingsStore from 'stores/settings.store';


var ECDeploy = React.createClass({
  statics: {
    title: 'Electric Deploy',
    description: 'Electric Deploy mobile app'
  },

  getInitialState() {
    return {
      settings: SettingsStore.getState()
    };
  },

  componentDidMount() {
    SettingsStore.on('change', this.handleChange);
  },

  componentWillUnmount() {
    SettingsStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState({
      settings: SettingsStore.getState()
    });
  },

  render: function() {
    if (!this.state.settings.user) {
      return (
        <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
            component: LoginComponent,
            title: 'Login'
          }}
        />
      );
    }
    return (
      <NavigationComponent />
    );
  }
});

AppRegistry.registerComponent('ecdeploy2', () => ECDeploy);
