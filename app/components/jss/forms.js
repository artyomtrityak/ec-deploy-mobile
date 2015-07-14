'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

var TextStyle = StyleSheet.create({
  main: {
    fontSize: 16  
  },
  bold: {
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: Colors.get('gray'),
    borderWidth: 1,
    width: 250
  },
  row: {
    marginTop: 10
  },

  firstRow: {
    marginTop: 80
  }
});

export function TextJSS () {
  return TextStyle.main;
}

export function BoldTextJSS () {
  return [TextJSS(), TextStyle.bold];
}

export function InputJSS () {
  return TextStyle.input;
}

export function RowJSS () {
  return TextStyle.row;
}

export function FirstRowJSS () {
  return TextStyle.firstRow;
}