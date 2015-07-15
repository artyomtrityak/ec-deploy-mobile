'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  tabContent: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 10
  },
  icon: {
    marginRight: 10
  },
  separator: {
    height: 1,
    backgroundColor: Colors.get('gray')
  },
  text: {
    flex: 1,
    fontSize: 25
  }
});