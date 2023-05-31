import axios from "axios";
import { URL } from "../middlewares/initialState";

export const GET_NEW_TASKS_SUCCESS = "GET_NEW_TASKS_SUCCESS";
export const GET_NEW_TASKS_FAILURE = "GET_NEW_TASKS_FAILURE";

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
export const getNewTasksFailure = () => ({ type: GET_NEW_TASKS_FAILURE });
