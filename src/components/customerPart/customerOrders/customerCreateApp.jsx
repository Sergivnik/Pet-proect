import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpanWithDate } from "../../myLib/mySpan/spanWithDate.jsx";
import { CustomerPointForm } from "./customerPointForm.jsx";
import "./customerOrders.sass";

export const CustomerCreateApp = (props) => {
  const customerOrders = useSelector(
    (state) => state.customerReducer.customerOrders
  );

  const [appOrder, setAppOrder] = useState({});
  const [dataApp, setDataApp] = useState({
    dateOfApp: new Date(),
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
  });
  useEffect(() => {
    if (props.id) {
      let appOrder = customerOrders.find((order) => order._id == props.id);
      setAppOrder(appOrder);
      setDataApp({
        dateOfApp: appOrder.dateOfApp,
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
      });
    }
  }, [props.id]);
  const getData = (data, name) => {
    console.log(data, name);
    let obj = { ...dataApp };
    obj.dateOfApp = data;
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
        />
      </div>
    </div>
  );
};
