import { tasksDataStore } from "./tasksStore.js";
import {
  GET_NEW_TASKS_SUCCESS,
  GET_NEW_TASKS_FAILURE,
  GET_DATA_TASKS_SUCCESS,
  GET_DATA_TASKS_REQUEST,
  GET_DATA_TASKS_FAILURE,
  ADD_NEW_TASK_SUCCESS,
  ADD_NEW_TASK_REQUEST,
  ADD_NEW_TASK_FAILURE,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_REQUEST,
  EDIT_TASK_FAILURE,
  DEL_TASK_SUCCESS,
  DEL_TASK_REQUEST,
  DEL_TASK_FAILURE,
  CHECK_LOG_SUCCESS,
  CHECK_LOG_REQUEST,
  CHECK_LOG_FAILURE,
} from "../actions/tasksActions";

export const tasksReducer = (store = tasksDataStore, action) => {
  switch (action.type) {
    case GET_NEW_TASKS_SUCCESS: {
      console.log(action.dataServer);
      return {
        ...store,
        tasksNumber: action.dataServer,
        statusOfRequest: null,
      };
    }
    case GET_NEW_TASKS_FAILURE: {
      return { ...store, statusOfRequest: "Error" };
    }
    case GET_DATA_TASKS_REQUEST: {
      return { ...store, statusOfRequest: "Loading" };
    }
    case GET_DATA_TASKS_SUCCESS: {
      console.log("taskReducer:", action.dataServer);
      return {
        ...store,
        taskList: action.dataServer.taskstable,
        userList: action.dataServer.users,
        statusOfRequest: null,
      };
    }
    case GET_DATA_TASKS_FAILURE: {
      return { ...store, statusOfRequest: "Error" };
    }

    case ADD_NEW_TASK_REQUEST: {
      return { ...store, statusOfRequest: "Saving" };
    }
    case ADD_NEW_TASK_FAILURE: {
      return { ...store, statusOfRequest: "Error" };
    }
    case ADD_NEW_TASK_SUCCESS: {
      let arrTasks = [...store.taskList];
      let newTask = action.newTask;
      newTask._id = action.id;
      arrTasks.push(newTask);
      return { ...store, taskList: arrTasks, statusOfRequest: null };
    }

    case EDIT_TASK_REQUEST: {
      return { ...store, statusOfRequest: "Saving..." };
    }
    case EDIT_TASK_FAILURE: {
      return { ...store, statusOfRequest: "Error!!!" };
    }
    case EDIT_TASK_SUCCESS: {
      let arrTasks = [...store.taskList];
      let index = arrTasks.findIndex((elem) => elem._id == action.id);
      arrTasks[index][action.editField] = action.newValue;
      return { ...store, taskList: arrTasks, statusOfRequest: null };
    }
    case DEL_TASK_REQUEST: {
      return { ...store, statusOfRequest: "Deleting..." };
    }
    case DEL_TASK_FAILURE: {
      return { ...store, statusOfRequest: "Error!!!" };
    }
    case DEL_TASK_SUCCESS: {
      let arrTasks = [...store.taskList];
      let arr = arrTasks.filter((elem) => elem._id != action.id);
      return { ...store, taskList: arr, statusOfRequest: null };
    }
    case CHECK_LOG_REQUEST: {
      return { ...store, statusOfRequest: "Deleting..." };
    }
    case CHECK_LOG_FAILURE: {
      return { ...store, statusOfRequest: "Error!!!" };
    }
    case CHECK_LOG_SUCCESS: {
      const fileContent = action.logText;

      // Функция для парсинга текстового файла
      function parseTextFile(content) {
        const lines = content.split("\n");
        const result = [];

        for (const line of lines) {
          if (line.trim() === "") {
            continue; // Пропускаем пустые строки
          }

          const [dateTime, name] = line.split("] ");
          const date = dateTime.substring(1); // Исключаем начальный "["

          result.push({ id: result.length + 1, date, name });
        }

        return result;
      }

      // Вызов функции для парсинга текстового файла
      const parsedData = parseTextFile(fileContent);

      //console.log(parsedData);
      return { ...store, logList: parsedData };
    }
    default:
      return store;
  }
};
