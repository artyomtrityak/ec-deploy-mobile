'use strict';

import React, {
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ButtonsStyles from 'components/jss/buttons';


export default React.createClass({
  displayName: 'Button',

  propTypes: {
    onPress: React.PropTypes.func.required,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    style: React.PropTypes.obj
  },

  render() {
    var icon = this.props.icon ? <Icon name={this.props.icon} size={20} color="white" /> : null;
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={this.props.color}
        style={this.props.style}
      >
        <View style={[ ButtonsStyles.buttonWrapper, {
          backgroundColor: this.props.backgroundColor
        } ]}>
          
          {icon}

          <Text style={[ ButtonsStyles.text, {color: this.props.color} ]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});