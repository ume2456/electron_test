import { isUndef } from '../utility';

const initialState = {
  name: '',
  id: 0,
  messages: [],
  client: null,
  object_map: {},
  object_list: [],
  selected_instance_id: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'SUBMIT_NAME':
    return {
      ...state,
      name: action.name,
    };
  case 'SUBMIT_MESSAGE':
    return {
      ...state,
      id: ++state.id,
      messages: [
        ...state.messages,
        {
          name: state.name,
          id: state.id,
          message: action.message,
        }
      ],
    };
  case 'APPLY_MESSAGE':
    return {
      ...state,
      id: ++state.id,
      messages: [
        ...state.messages,
        {
          name: action.name,
          id: state.id,
          message: action.message,
        }
      ],
    };
  case 'ADD_CLIENT':
    return {
      ...state,
      client: action.client,
    };
  case 'ADD_OBJECT':
    if (isUndef(action.object) || isUndef(action.object.id)) {
      return state;
    }
    return {
      ...state,
      object_list: [
        ...state.object_list,
        {
          id: action.object.id,
          parent: action.object.parent,
          name: action.object.name,
        },
      ],
      object_map: {
        ...state.object_map,
        [action.object.id]: action.object,
      },
    };
  case 'ADD_PROP':
    if (isUndef(action.data.parent)) { return state; }
    let object = state.object_map[action.data.unique_id];
    if (isUndef(object)) { return state; }
    if (isUndef(object.prop_list)) { object.prop_list = []; }
    if (isUndef(object.prop_map)) { object.prop_map = {}; }
    object.prop_list = [
      ...object.prop_list,
      action.data,
    ];
    object.prop_map  = {
      ...object.prop_map,
      [action.data.id]: action.data,
    };
    return {
      ...state,
      [state.object_map[action.data.parent]]: object,
    }
  case 'APPLY_PROPS':
  case 'SELECT_INSTANCE':
    return {
      ...state,
      selected_instance_id: action.id,
    }
  default: break;
  }
  return state;
};
