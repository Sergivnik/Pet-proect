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
        />
      </div>
    </div>
  );
};
