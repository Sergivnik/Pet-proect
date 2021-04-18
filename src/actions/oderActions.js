export const ADD_ODER = "ADD_ODER";
export const DEL_ODER = "DEL_ODER";
export const EDIT_ODER = "EDIT_ODER";
export const SET_PROXY = "SET_PROXY";

export const addOder = (data) => ({
  type: ADD_ODER,
  data,
});

export const editOder = (id, field, newValue) => ({
  type: EDIT_ODER,
  id,
  field,
  newValue,
});

export const setProxy = (id) => ({
  type: SET_PROXY,
  id,
});

export const delOder = (id) => ({
  type: DEL_ODER,
  id,
});

