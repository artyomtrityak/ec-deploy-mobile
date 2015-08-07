'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 40,
    borderRadius: 2
  },

  text: {
    fontSize: 20,
    fontWeight: '200'
  }
});