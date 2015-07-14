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
    var icon = this.props.icon ? <Icon name={this.props.icon} size={20} color="white" /> : null;
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor='#00adee'>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#567b99', width: 250, height: 30, borderRadius: 5}}>
          {icon}

          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});