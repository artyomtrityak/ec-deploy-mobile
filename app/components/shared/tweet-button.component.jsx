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
      'text': 'Global democratized marketplace for art',
      'link': 'https://artboost.com/',
      'imagelink': 'https://artboost.com/apple-touch-icon-144x144.png'
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