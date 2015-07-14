'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gray: {
    backgroundColor: Colors.get('gray')
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  position: {
    marginTop: 200
  }
});