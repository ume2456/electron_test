import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Divider,
  List,
  ListItem,
  Subheader
} from 'material-ui';

import * as actions from '../actions/index';
import { isUndef } from '../utility';

const recursiveList = (list, offset = 0) => {
  let result = [];
  let index = offset;
  for (const key in list) {
    const item = list[key];
    let props = {
      key: index,
      primaryText: `${key} ${item.type}`,
      style: { borderStyle: 'solid', borderWidth: '0 0 1px' },
    };
    ++index;
    if (!isUndef(item.properties)) {
      let children = [];
      [children, index] = recursiveList(item.properties, index);
      props = {
        ...props,
        nestedItems: children,
      };
    }
    result.push(React.createElement(ListItem, props));
  }
  return [result, index];
};

const createList = (list) => {
  let [result, index] = recursiveList(list);
  return result;
}

const PropertyPage = (props) => {
  const object = props.object_map[props.selected_instance_id];
  if (isUndef(object)) { return (<div />); }
  const type = props.type_map[object.type_id];
  if (isUndef(object)) { return (<div />); }
  return (
    <List>
      <Subheader>{ `Properties TYPE: ${type.type} ID: ${object.id}` }</Subheader>
      <Divider />
      {
        createList(type.properties)
      }
    </List>
  );
};

const mapStateToProps = state => ({
  selected_instance_id: state.selected_instance_id,
  object_map: state.object_map,
  type_map: state.type_map,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage);
