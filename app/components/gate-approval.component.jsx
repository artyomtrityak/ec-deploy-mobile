'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Components
import LoaderComponent from './shared/loader.component';
import ButtonComponent from './shared/button.component';
import TweetButtonComponent from './shared/tweet-button.component';

//Actions
import PipelinesActions from 'actions/pipelines.actions';

//Stores
import GateApprovalStore from 'stores/gate-approvals.store';
//TODO: add check from SettingsStore that current user is in approvers

//Styles
import LoaderJSS from './jss/loader';
import FormJSS from './jss/forms';
import SettingsJSS from './jss/settings';
import Colors from './jss/colors-scheme';
import Styles from './jss/gate-approval';


export default React.createClass({
  displayName: 'GateApprovalComponent',

  propTypes: {
    navigator: React.PropTypes.object,
    flowRuntimeId: React.PropTypes.string.isRequired
  },

  statics: {
    title: 'Gate Approval'
  },

  getInitialState() {
    return GateApprovalStore.getState();
  },

  componentDidMount() {
    GateApprovalStore.on('change', this.handleChange);
    PipelinesActions.getRuntimeDetails(this.props.flowRuntimeId);
  },

  componentWillUnmount() {
    GateApprovalStore.off('change', this.handleChange);
  },

  handleChange() {
    console.log('handle change', GateApprovalStore.getState());
    this.setState(GateApprovalStore.getState());
  },

  onChangeComment(text) {
    PipelinesActions.commentChange(text);
  },

  onApprove() {
    AlertIOS.alert(
      'Approve confirmation',
      'Are you sure you want to approve task ' + this.state.taskName,
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => {
          PipelinesActions.approveOrRejectAction(
            this.props.flowRuntimeId,
            this.state.stageName,
            this.state.taskName,
            this.state.gateType,
            'approve',
            this.state.comment
          );
        }}
      ]
    );
  },

  onReject() {
    AlertIOS.alert(
      'Approve confirmation',
      'Are you sure you want to reject ' + this.state.taskName,
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => {
          PipelinesActions.approveOrRejectAction(
            this.props.flowRuntimeId,
            this.state.stageName,
            this.state.taskName,
            this.state.gateType,
            'reject',
            this.state.comment
          );
        }}
      ]
    );
  },

  renderButtons() {
    return (
      <View style={ Styles.buttonBlock }>
        <View style={null}>
          <ButtonComponent
              onPress={this.onApprove}
              text={'Approve'}
              icon={'thumbs-up'}
              color={Colors.get('white')}
              backgroundColor='#7AC64A'
              btnStyle={Styles.btn}
            />
        </View>
        <View style={null}>
            <ButtonComponent
              onPress={this.onReject}
              text={'Reject'}
              icon={'thumbs-down'}
              color={Colors.get('white')}
              backgroundColor={Colors.get('red')}
              btnStyle={Styles.btn}
            />
        </View>
      </View>
    );
  },

  renderDone() {
    return (
        <View>
          <View style={ [Styles.row, {marginBottom: 20}] }>
            <Text style={Styles.parameterType}>Task status </Text>
            <Text style={Styles.parameterName}>{this.state.solution}</Text>
          </View>
          <View style={ Styles.buttonBlock }>
            <TweetButtonComponent
              text={'I\'ve just ' + this.state.solution + 'ed pipeline ' + this.state.pipelineName +
              ' stage ' + this.state.stageName + ' task ' + this.state.taskName}
            />
          </View>
        </View>
      );
  },

  render() {
    console.log('gate', this.state);
    if (this.state.loading) {
      return (
        <View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    if (!this.state.taskName) {
      return (
        <View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
          <Text>Nothing to approve</Text>
        </View>
      );
    }

    return (
      <View style={ Styles.main }>
        <View style={ [Styles.row, Styles.firstRow]}>
          <Text style={Styles.parameterType}>Pipeline name </Text>
          <Text numberOfLines={1} style={Styles.parameterName}>{this.state.pipelineName}</Text>
        </View>
        <View style={ Styles.row }>
          <Text style={Styles.parameterType}>Stage name </Text>
          <Text numberOfLines={1} style={Styles.parameterName}>{this.state.stageName}</Text>
        </View>
        <View style={ Styles.row }>
          <Text style={Styles.parameterType}>Task name </Text>
          <Text numberOfLines={1} style={Styles.parameterName}>{this.state.taskName}</Text>
        </View>
        <View style={ [Styles.row, Styles.separator] } />
        <View style={ Styles.row }>
          <Text style={Styles.parameterType}>Approvers </Text>
          <Text numberOfLines={1} style={Styles.parameterName}>{this.state.approvers}</Text>
        </View>
        <View style={ Styles.row }>
          <Text style={Styles.parameterType}>Gate Type </Text>
          <Text numberOfLines={1} style={Styles.parameterName}>{this.state.gateType}</Text>
        </View>
        <View style={[Styles.row, {backgroundColor: 'rgba(0, 0, 0, 0.1)', marginRight: '10', marginLeft: '10'}]}>
          <Text style={{lineHeight: 18}}>Optional comment </Text>
        </View>
        <View style={ [Styles.row, {height: 100, marginTop: 0}]}>
          <TextInput
              style={Styles.commentArea}
              placeholder={'Start typing here...'}
              onChangeText={this.onChangeComment}
              value={this.state.commentChange}
              multiline={true}
            />
        </View>

        {this.state.solution ? this.renderDone() : this.renderButtons()}
        
      </View>
    );
  }
});
