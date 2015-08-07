'use strict';

import React, {
  View,
  ListView,
  TouchableHighlight,
  Text
  } from 'react-native';

import PipelinesActions from 'actions/pipelines.actions';
import PipelinesStore from 'stores/pipeline.store';
import NotLoggenInComponent from './shared/not-logged-in.component';
import LoaderComponent from './shared/loader.component';
import PipelineRunsComponent from './pipeline-runs.component';
import Swipeout from 'react-native-swipeout';
import Styles from './jss/jobs-list';
import Colors from './jss/colors-scheme';


function Refresh (smartLoad=false) {
  if (smartLoad === true && PipelinesStore.getState().pipelines) {
    return;
  }
  PipelinesActions.getPipelines();
}

export default React.createClass({
  displayName: 'PipelinesComponent',

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
      dataSource: ds.cloneWithRows(PipelinesStore.getState().pipelines),
      pipelines: PipelinesStore.getState()
    };
  },

  componentDidMount() {
    PipelinesStore.on('change', this.handleChange);
    PipelinesStore.on('redirect', this.redirectToRuns);
    PipelinesActions.getPipelines();
  },

  componentWillUnmount() {
    PipelinesStore.off('change', this.handleChange);
    PipelinesStore.off('redirect', this.redirectToRuns);
  },

  handleChange() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(PipelinesStore.getState().pipelines),
      pipelines: PipelinesStore.getState()
    });
  },

  redirectToRuns() {
    this.props.navigator.push({
      component: PipelineRunsComponent,
      title: 'Pipeline Runs'
    });
  },

  renderRow(rowData, sectionID, rowID) {
    let pipelineName;

    if(rowData.pipeline) {
      pipelineName = rowData.pipeline.pipelineName;
    }
    return (
      <Swipeout backgroundColor="#ffffff" right={[{text: 'Run', onPress: this.runPipeline.bind(this, pipelineName)}]}>
        <TouchableHighlight
          underlayColor={Colors.get('white')}
          >
          <View>
            <View style={Styles.row}>
              <Text style={{fontSize: 16}}>{++rowID + '. '}</Text>
              <Text style={Styles.text}>{pipelineName}</Text>
            </View>
            <View style={Styles.separator} />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  },

  runPipeline(pipelineName) {
    PipelinesActions.runPipeline(pipelineName);
  },

  render() {
    if (this.state.pipelines.loading) {
      return (
        <View style={Styles.loader}>
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
