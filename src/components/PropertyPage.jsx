import React from 'react';
import { connect } from 'react-redux';
import {
  Divider,
  List,
  ListItem,
  Subheader
} from 'material-ui';

import { isUndef, listToTree } from '../utility';

const recursiveList = (node, index) => {
  if (isUndef(node)) { return; }
  let props = {
    key: node.id,
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
  let elmChildren =
    <div style={{ display: 'flex' }}>
      <label style={{ flexGrow: '1' }}>{ node.name }</label>
      <label style={{ flexGrow: '1' }}>{ node.type }</label>
      <label style={{ flexGrow: '1' }}>{ node.value }</label>
    </div>;
  return React.createElement(ListItem, props, elmChildren);
}

const createHierarchy = (list) => {
  if (isUndef(list)) { return; }
  const tree = listToTree(list, 'id', 'parent');
  if (isUndef(tree)) { return; }
  return tree.map(
    (node, i) => recursiveList(node, i)
  );
}

const PropertyPage = (props) => {
  const object = props.object_map[props.selected_instance_id];
  if (isUndef(object)) { return (<div />); }
  return (
    <List>
      <Subheader style={{ display: 'flex' }}>
        <label style={{ flexGrow: '0.5' }}>Properties</label>
        <label style={{ flexGrow: '0.5' }}>{ `TYPE: ${object.name}`}</label>
        <label style={{ flexGrow: '0.5' }}>{ `ID: ${object.id}` }</label>
        <div style={{ flexGrow: '1.5' }} />
      </Subheader>
      <Subheader style={{ display: 'flex' }}>
        <label style={{ flexGrow: '1' }}>Name</label>
        <label style={{ flexGrow: '1' }}>Type</label>
        <label style={{ flexGrow: '1' }}>Value</label>
      </Subheader>
      <Divider />
      {
        createHierarchy(object.prop_list)
      }
    </List>
  );
};

const mapStateToProps = state => ({
  selected_instance_id: state.selected_instance_id,
  object_map: state.object_map,
});

export default connect(mapStateToProps, null)(PropertyPage);
