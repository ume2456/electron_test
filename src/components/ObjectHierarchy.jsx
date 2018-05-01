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

const recursiveList = (node, index) => {
  if (isUndef(node)) { return; }
  console.log(index);
  let props = {
    key: node.id,
    primaryText: node.id
  };
  if (!isUndef(node.child)) {
    const children = node.child.map(
      (node, i) => recursiveList(node, i)
    );
    props = {
      ...props,
      nestedItems: children
    };
  }
  return (React.createElement(ListItem, props));
}

const createHierarchy = (list) => {
  if (isUndef(list)) { return; }
  const tree = listToTree(list, 'id', 'parent');
  if (isUndef(tree)) { return; }
  return tree.map(
    (node, i) => recursiveList(node, i)
  );
}

const ObjectHierarchy = (props) => {
  return (
    <List>
      <Subheader>ObjectHierarchy</Subheader>
      <Divider />
      {
        createHierarchy(props.objects)
      }
    </List>
  );
};

const mapStateToProps = state => ({
  objects: state.objects,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectHierarchy);
