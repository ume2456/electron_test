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

const recursiveList = (node, index, types, selectInstance) => {
  if (isUndef(node)) { return; }
  let node_type = node.id;
  if (!isUndef(node.type_id))
  if (!isUndef(types[node.type_id]))
  {
    node_type = types[node.type_id].type;
  }
  let props = {
    key: node.id,
    primaryText: node_type,
    onClick: () => {
      selectInstance(node.id)
    }
  };
  if (!isUndef(node.child)) {
    const children = node.child.map(
      (node, i) => recursiveList(node, i, types, selectInstance)
    );
    props = {
      ...props,
      nestedItems: children
    };
  }
  return (React.createElement(ListItem, props));
}

const createHierarchy = (list, types, selectInstance) => {
  if (isUndef(list)) { return; }
  const tree = listToTree(list, 'id', 'parent');
  if (isUndef(tree)) { return; }
  return tree.map(
    (node, i) => recursiveList(node, i, types, selectInstance)
  );
}

const ObjectHierarchy = (props) => {
  return (
    <List>
      <Subheader>ObjectHierarchy</Subheader>
      <Divider />
      {
        createHierarchy(props.object_list, props.type_map, props.actions.selectInstance)
      }
    </List>
  );
};

const mapStateToProps = state => ({
  object_list: state.object_list,
  type_map: state.type_map,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectHierarchy);
