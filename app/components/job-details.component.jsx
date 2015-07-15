'use strict';

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native';

import JobDetailsStore from 'stores/job-details.store';
import LoaderComponent from './shared/loader.component';
import JobsActions from 'actions/jobs.actions';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'black',
    margin: 50
  }
});

function Refresh () {
  console.log('Refresh Job Details');
}


export default React.createClass({
  displayName: 'JobDetailsComponent',

  propTypes: {
    jobId: React.PropTypes.string.required
  },

  statics: {
    title: 'Job Details',
    refresh: Refresh
  },

  getInitialState() {
    return {
      job: JobDetailsStore.getState()
    };
  },

  componentDidMount() {
    JobDetailsStore.on('change', this.handleChange);
    JobsActions.getJobDetails(this.props.jobId);
  },

  componentWillUnmount() {
    JobDetailsStore.off('change', this.handleChange);
  },

  handleChange() {
    this.setState({
      job: JobDetailsStore.getState()
    });
  },

  render() {
    if (this.state.job.loading) {
      return (
        <View style={[styles.tabContent, {marginTop: 200}]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <View style={[styles.tabContent, {marginTop: 200}]}>
        <Text>{'Job Details Loaded'}</Text>
      </View>
    );
  }
});
