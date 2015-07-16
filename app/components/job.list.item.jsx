'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ArticleView,
  PixelRatio
} from 'react-native';

var styles = StyleSheet.create({
  white: {
    backgroundColor: 'white'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  jobCell: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: 8
  },
  jobTitle: {
    fontSize: 14,
    marginBottom: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  }
});

export default React.createClass({
  displayName: 'JobListItem',

  propTypes: {
    job: React.PropTypes.object,
    onSelectJob: React.PropTypes.func
  },

  handleSelectJob() {
    this.props.onSelectJob(this.props.job);
  },

  renderTitle(job) {
    return (
      <Text style={styles.jobTitle}>
        {job.jobName}
      </Text>
    );
  },

  renderJob() {
    return (
      <View style={styles.textContainer}>
        <TouchableHighlight style={styles.textContainer} onPress={this.handleSelectJob} underlayColor="#cccccc">
          <View style={styles.jobCell}>
            {this.renderTitle(this.props.job)}
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  render() {
    return (
      <View style={styles.white}>
        <View style={styles.itemRow}>
          {this.renderJob()}
        </View>
        <View style={styles.cellBorder} />
      </View>
    );
  }

});
