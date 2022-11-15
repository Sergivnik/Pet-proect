import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterDateListTd } from "../../myLib/filterTd/filterDateListTd.jsx";
import { FilterTdList } from "../../myLib/filterTd/filterTdList.jsx";
import "./customerOrders.sass";

export const CustomerTheader = (props) => {
  let data = props.data;

  const managerList = useSelector((state) => state.customerReducer.managerList);
  const driversList = useSelector((state) => state.customerReducer.driversList);
  const citiesList = useSelector((state) => state.customerReducer.citiesList);
  const customerclients = useSelector(
    (state) => state.customerReducer.customerclients
  );

  const cloneFilter = (objFikter) => {
    let newObjFilter = {};
    for (let key in objFikter) {
      newObjFilter[key] = [];
      objFikter[key].forEach((obj) => {
        newObjFilter[key].push({ ...obj });
      });
    }
    return newObjFilter;
  };

  const [filterData, setFilterData] = useState({
    date: [],
    managerList: [{ id: null, value: "", checked: true }],
    driverList: [{ id: null, value: "", checked: true }],
    loadingList: [],
    unLoadingList: [],
    priceList: [],
    documentList: [],
    paymentList: [],
    customerClientList: [{ id: null, value: "", checked: true }],
  });
  const [originFilterData, setOriginFilterData] = useState({
    date: [],
    managerList: [{ id: null, value: "", checked: true }],
    driverList: [{ id: null, value: "", checked: true }],
    loadingList: [],
    unLoadingList: [],
    priceList: [],
    documentList: [],
    paymentList: [],
    customerClientList: [{ id: null, value: "", checked: true }],
  });

  useEffect(() => {
    let obj = { ...filterData };
    let uniqueArrDate = [];
    let uniqueArrManager = [];
    let uniqueArrDriver = [];
    let uniqueArrCityLoad = [];
    let uniqueArrCityUnload = [];
    let uniqueArrPrice = [];
    let uniqueArrcustomer = [];
    let index = 0;
    const sortFunction = (a, b) => {
      if (a.id == null && b.id != null) return 1;
      if (b.id == null && a.id != null) return -1;
      if (a.value < b.value) return -1;
      if (a.value == b.value) return 0;
      if (a.value > b.value) return 1;
    };
    data.forEach((elem) => {
      if (!uniqueArrDate.includes(elem.date)) {
        uniqueArrDate.push(elem.date);
        let date = new Date(elem.date);
        let dateStr = `${date.getFullYear()}-${
          date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        obj.date.push({ id: index, value: dateStr, checked: true });
        index++;
      }
      if (
        !uniqueArrManager.includes(elem.idManager) &&
        elem.idManager != null
      ) {
        uniqueArrManager.push(elem.idManager);
        let manager = managerList.find(
          (manager) => manager._id == elem.idManager
        );
        obj.managerList.push({
          id: manager._id,
          value: manager.value,
          checked: true,
        });
      }
      if (
        !uniqueArrDriver.includes(elem.idTrackDriver) &&
        elem.idTrackDriver != null
      ) {
        uniqueArrDriver.push(elem.idTrackDriver);
        let driver = driversList.find(
          (driver) => driver._id == elem.idTrackDriver
        );
        obj.driverList.push({
          id: driver._id,
          value: driver.shortName,
          checked: true,
        });
      }
      elem.idLoadingPoint.forEach((idPoint) => {
        if (!uniqueArrCityLoad.includes(idPoint)) {
          uniqueArrCityLoad.push(idPoint);
          let point = citiesList.find((city) => city._id == idPoint);
          obj.loadingList.push({
            id: point._id,
            value: point.value,
            checked: true,
          });
        }
      });
      elem.idUnloadingPoint.forEach((idPoint) => {
        if (!uniqueArrCityUnload.includes(idPoint)) {
          uniqueArrCityUnload.push(idPoint);
          let point = citiesList.find((city) => city._id == idPoint);
          obj.unLoadingList.push({
            id: point._id,
            value: point.value,
            checked: true,
          });
        }
      });
      if (!uniqueArrPrice.includes(elem.customerPrice))
        uniqueArrPrice.push(elem.customerPrice);
      if (
        !uniqueArrcustomer.includes(elem.customerClientId) &&
        elem.customerClientId != null
      ) {
        uniqueArrcustomer.push(elem.customerClientId);
        let customer = customerclients.find(
          (customer) => customer._id == elem.customerClientId
        );
        obj.customerClientList.push({
          id: customer._id,
          value: customer.name,
          checked: true,
        });
      }
    });
    let arr = uniqueArrPrice.sort((a, b) => {
      if (Number(a) < Number(b)) return -1;
      if (Number(a) == Number(b)) return 0;
      if (Number(a) > Number(b)) return 1;
    });
    arr.forEach((price, index) => {
      obj.priceList.push({ id: index, value: price, checked: true });
    });
    obj.documentList = [
      { id: 0, value: "Ок", checked: true },
      { id: 1, value: "нет", checked: true },
    ];
    obj.paymentList = [
      { id: 0, value: "Ок", checked: true },
      { id: 1, value: "нет", checked: true },
    ];
    obj.managerList = obj.managerList.sort(sortFunction);
    obj.driverList = obj.driverList.sort(sortFunction);
    obj.customerClientList = obj.customerClientList.sort(sortFunction);
    setOriginFilterData(obj);
    setFilterData(obj);
  }, [props.data]);

  const getFilteredList = (name, list) => {
    let obj = cloneFilter(originFilterData);
    let objOrigin = cloneFilter(originFilterData);
    list.forEach((elem) => {
      let index = obj[name].findIndex((filterElem) => filterElem.id == elem.id);
      obj[name][index].checked = elem.checked;
    });
    list.forEach((elem) => {
      let index = objOrigin[name].findIndex(
        (filterElem) => filterElem.id == elem.id
      );
      objOrigin[name][index].checked = elem.checked;
    });
    setOriginFilterData(objOrigin);
    props.getFilterData(obj);
    for (let key in objOrigin) {
      let filtredOrderList = getFiltredData(objOrigin, key);
      console.log(key, filtredOrderList);
      obj[key] = getNewFilterData(filtredOrderList, key, objOrigin);
    }
    setFilterData(obj);
  };

  const getNewFilterData = (newOrderList, name, obj) => {
    let uniqueArr = [];
    let arrFilter = [];
    let index = 0;
    const sortFunction = (a, b) => {
      if (a.id == null && b.id != null) return 1;
      if (b.id == null && a.id != null) return -1;
      if (a.value < b.value) return -1;
      if (a.value == b.value) return 0;
      if (a.value > b.value) return 1;
    };
    newOrderList.forEach((elem) => {
      if (name == "date") {
        if (!uniqueArr.includes(elem.date)) {
          uniqueArr.push(elem.date);
          let date = new Date(elem.date);
          let dateStr = `${date.getFullYear()}-${
            date.getMonth() < 9
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1
          }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
          arrFilter.push(
            obj["date"].find((dateElem) => dateElem.value == dateStr)
          );
        }
      }
      if (name == "managerList") {
        if (!uniqueArr.includes(elem.idManager)) {
          uniqueArr.push(elem.idManager);
          // if (elem.idManager == null) {
          //   arrFilter.push({ id: null, value: "", checked: true });
          // }
          arrFilter.push(
            obj["managerList"].find((manager) => manager.id == elem.idManager)
          );
        }
      }
      if (name == "driverList") {
        if (!uniqueArr.includes(elem.idTrackDriver)) {
          uniqueArr.push(elem.idTrackDriver);
          arrFilter.push(
            obj["driverList"].find((driver) => driver.id == elem.idTrackDriver)
          );
        }
      }
      if (name == "loadingList") {
        elem.idLoadingPoint.forEach((idPoint) => {
          if (!uniqueArr.includes(idPoint)) {
            uniqueArr.push(idPoint);
            arrFilter.push(
              obj["loadingList"].find((city) => city.id == idPoint)
            );
          }
        });
      }
      if (name == "unLoadingList") {
        elem.idUnloadingPoint.forEach((idPoint) => {
          if (!uniqueArr.includes(idPoint)) {
            uniqueArr.push(idPoint);
            arrFilter.push(
              obj["unLoadingList"].find((city) => city.id == idPoint)
            );
          }
        });
      }
      if (name == "priceList") {
        if (!uniqueArr.includes(elem.customerPrice)) {
          uniqueArr.push(elem.customerPrice);
          arrFilter.push(
            obj["priceList"].find((price) => price.value == elem.customerPrice)
          );
        }
      }
      if (name == "documentList") {
        let doc = elem.document == "Ок" ? "Ок" : "нет";
        if (!uniqueArr.includes(doc)) {
          uniqueArr.push(doc);
          arrFilter.push(
            obj["documentList"].find((document) => document.value == doc)
          );
        }
      }
      if (name == "paymentList") {
        let payment = elem.customerPayment == "Ок" ? "Ок" : "нет";
        if (!uniqueArr.includes(payment)) {
          uniqueArr.push(payment);
          arrFilter.push(
            obj["paymentList"].find((pay) => pay.value == payment)
          );
        }
      }
      if (name == "customerClientList") {
        if (!uniqueArr.includes(elem.customerClientId)) {
          uniqueArr.push(elem.customerClientId);
          arrFilter.push(
            obj["customerClientList"].find(
              (customer) => customer.id == elem.customerClientId
            )
          );
        }
      }
    });
    arrFilter = arrFilter.sort(sortFunction);
    return arrFilter;
  };
  const getFiltredData = (data, name) => {
    let arrOrders = [];
    const findKey = (key) => {
      if (key == "date") return "date";
      if (key == "idManager") return "managerList";
      if (key == "idTrackDriver") return "driverList";
      if (key == "idLoadingPoint") return "loadingList";
      if (key == "idUnloadingPoint") return "unLoadingList";
      if (key == "customerPrice") return "priceList";
      if (key == "document") return "documentList";
      if (key == "customerPayment") return "paymentList";
      if (key == "customerClientId") return "customerClientList";
    };
    const findName = (name) => {
      if (name == "date") return "date";
      if (name == "managerList") return "idManager";
      if (name == "driverList") return "idTrackDriver";
      if (name == "loadingList") return "idLoadingPoint";
      if (name == "unLoadingList") return "idUnloadingPoint";
      if (name == "priceList") return "customerPrice";
      if (name == "documentList") return "document";
      if (name == "paymentList") return "customerPayment";
      if (name == "customerClientList") return "customerClientId";
    };
    props.data.forEach((elem) => {
      let condition = true;
      for (let key in elem) {
        if (key == "date" && key != findName(name)) {
          let elemDate = new Date(elem[key]);
          let elemYear = elemDate.getFullYear();
          let elemMonth = elemDate.getMonth();
          let elemDay = elemDate.getDate();
          let dateText = `${elemYear}-${
            elemMonth < 9 ? `0${elemMonth + 1}` : `${elemMonth + 1}`
          }-${elemDay < 10 ? `0${elemDay}` : `${elemDay}`}`;
          let filter = data[findKey(key)].find(
            (date) => date.value == dateText
          );
          condition = condition && (filter ? filter.checked : false);
        }
        if (
          (key == "idManager" ||
            key == "idTrackDriver" ||
            key == "customerClientId") &&
          key != findName(name)
        ) {
          let filter = data[findKey(key)].find(
            (elemId) => elemId.id == elem[key]
          );
          condition = condition && (filter ? filter.checked : false);
        }
        if (
          (key == "idLoadingPoint" || key == "idUnloadingPoint") &&
          key != findName(name)
        ) {
          let check = false;
          elem[key].forEach((idPoint) => {
            let filter = data[findKey(key)].find(
              (filterPoint) => filterPoint.id == idPoint
            );
            check = check || (filter ? filter.checked : false);
          });
          condition = condition && check;
        }
        if (key == "customerPrice" && key != findName(name)) {
          let filter = data[findKey(key)].find(
            (price) => price.value == elem[key]
          );
          condition = condition && (filter ? filter.checked : false);
        }
        if (
          (key == "document" || key == "customerPayment") &&
          key != findName(name)
        ) {
          let value = elem[key] == "Ок" ? "Ок" : "нет";
          let filter = data[findKey(key)].find(
            (filterElem) => filterElem.value == value
          );
          condition = condition && (filter ? filter.checked : false);
        }
      }
      if (condition) arrOrders.push(elem);
    });
    return arrOrders;
  };

  return (
    <thead className="customerOrderThead">
      <tr>
        <FilterDateListTd
          name="date"
          title="Дата"
          listId={filterData.date}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="managerList"
          title="Менеджер"
          listId={filterData.managerList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="driverList"
          title="Водитель"
          listId={filterData.driverList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="loadingList"
          title="Погрузка"
          listId={filterData.loadingList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="unLoadingList"
          title="Выгрузка"
          listId={filterData.unLoadingList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="priceList"
          title="Цена"
          listId={filterData.priceList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="documentList"
          title="Док-ты"
          listId={filterData.documentList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="paymentList"
          title="Оплата"
          listId={filterData.paymentList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="customerClientList"
          title="Заказчик"
          listId={filterData.customerClientList}
          getFilteredList={getFilteredList}
        />
      </tr>
    </thead>
  );
};
