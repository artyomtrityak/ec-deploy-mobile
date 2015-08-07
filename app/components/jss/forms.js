'use strict';

import { StyleSheet, PixelRatio } from 'react-native';
import Colors from './colors-scheme';

var TextsStyles = StyleSheet.create({
  main: {
    fontSize: 16
  },
  small: {
    fontSize: 12
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
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: 250
  }
});

var LoginStyles = StyleSheet.create({
  bg: {
    // backgroundColor: '#BAE3F7'
  },
  imageRow: {
    marginTop: 50,
    marginBottom: 20
  },
  flowLabel: {
    fontSize: 36,
    fontWeight: '200',
    marginBottom: 40
  },
  formRow: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    textAlign: 'center',
    fontSize: 18,
    height: 56,
    flex: 1
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: 1 / PixelRatio.get()
  },
  btnRow: {
    marginTop: 25
  }

});

export default {
  texts: TextsStyles,
  inputs: InputsStyles,
  forms: FormsStyles,
  login: LoginStyles
};