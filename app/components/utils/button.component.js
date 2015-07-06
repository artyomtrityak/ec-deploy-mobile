'use strict';

import React, {
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoaderStyles from 'components/jss/loader';


export default React.createClass({
  displayName: 'Button',

  propTypes: {
    onPress: React.PropTypes.func.required,
    text: React.PropTypes.string,
    icon: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      loading: false
    };
  },

  render() {
    var icon = this.props.icon ? <Icon name={this.props.icon} size={30} color="#900" /> : null;
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor='#F00'>
        <View style={{}}>
          {icon}

          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});