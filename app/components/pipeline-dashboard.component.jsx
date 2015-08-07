'use strict';

import React, { StyleSheet, Text, View, ListView, Image, TabBarIOS, TouchableHighlight
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './jss/colors-scheme';
import PipelinesActions from 'actions/pipelines.actions';
import PipelinesStore from 'stores/pipeline.store';
import PipelinesComponent from './pipelines.component';
import PipelineRunsComponent from './pipeline-runs.component';
import ApprovalListComponent from './approval-list.component';
import LoaderComponent from './shared/loader.component';
import Styles from './jss/dashboard';

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70
  },
  tabText: {
    color: 'black'
  }
});

 function Refresh (smartLoad=false) {
   if (smartLoad === true && PipelinesStore.getState().pipelines) {
     return;
   }

   PipelinesActions.getPipelineDashboardData();
 }

export default React.createClass({
  displayName: 'PipelineDashboardComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Pipelines',
    refresh: Refresh
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      pipelinesData: PipelinesStore.getState(),
      dataSource: ds.cloneWithRows(this.getRows())
    };
  },

  componentDidMount() {
    PipelinesStore.on('change', this.handleChange);
    PipelinesActions.getPipelineDashboardData();

  },

  componentWillUnmount() {
    PipelinesStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState({
      pipelinesData: PipelinesStore.getState(),
      dataSource: this.state.dataSource.cloneWithRows(this.getRows())
    });
  },

  renderRow(rowData, sectionID, rowID) {
    let badgeCounter = parseInt(rowData.badgeCounter, 10),
      badge = badgeCounter ? (
        <View style={Styles.menuListBadge}>
          <Text style={Styles.menuListBadgeText}>{rowData.badgeCounter}</Text>
        </View>
      ) : null;
    return (
      <TouchableHighlight
        onPress={
          this.goToNextScreen.bind(
            this, rowData.targetComponent, rowData.targetComponentTitle, rowData.onRightButtonPress
          )
        }
        underlayColor={Colors.get('white')}
        >
        <View>
          <View style={Styles.menuListRow}>
            <Image source={rowData.icon} style={Styles.menuListIcon}/>
            <Text style={Styles.menuListText}>{rowData.name}</Text>
            {badge}
          </View>
          <View style={Styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  getRows() {
    return [
      {
        name: 'Pipelines',
        icon: require('image!pipeIcon'),
        targetComponent: PipelinesComponent,
        targetComponentTitle: 'Pipelines list',
        onRightButtonPress: PipelinesComponent.refresh
      },
      {
        name: 'Pipeline Runs',
        icon: require('image!envIcon'),
        targetComponent: PipelineRunsComponent,
        targetComponentTitle: 'Pipeline Runs',
        onRightButtonPress: PipelineRunsComponent.refresh
      },
      {
        name: 'Approvals',
        icon: require('image!pipeIcon'),
        targetComponent: ApprovalListComponent,
        targetComponentTitle: 'Approvals',
        onRightButtonPress: ApprovalListComponent.refresh,
        badgeCounter: PipelinesStore.getState().approvals ?
          PipelinesStore.getState().approvals.length :
          0
      }
    ];

  },

  goToNextScreen(targetComponent, targetComponentTitle, onRightButtonPress) {
    this.props.navigator.push({
      component: targetComponent,
      title: targetComponentTitle,
      rightButtonTitle: 'Refresh',
      onRightButtonPress: onRightButtonPress
    });
  },


	render() {
    if (this.state.pipelinesData.loading) {
      return (
        <View style={[styles.tabContent, {marginTop: 200}]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <View style={Styles.tabContent}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
});