'use strict';

import React, {StyleSheet, View, Text} from 'react-native';
import Styles from 'components/jss/progress-bar';


export default React.createClass({
  displayName: 'ProgressBar',

  propTypes: {
    percentage: React.PropTypes.string,
    status: React.PropTypes.string,
    height: React.PropTypes.string
  },

  defineProps() {
    return {
      height: 5
    };
  },

  render() {
    var
      color = this.props.status === 'error' ? Styles.error : Styles.success,
      complete = parseInt(this.props.percentage, 10),
      incomplete = Math.abs(complete - 100);

    return (
      <View style={[Styles.container, color, {height: this.props.height}]}>
        <View style={{flex: complete}} />
        <View style={[Styles.incomplete, {flex: incomplete}]} />
      </View>
    );
  }
});