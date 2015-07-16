'use strict';

import { StyleSheet, PixelRatio } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: Colors.get('white')
  },
  row: {
    flexDirection: 'row',
    padding: 10
  },
  icon: {
    marginRight: 10
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: Colors.get('separatorColor')
  },
  text: {
    flex: 1,
    fontSize: 16
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200
  }
});