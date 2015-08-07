'use strict';

import { StyleSheet, PixelRatio } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  tabContent: {
    marginTop: 64,
    marginBottom: 45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1
  },
<<<<<<< HEAD
=======
  menuListBadge: {
    padding: 5,
    backgroundColor: Colors.get('lightBlue'),
    borderRadius: 15,
    width: 30,
    height: 30
  },
  menuListBadgeText: {
    textAlign: 'center',
    color: Colors.get('white')
    // color: Colors.get('white'),
    // backgroundColor: Colors.get('lightBlue'),
    // borderRadius: 10,
    // width: 30,
    // height: 30
  },
>>>>>>> master
  menuListIcon: {
    width: 80
  },
  menuListRow: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10
  },
  menuRowIcon: {
    width: 20,
    marginLeft: 10
  },
  menuListText: {
    flex: 1,
    fontSize: 24
  },
  menuListContainer: {
<<<<<<< HEAD
    flex: 4
  },
  notificationContainer: {
    flex: 6
=======
    flex: 1,
    flexDirection: 'column'
  },
  menuListItem: {
    flex: 3,
    flexDirection: 'row'
  },
  notificationContainer: {
    height: 190
>>>>>>> master
  },
  notificationIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  notificationRow: {
    backgroundColor: '#f6f6f8',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  notificationText: {
    fontSize: 14,
    flex: 9
  },
  separator: {
<<<<<<< HEAD
    height: 1,
    backgroundColor: Colors.get('gray')
  },
  toggleButton: {
    flex: 1
=======
    height: 1 / PixelRatio.get(),
    marginLeft: 80,
    backgroundColor: '#c8c7cc'
  },
  notificationSeparator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#c8c7cc'
  },
  notificationsSeparator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#c8c7cc',
    marginBottom: 10
  },
  notigicationLabel: {
    backgroundColor: '#fd9527',
    fontSize: 28,
    padding: 10
>>>>>>> master
  }
});