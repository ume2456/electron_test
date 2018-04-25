import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from 'material-ui';

import * as actions from '../actions/index';

const handleSubmit = (e, props) => {
  e.preventDefault();
  const node = this.input.getInputNode();
  const text = node.value.trim();
  if (!text) {
    return;
  }
  props.actions.submitMessage(text);
  node.value = '';
  props.client.sendMessage({'name': props.name, 'text': text});
};

const MessageForm = (props) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, props)}
    >
      <TextField
        floatingLabelText="Message"
        ref={input => this.input = input}
      />
    </form>
  );
};

const mapStateToProps = state => ({
  name: state.name,
  client: state.client,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
