'use strict';

import React, {
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { KDSocialShare } from 'NativeModules';

import ButtonComponent from './button.component';
import Colors from '../jss/colors-scheme';


export default React.createClass({
  displayName: 'TwitterButton',

  propTypes: {
    onPress: React.PropTypes.func
  },

  onTweet() {
    KDSocialShare.tweet({
      'text': 'I have just deployed my app using ElectricFlow',
      'link': 'http://electric-cloud.com/products/electricflow/deploy-automation/',
      'imagelink': 'https://pbs.twimg.com/profile_images/479063120401297408/o_yW_qQ5_400x400.jpeg'
      }, (results) => {
        console.log(results);
      }
    );
  },

  render() {
    return (
      <ButtonComponent
        onPress={this.onTweet}
        text={'Share on Twitter'}
        icon={'twitter'}
        color={Colors.get('white')}
        backgroundColor={Colors.get('lightBlue')}
      />
    );
  }
});