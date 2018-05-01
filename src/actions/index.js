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
