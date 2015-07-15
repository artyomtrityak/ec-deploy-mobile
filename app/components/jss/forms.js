'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

var TextsStyles = StyleSheet.create({
  main: {
    fontSize: 16
  },
  bold: {
    fontWeight: 'bold'
  }
});

var InputsStyles = StyleSheet.create({
  main: {
    height: 40,
    borderColor: Colors.get('gray'),
    borderWidth: 1,
    width: 250
  }
});

var FormsStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.get('white')
  },
  row: {
    marginTop: 10
  },
  firstRow: {
    marginTop: 80
  }
});

export default {
  texts: TextsStyles,
  inputs: InputsStyles,
  forms: FormsStyles
};