export const submitName = (name) => ({
  type: 'SUBMIT_NAME',
  name
});

export const submitMessage = (message) => ({
  type: 'SUBMIT_MESSAGE',
  message
});

export const applyMessage = (name, message) => ({
  type: 'APPLY_MESSAGE',
  name,
  message
});

export const addClient = (client) => ({
  type: 'ADD_CLIENT',
  client
});

export const addObject = (object) => ({
  type: 'ADD_OBJECT',
  object
});

export const addProp = (data) => ({
  type: 'ADD_PROP',
  data
});

export const applyProps = (data) => ({
  type: 'APPLY_PROPS',
  data
});

export const selectInstance = (id) => ({
  type: 'SELECT_INSTANCE',
  id
});
