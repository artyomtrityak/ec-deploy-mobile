'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 30,
    borderRadius: 5
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  }
});