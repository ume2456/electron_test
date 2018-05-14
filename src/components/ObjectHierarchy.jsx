import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Divider,
  Subheader,
  List,
  ListItem
} from 'material-ui';

import * as actions from '../actions/index';
import { listToTree, isUndef } from '../utility';

const recursiveList = (node, index, selectInstance) => {
  if (isUndef(node)) { return; }
  let props = {
    key: node.id,
    primaryText: node.name,
    onClick: () => {
      selectInstance(node.id)
    }
  };
  if (!isUndef(node.child)) {
    const children = node.child.map(
      (node, i) => recursiveList(node, i, selectInstance)
    );
    props = {
      ...props,
      nestedItems: children
    };
  }
  return (React.createElement(ListItem, props));
}

const createHierarchy = (list, selectInstance) => {
  if (isUndef(list)) { return; }
  const tree = listToTree(list, 'id', 'parent');
  if (isUndef(tree)) { return; }
  return tree.map(
    (node, i) => recursiveList(node, i, selectInstance)
  );
}

const ObjectHierarchy = (props) => {
  return (
    <List>
      <Subheader>ObjectHierarchy</Subheader>
      <Divider />
      {
        createHierarchy(props.object_list, props.actions.selectInstance)
      }
    </List>
  );
};

const mapStateToProps = state => ({
  object_list: state.object_list,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectHierarchy);
