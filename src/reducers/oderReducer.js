import update from "react-addons-update";
import { ADD_ODER } from "../actions/oderActions.js";
import {
  GET_DATA_SUCCESS,
  GET_DATA_REQUEST,
  GET_DATA_FAILURE,
} from "../middlewares/initialState.js";

const initialStore = {
  odersList: [
    {
      id: 1,
      date: "2021-02-22",
      driver: "Вася",
      oder: "Айрон",
      loadingPoint: "Таганрог",
      unloadingPoint: "Ростов",
      oderPrice: 10000,
      driverPrice: 9000,
    },
    {
      id: 2,
      date: "2021-02-22",
      driver: "Коля",
      oder: "Алипаша",
      loadingPoint: "Таганрог",
      unloadingPoint: "Таганрог",
      oderPrice: 5000,
      driverPrice: 4500,
    },
  ],
  driverlist: [
    { id: 1, value: "Вася" },
    { id: 2, value: "Коля" },
    { id: 3, value: "Паша" },
    { id: 4, value: "Володя" },
    { id: 5, value: "Рома" },
  ],
  oderlist: [
    { id: 1, value: "Айрон" },
    { id: 2, value: "Алипаша" },
    { id: 3, value: "ДМК" },
    { id: 4, value: "Норма" },
    { id: 5, value: "Сталь-инвест" },
  ],
  citieslist: [],
  request: {
    status: "IDLE",
    error: null,
  },
};

export const oderReducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_ODER: {
      const oderId = store.odersList[store.odersList.length - 1].id + 1;
      return update(store, {
        odersList: {
          $merge: {
            [oderId - 1]: {
              id: oderId,
              date: action.data.date,
              driver: action.data.driver,
              oder: action.data.oder,
              loadingPoint: action.data.loadingPoint,
              unloadingPoint: action.data.unloadingPoint,
              oderPrice: action.data.oderPrice,
              driverPrice: action.data.driverPrice,
            },
          },
        },
      });
    }
    case GET_DATA_SUCCESS: {
      return {
        ...store,
        citieslist: action.dataServer.citieslist,
        request: {
          status: "SUCCESS",
          error: null,
        },
      };
    }
    case GET_DATA_FAILURE: {
      return {
        ...store,
        request: {
          status: "FAILURE",
          error: true,
        },
      };
    }
    case GET_DATA_REQUEST: {
      return {
        ...store,
        request: {
          status: "LOADING",
          error: null,
        },
      };
    }
    default:
      return store;
  }
};
