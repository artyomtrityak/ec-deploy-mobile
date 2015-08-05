'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TabBarIOS,
  TouchableHighlight
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './jss/colors-scheme';
import PipelinesActions from 'actions/pipelines.actions';
import PipelinesStore from 'stores/pipeline.store';
//import NotLoggedInComponent from './shared/not-logged-in.component';
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

// function Refresh (smartLoad=false) {
//   console.log('refresh', PipelinesStore.getState());
//   if (!PipelinesStore.getState().pipelines) {
//     return;
//   }
//   if (smartLoad === true && PipelinesStore.getState().pipelines) {
//     return;
//   }
//   PipelinesActions.getPipelines();
// }
var listItems = [
  {
    name: 'Pipelines',
    icon: require('image!pipeIcon'),
    //targetComponent: JobsComponent,
    targetComponentTitle: 'Pipelines list'
  },
  {
    name: 'Pipeline Runs',
    icon: require('image!envIcon'),
    //targetComponent: JobsComponent,
    targetComponentTitle: 'Pipeline Runs'
  },
  {
    name: 'Approvals',
    icon: require('image!pipeIcon'),
    //targetComponent: PipelineDashboardComponent,
    targetComponentTitle: 'Approvals'
  }
];


export default React.createClass({
  displayName: 'JobsComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Pipelines'
    // refresh: Refresh
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
    //PipelinesActions.getPipelines();
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
    //var pipelinesNumber = PipelinesStore.getState().items ?
    //  PipelinesStore.getState().items.length : 0;
    return (
      <TouchableHighlight
        onPress={
          this.goToNextScreen.bind(this, rowData.targetComponent, rowData.targetComponentTitle)
        }
        underlayColor={Colors.get('white')}
        >
        <View>
          <View style={Styles.row}>
            <Image source={rowData.icon} style={Styles.icon}/>
            <Text style={Styles.text}>{rowData.name}</Text>
            <View style={Styles.itemNumber}>
              <Text>{rowData.itemNumber}</Text>
            </View>
          </View>
          <View style={Styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  getRows() {
    console.log('getRows', PipelinesStore.getState());
    return [
      {
        name: 'Pipelines',
        icon: require('image!pipeIcon'),
        //targetComponent: JobsComponent,
        targetComponentTitle: 'Pipelines list',
        itemNumber: PipelinesStore.getState().pipelines ? PipelinesStore.getState().pipelines.length : 0
      },
      {
        name: 'Pipeline Runs',
        icon: require('image!envIcon'),
        //targetComponent: JobsComponent,
        targetComponentTitle: 'Pipeline Runs',
        itemNumber: PipelinesStore.getState().pipelineRuns ? PipelinesStore.getState().pipelineRuns.length : 0
      },
      {
        name: 'Approvals',
        icon: require('image!pipeIcon'),
        //targetComponent: PipelineDashboardComponent,
        targetComponentTitle: 'Approvals',
        itemNumber: PipelinesStore.getState().approvals ? PipelinesStore.getState().approvals.length : 0
      }
    ];

  },

  goToNextScreen(targetComponent, targetComponentTitle) {
    this.props.navigator.push({
      component: targetComponent,
      title: targetComponentTitle
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

    //console.log(1234, this.state.pipelines.items);
    //var pipelinesNumber = this.state.pipelines.items ? this.state.pipelines.items.length : 0;


    // if (!this.state.settings.user) {
    //   return (<NotLoggenInComponent />);  
    // }

    //console.log('pipelines', this.state);
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