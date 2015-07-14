'use strict';

import React, {
  ActivityIndicatorIOS,
  StyleSheet,
  View
} from 'react-native';

import LoaderStyles from 'components/jss/loader';


export default React.createClass({
  displayName: 'LoaderComponent',

  propTypes: {
    loading: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      loading: false
    };
  },

  render() {
    return (
      <ActivityIndicatorIOS
        animating={this.props.loading}
        style={[LoaderStyles.centering, {height: 130}]}
        size="large"
      />
    );
  }
});