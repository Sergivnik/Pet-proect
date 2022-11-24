import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpanWithDate } from "../../myLib/mySpan/spanWithDate.jsx";
import { CustomerPointForm } from "./customerPointForm.jsx";
import { ChoiseList } from "../../choiseList/choiseList.jsx";
import { addCustomerApp } from "../../../actions/customerOrderAction.js";
import "./customerOrders.sass";

export const CustomerCreateApp = (props) => {
  const dispatch = useDispatch();
  const customerOrders = useSelector(
    (state) => state.customerReducer.customerOrders
  );
  const customerclients = useSelector(
    (state) => state.customerReducer.customerclients
  );
  const user = props.user;

  const [appOrder, setAppOrder] = useState({});
  const [text, setText] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [dataApp, setDataApp] = useState({
    dateOfApp: new Date(),
    customerClientId: null,
    weight: null,
    idLoadingPoint: [],
    idUnloadingPoint: [],
    loadingInfo: [],
    unloadingInfo: [],
    dateOfLoading: [],
    dateOfUnloading: [],
    loadingStoreId: [],
    unloadingStoreId: [],
    customerPrice: null,
    textInfo: "",
    orderId: null,
    customerId: user.customerId,
    idManager: user.managerID,
    applicationNumber: null,
    loadingText: [],
    unloadingText: [],
  });
  useEffect(() => {
    if (props.id) {
      let appOrder = customerOrders.find((order) => order._id == props.id);
      setAppOrder(appOrder);
      setDataApp({
        dateOfApp: appOrder.dateOfApp,
        customerClientId: appOrder.customerClientId,
        weight: appOrder.weight,
        idLoadingPoint: appOrder.idLoadingPoint,
        idUnloadingPoint: appOrder.idUnloadingPoint,
        loadingInfo: appOrder.loadingInfo,
        unloadingInfo: appOrder.unloadingInfo,
        dateOfLoading: appOrder.dateOfLoading,
        dateOfUnloading: appOrder.dateOfUnloading,
        loadingStoreId: appOrder.loadingStoreId,
        unloadingStoreId: appOrder.unloadingStoreId,
        customerPrice: appOrder.customerPrice,
        textInfo: appOrder.textInfo,
        orderId: appOrder.orderId,
        customerId: appOrder.customerId,
        idManager: appOrder.idManager,
        applicationNumber: appOrder.applicationNumber,
        loadingText: appOrder.loadingText,
        unloadingText: appOrder.unloadingText,
      });
    } else {
      setDataApp({
        dateOfApp: new Date(),
        customerClientId: null,
        weight: null,
        idLoadingPoint: [],
        idUnloadingPoint: [],
        loadingInfo: [],
        unloadingInfo: [],
        dateOfLoading: [],
        dateOfUnloading: [],
        loadingStoreId: [],
        unloadingStoreId: [],
        customerPrice: null,
        textInfo: "",
        orderId: null,
        customerId: user.customerId,
        idManager: user.managerID,
        applicationNumber: null,
        loadingText: [],
        unloadingText: [],
      });
    }
  }, [props.id]);
  useEffect(() => {
    let arr = [];
    customerclients.forEach((customer) => {
      let customerValue = { _id: customer._id, value: customer.name };
      arr.push(customerValue);
    });
    setCustomerList(arr);
  }, [customerclients]);

  const getData = (data, name) => {
    let obj = { ...dataApp };
    obj.dateOfApp = data;
    setDataApp(obj);
  };
  const setCustomer = (data) => {
    let obj = { ...dataApp };
    obj.customerClientId = data._id;
    setDataApp(obj);
  };
  const handleDblClickClient = () => {
    let obj = { ...dataApp };
    obj.customerClientId = null;
    setDataApp(obj);
  };
  const addPointData = (pointData, name) => {
    console.log(pointData);
    let obj = { ...dataApp };
    if (name == "loadingPoint") {
      obj.idLoadingPoint.push(pointData.idPoint);
      obj.loadingInfo.push(pointData.text);
      obj.dateOfLoading.push(pointData.date);
      obj.loadingStoreId.push(pointData.storeId);
    }
    if (name == "unloadingPoint") {
      obj.idUnloadingPoint.push(pointData.idPoint);
      obj.unloadingInfo.push(pointData.text);
      obj.dateOfUnloading.push(pointData.date);
      obj.unloadingStoreId.push(pointData.storeId);
    }
    setDataApp(obj);
  };
  const editData = (name, field, data, index) => {
    let obj = { ...dataApp };
    if (name == "loadingPoint") {
      if (field == "date") {
        obj.dateOfLoading[index] = data;
      }
      if (field == "point") {
        obj.idLoadingPoint[index] = data;
      }
      if (field == "store") {
        obj.loadingStoreId[index] = data;
      }
      if (field == "text") {
        obj.loadingInfo[index] = data;
      }
    }
    if (name == "unloadingPoint") {
      if (field == "date") {
        obj.dateOfUnloading[index] = data;
      }
      if (field == "point") {
        obj.idUnloadingPoint[index] = data;
      }
      if (field == "store") {
        obj.unloadingStoreId[index] = data;
      }
      if (field == "text") {
        obj.unloadingInfo[index] = data;
      }
    }
    setDataApp(obj);
  };
  const delPoint = (name, index) => {
    let obj = { ...dataApp };
    if (name == "loadingPoint") {
      obj.dateOfLoading.splice(index, 1);
      obj.idLoadingPoint.splice(index, 1);
      obj.loadingStoreId.splice(index, 1);
      obj.loadingInfo.splice(index, 1);
    }
    if (name == "unloadingPoint") {
      obj.dateOfUnloading.splice(index, 1);
      obj.idUnloadingPoint.splice(index, 1);
      obj.unloadingStoreId.splice(index, 1);
      obj.unloadingInfo.splice(index, 1);
    }
    setDataApp(obj);
  };
  const handleBlurWeight = (e) => {
    let weight = e.currentTarget.value;
    if (weight) {
      let obj = { ...dataApp };
      obj.weight = weight;
      setDataApp(obj);
    }
  };
  const handleEnterWeight = (e) => {
    if (e.key == "Enter") {
      let weight = e.currentTarget.value;
      if (weight) {
        let obj = { ...dataApp };
        obj.weight = weight;
        setDataApp(obj);
      }
    }
  };
  const handleDblClickWeight = () => {
    let obj = { ...dataApp };
    obj.weight = null;
    setDataApp(obj);
  };
  const handleBlurPrice = (e) => {
    let price = e.currentTarget.value;
    if (price) {
      let obj = { ...dataApp };
      obj.customerPrice = price;
      setDataApp(obj);
    }
  };
  const handleEnterPrice = (e) => {
    if (e.key == "Enter") {
      let price = e.currentTarget.value;
      if (price) {
        let obj = { ...dataApp };
        obj.customerPrice = price;
        setDataApp(obj);
      }
    }
  };
  const handleDblClickPrice = () => {
    let obj = { ...dataApp };
    obj.customerPrice = null;
    setDataApp(obj);
  };
  const handleBlurText = (e) => {
    let text = e.currentTarget.value;
    if (text) {
      let obj = { ...dataApp };
      obj.textInfo = text;
      setDataApp(obj);
    }
  };
  const handleEnterText = (e) => {
    if (e.key == "Enter") {
      let text = e.currentTarget.value;
      if (text) {
        let obj = { ...dataApp };
        obj.textInfo = text;
        setDataApp(obj);
      }
    }
  };
  const handleDblClickText = () => {
    let obj = { ...dataApp };
    obj.textInfo = "";
    setDataApp(obj);
  };
  const getText = (e) => {
    setText(e.currentTarget.value);
  };
  const handleSaveCustomerApp = () => {
    if (props.id) {
    } else {
      console.log(dataApp, user);
      dispatch(addCustomerApp(dataApp));
    }
  };
  return (
    <div className="contentDiv">
      <h2 className="createAppH3">
        {`Договор-заявка на превозку груза ${
          appOrder.orderId ? `№ ${appOrder.orderId}` : ``
        } от `}
        <SpanWithDate
          date={dataApp.dateOfApp}
          name="dateOfApp"
          getDate={getData}
        />
      </h2>
      <div className="customerDiv">
        <span>{"Заказчик"}</span>
        {dataApp.customerClientId ? (
          <span
            className="customerAppSpanClient"
            onDoubleClick={handleDblClickClient}
          >
            {customerclients
              ? customerclients.find(
                  (customer) => customer._id == dataApp.customerClientId
                ).name
              : null}
          </span>
        ) : (
          <div className="customerPointInputWrapper">
            <ChoiseList
              name="customer"
              arrlist={customerList}
              setValue={setCustomer}
            />
          </div>
        )}
      </div>
      <div className="loadingDiv">
        <h3 className="loadingH3">Погрузка</h3>
        <CustomerPointForm
          name="loadingPoint"
          dateList={dataApp.dateOfLoading}
          pointList={dataApp.idLoadingPoint}
          storeList={dataApp.loadingStoreId}
          infoList={dataApp.loadingInfo}
          addPointData={addPointData}
          editData={editData}
          delPoint={delPoint}
        />
      </div>
      <div className="unloadingDiv">
        <h3 className="unloadingH3">Выгрузка</h3>
        <CustomerPointForm
          name="unloadingPoint"
          dateList={dataApp.dateOfUnloading}
          pointList={dataApp.idUnloadingPoint}
          storeList={dataApp.unloadingStoreId}
          infoList={dataApp.unloadingInfo}
          addPointData={addPointData}
          editData={editData}
          delPoint={delPoint}
        />
      </div>
      <footer className="customerAppFooter">
        <div className="customerAppPriceDiv">
          <span>{"Стоимость перевозки"}</span>
          {dataApp.customerPrice ? (
            <span
              className="customerAppSpanPrice"
              onDoubleClick={handleDblClickPrice}
            >
              {dataApp.customerPrice}
            </span>
          ) : (
            <div className="customerAppInputWrapper">
              <input
                className="customerAppInput"
                type="number"
                onBlur={handleBlurPrice}
                onKeyDown={handleEnterPrice}
              />
            </div>
          )}
          <span>{"рублей"}</span>
        </div>
        <div className="customerAppWeightDiv">
          <span>{"Общий вес загрузки"}</span>
          {dataApp.weight ? (
            <span
              className="customerAppSpanWeight"
              onDoubleClick={handleDblClickWeight}
            >
              {dataApp.weight}
            </span>
          ) : (
            <div className="customerAppInputWrapper">
              <input
                className="customerAppInput"
                type="number"
                onBlur={handleBlurWeight}
                onKeyDown={handleEnterWeight}
              />
            </div>
          )}
          <span>{"тонн"}</span>
        </div>
        <div className="customerAppTextDiv">
          <span>{"Особые условия"}</span>
          {dataApp.textInfo == "" ? (
            <div className="customerAppInputWrapper">
              <input
                className="customerAppInput"
                type="text"
                onChange={getText}
                value={text}
                onBlur={handleBlurText}
                onKeyDown={handleEnterText}
              />
            </div>
          ) : (
            <span
              className="customerAppSpanText"
              onDoubleClick={handleDblClickText}
            >
              {dataApp.textInfo}
            </span>
          )}
        </div>
      </footer>
      <button className="customerAppBtn" onClick={handleSaveCustomerApp}>
        {"Сохранить"}
      </button>
    </div>
  );
};
