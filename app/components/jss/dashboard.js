'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  tabContent: {
    marginTop: 64,
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 456
  },
  menuListIcon: {
    marginRight: 10
  },
  menuListRow: {
    flexDirection: 'row',
    padding: 10
  },
  menuListText: {
    flex: 1,
    fontSize: 25
  },
  navListContainer: {
    alignSelf: 'stretch',
    flex: 4
  },
  notificationContainer: {
    alignSelf: 'stretch',
    flex: 6
  },
  notificationIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  notificationRow: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  notificationText: {
    fontSize: 15,
    flex: 9
  },
  separator: {
    height: 1,
    backgroundColor: Colors.get('gray')
  }
});