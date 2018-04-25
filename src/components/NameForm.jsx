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
  props.actions.submitName(text);
};

const NameForm = (props) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, props)}
    >
      <TextField
        floatingLabelText="Name"
        style={{ width: "100px" }}
        ref={input => this.input = input}
      />
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(NameForm);
