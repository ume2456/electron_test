const LTT = require('list-to-tree');

export const listToTree = (list = [], key_id = 'id', key_parent = 'parent') => {
  const ltt = new LTT(list, {
    key_id: key_id,
    key_parent: key_parent
  });
  return ltt.GetTree();
}

export const isUndef = (object) => {
  return (typeof(object) === 'undefined' ? true : false);
}
