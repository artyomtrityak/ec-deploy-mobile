'use strict';

import React, {
  ActivityIndicatorIOS,
  StyleSheet,
  View
} from 'react-native';

import LoaderStyles from './jss/loader';


export default React.createClass({
  propTypes: {
    loading: React.PropTypes.bool
  },

  statics: {
    title: 'Loader'
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
        style={[LoaderStyles.centering, LoaderStyles.gray, {height: 100}]}
        size="large"
      />
    );
  }
});