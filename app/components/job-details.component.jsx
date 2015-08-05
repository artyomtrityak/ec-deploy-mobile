'use strict';

import React, {ListView, View, Image, Text} from 'react-native';
import JobDetailsStore from 'stores/job-details.store';
import LoaderComponent from './shared/loader.component';
import JobsActions from 'actions/jobs.actions';
import Styles from './jss/job-details';


function Refresh (jobId) {
  JobsActions.getJobDetails(jobId);
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return ({
      job: JobDetailsStore.getState(),
      dataSource: ds.cloneWithRows([])
    });
  },

  componentDidMount() {
    JobDetailsStore.on('change', this.handleChange);
    JobsActions.getJobDetails(this.props.jobId);
  },

  componentWillUnmount() {
    JobDetailsStore.off('change', this.handleChange);
  },

  handleChange() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        job = JobDetailsStore.getState(),
        dataSource = ds.cloneWithRows(job.job && job.job.jobStep ? job.job.jobStep : []);

    this.setState({job, dataSource});
  },

  renderHeader() {
    if (!this.state.job.job) {
      return null;
    }

    var image;

    switch (this.state.job.job.combinedStatus.status) {
      case 'running_error':
        image = require('image!running_error');
        break;
      case 'running_success':
        image = require('image!running_success');
        break;
      case 'completed_error':
        image = require('image!completed_error');
        break;
      case 'completed_success': 
        image = require('image!completed_success');
        break;
      case 'completed_warning':
        image = require('image!completed_warning');
        break;
      default:
        image = require('image!completed_warning');
    }
    
    return (
      <View style={Styles.header}>
        <View style={Styles.headerTitle}>
          <Text style={Styles.headerTitleText} numberOfLines={2}>{this.state.job.job.jobName}</Text>
        </View>

        <View style={Styles.headerSeparator}>{}</View>

        <View style={Styles.headerStatus}>
          <Image style={Styles.headerStatusImage} source={image} />
          <View style={Styles.headerStatusTimeWrapper}>
            <View style={Styles.headerStatusTime}>
              <Text style={Styles.headerStatusTimeTitle}>Start Time:</Text>
              <Text style={Styles.headerStatusTimeText}>{this.state.job.job.start}</Text>
            </View>
            <View style={Styles.headerStatusTime}>
              <Text style={Styles.headerStatusTimeTitle}>Elapsed Time:</Text>
              <Text style={Styles.headerStatusTimeText}>{this.state.job.job.elapsedTime}</Text>
            </View>
          </View>
        </View>

        <View style={Styles.headerSeparator}>{}</View>

        <View style={Styles.headerInformation}>
          <View style={Styles.headerInformationRow}>
            <Text style={Styles.headerStatusTimeTitle}>Project:</Text>
            <Text style={Styles.headerStatusTimeText}>{this.state.job.job.projectName}</Text>
          </View>
          <View style={Styles.headerInformationRow}>
            <Text style={Styles.headerStatusTimeTitle}>Procedure:</Text>
            <Text style={Styles.headerStatusTimeText}>{'External'}</Text>
          </View>
          <View style={Styles.headerInformationRow}>
            <Text style={Styles.headerStatusTimeTitle}>Launched by:</Text>
            <Text style={Styles.headerStatusTimeText}>{this.state.job.job.launchedByUser}</Text></View>
          <View style={Styles.headerInformationRow}>
            <Text style={Styles.headerStatusTimeTitle}>Priority:</Text>
            <Text style={Styles.headerStatusTimeText}>{this.state.job.job.priority}</Text>
          </View>
        </View>

      </View>
    );
  },

  renderRow(data) {
    return (
      <View style={Styles.list}>
        <View style={Styles.row}>
          <Text style={Styles.text}>{data.stepName}</Text>
          <Text style={Styles.text}>{' : '}</Text>
          <Text style={Styles.text}>{data.status}</Text>
        </View>
      </View>
    );
  },

  render() {
    if (this.state.job.loading) {
      return (
        <View style={Styles.loader}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <ListView
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        pageSize={50} />
    );
  }
});
