'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

var LayoutStyle = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.get('white')
  }
});

export function MainJSS () {
  return LayoutStyle.main;
}