import update from "react-addons-update";
import { ADD_ODER } from "../actions/oderActions.js";
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
};

export const addOderReducer = (store = initialStore, action) => {
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
    default:
      return store;
  }
};
