import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.get('lightGray'),
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1
  },
  firstRow: {
    marginTop: 105
  },
  field: {
    backgroundColor: Colors.get('white'),
    paddingLeft: 15
  },
  btnField: {
    backgroundColor: Colors.get('white')
  },
  fieldInner: {
    height: 40
  },
  gutter: {
    height: 40
  },
  togglerContainer: {
    justifyContent: 'space-between',
    height: 50,
    width: 290,
    alignSelf: 'center'
  },

  userText: {
    fontSize: 16,
    marginLeft: 5
  },
  fieldTxt: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 15
  },
  label: {
    width: 50,
    color: Colors.get('darkGray')
  },
  btn: {
    height: 40,
    width: 280,
    alignSelf: 'center'
  },
  togglerTxt: {
    fontSize: 16
  }
});