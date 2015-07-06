'use strict';

/**
 * Electric Cloud Deploy Mobile App
 */

import React, { AppRegistry } from 'react-native';
import NavigationComponent from './components/navigation.component';


var ECDeploy = React.createClass({
  statics: {
    title: 'Electric Deploy',
    description: 'Electric Deploy mobile app'
  },

  render: function() {
    return (
      <NavigationComponent />
    );
  }
});

AppRegistry.registerComponent('ecdeploy2', () => ECDeploy);
