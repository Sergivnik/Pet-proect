import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_NEW_TASKS_SUCCESS = "GET_NEW_TASKS_SUCCESS";
export const GET_NEW_TASKS_FAILURE = "GET_NEW_TASKS_FAILURE";
export const GET_DATA_TASKS_SUCCESS = "GET_DATA_TASKS_SUCCESS";
export const GET_DATA_TASKS_REQUEST = "GET_DATA_TASKS_REQUEST";
export const GET_DATA_TASKS_FAILURE = "GET_DATA_TASKS_FAILURE";
export const ADD_NEW_TASK_SUCCESS = "ADD_NEW_TASK_SUCCESS";
export const ADD_NEW_TASK_REQUEST = "ADD_NEW_TASK_REQUEST";
export const ADD_NEW_TASK_FAILURE = "ADD_NEW_TASK_FAILURE";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_REQUEST = "EDIT_TASK_REQUEST";
export const EDIT_TASK_FAILURE = "EDIT_TASK_FAILURE";
export const DEL_TASK_SUCCESS = "DEL_TASK_SUCCESS";
export const DEL_TASK_REQUEST = "DEL_TASK_REQUEST";
export const DEL_TASK_FAILURE = "DEL_TASK_FAILURE";

export const getNewTasks = () => {
  return (dispatch) => {
    axios
      .create({ withCredentials: true })
      .get(URL + "/getNewTasks")
      .then((res) => {
        console.log("tasks:", res.data);
        dispatch(getNewTasksSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getNewTasksFailure());
      });
  };
};
export const getNewTasksSuccess = (dataServer) => ({
  type: GET_NEW_TASKS_SUCCESS,
  dataServer,
});
export const getNewTasksFailure = () => ({
  type: GET_NEW_TASKS_FAILURE,
});

export const getDataTasks = () => {
  return (dispatch) => {
    dispatch(getDataTasksRequest());
    axios
      .create({ withCredentials: true })
      .get(URL + "/getDataTasks")
      .then((res) => {
        console.log("tasks:", res.data);
        dispatch(getDataTasksSuccess(res.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getDataTasksFailure());
      });
  };
};
export const getDataTasksRequest = () => ({
  type: GET_DATA_TASKS_REQUEST,
});
export const getDataTasksSuccess = (dataServer) => ({
  type: GET_DATA_TASKS_SUCCESS,
  dataServer,
});
export const getDataTasksFailure = () => ({
  type: GET_DATA_TASKS_FAILURE,
});

export const addNewTask = (newTask) => {
  return (dispatch) => {
    dispatch(addNewTaskRequest());
    axios
      .create({ withCredentials: true })
      .post(URL + "/addNewTask", newTask)
      .then((res) => {
        console.log(res.data);
        dispatch(addNewTaskSuccess(res.data.insertId, newTask));
      })
      .catch((e) => {
        console.log(e);
        dispatch(addNewTaskFailure());
      });
  };
};
export const addNewTaskRequest = () => ({
  type: ADD_NEW_TASK_REQUEST,
});
export const addNewTaskSuccess = (id, newTask) => ({
  type: ADD_NEW_TASK_SUCCESS,
  id,
  newTask,
});
export const addNewTaskFailure = () => ({
  type: ADD_NEW_TASK_FAILURE,
});

export const editTask = (id, editField, newValue) => {
  return (dispatch) => {
    dispatch(editTaskRequest());
    axios
      .create({ withCredentials: true })
      .patch(URL + "/editTask", {
        id: id,
        editField: editField,
        newValue: newValue,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(editTaskSuccess(id, editField, newValue));
      })
      .catch((e) => {
        console.log(e);
        dispatch(editTaskFailure());
      });
  };
};
export const editTaskRequest = () => ({
  type: EDIT_TASK_REQUEST,
});
export const editTaskSuccess = (id, editField, newValue) => ({
  type: EDIT_TASK_SUCCESS,
  id,
  editField,
  newValue,
});
export const editTaskFailure = () => ({
  type: EDIT_TASK_FAILURE,
});

export const delTask = (id) => {
  return (dispatch) => {
    dispatch(delTaskRequest());
    axios
      .create({ withCredentials: true })
      .delete(URL + "/delTask/" + id)
      .then((res) => {
        console.log(res.data);
        dispatch(delTaskSuccess(id));
      })
      .catch((e) => {
        console.log(e);
        dispatch(delTaskFailure());
      });
  };
};
export const delTaskRequest = () => ({
  type: DEL_TASK_REQUEST,
});
export const delTaskSuccess = (id) => ({
  type: DEL_TASK_SUCCESS,
  id,
});
export const delTaskFailure = () => ({
  type: DEL_TASK_FAILURE,
});
