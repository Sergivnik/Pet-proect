import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";

import "./billsForm.sass";

export const TrEditable = (props) => {
  const elem = props.elem;
  const index = props.index;

  const citiesList = useSelector((state) => state.oderReducer.citieslist);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const driver = useSelector((state) => state.oderReducer.trackdrivers);
  const track = useSelector((state) => state.oderReducer.tracklist);
  const customerContract = findValueBy_Id(elem.idCustomer, clientList).contract;
  const customerOrders = useSelector(
    (state) => state.customerReducer.customerOrders
  );

  const [showInputRoute, setshowInputRoute] = useState(false);
  const [showInputNumber, setShowInputNumber] = useState(false);
  const [routeText, setRouteText] = useState("");

  useEffect(() => {
    let application = {};
    if (props.addData.dateOfLoad) {
      application = customerOrders.find((app) => app.orderId == elem._id);
    }
    let route = elem.idLoadingPoint.concat(elem.idUnloadingPoint);
    let numberOfLoading = elem.idLoadingPoint.length;
    let routeText = "";
    route.forEach((element, index) => {
      let city = findValueBy_Id(element, citiesList).value;
      routeText = routeText + " - " + city;
      if (index < numberOfLoading && props.addData.dateOfLoad && application) {
        let date = new Date(application.dateOfLoading[index]);
        routeText = routeText + " погрузка " + dateLocal(date);
      }
      console.log(index, numberOfLoading, application);
    });
    routeText = routeText.slice(2);
    setRouteText(routeText);
  }, [props.addData]);

  let driverText = findValueBy_Id(elem.idTrackDriver, driver).name;
  if (driverText == undefined) driverText = "";
  const trackObj = findValueBy_Id(elem.idTrack, track);

  const [strOder, setStrOder] = useState({
    strRoute: `Перевозка по маршруту ${routeText} водитель ${driverText} ${
      trackObj.model ? " а/м " + trackObj.model : ""
    } ${trackObj.value ? trackObj.value : ""} `,
    numberOfShipments: 1,
  });
  useEffect(() => {
    let str = { ...strOder };
    str.strRoute = `Перевозка по маршруту ${routeText} водитель ${driverText} ${
      trackObj.model ? " а/м " + trackObj.model : ""
    } ${trackObj.value ? trackObj.value : ""} `;
    setStrOder(str);
  }, [routeText]);

  const handleDblClick = (e) => {
    console.log(e.currentTarget.cellIndex);
    if (e.currentTarget.cellIndex == 1) {
      setshowInputRoute(true);
      setShowInputNumber(false);
    }
    if (e.currentTarget.cellIndex == 2) {
      setshowInputRoute(false);
      setShowInputNumber(true);
    }
  };
  const handleChange = (e) => {
    let obj = { ...strOder };
    if (showInputRoute) obj.strRoute = e.currentTarget.value;
    if (showInputNumber) obj.numberOfShipments = Number(e.currentTarget.value);
    setStrOder(obj);
  };
  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      setshowInputRoute(false);
      setShowInputNumber(false);
      props.getStrText(strOder, index);
    }
  };
  useEffect(() => {
    if (props.strObj != null) {
      let obj = { ...strOder };
      obj = props.strObj;
      setStrOder(obj);
    }
  }, [props.strObj]);
  useEffect(() => {
    console.log(strOder);
    let { ...obj } = strOder;
    obj.strRoute = `Перевозка по маршруту ${routeText} водитель ${driverText} ${
      trackObj.model ? " а/м " + trackObj.model : ""
    } ${trackObj.value ? trackObj.value : ""}  ${
      trackObj.trackTrailerLicensePlate && props.addData.trackTrailer
        ? " прицеп " + trackObj.trackTrailerLicensePlate
        : ""
    } ${
      elem.applicationNumber !== null && props.addData.aplication
        ? "по заявке № " + elem.applicationNumber
        : ""
    } ${props.addData.wayBill ? "ТТН № " + props.addData.wayBillNumber : ""} ${
      props.addData.contract && customerContract !== null
        ? " по договору № " + customerContract
        : ""
    }`;
    setStrOder(obj);
  }, [props.addData]);

  return (
    <tr style={{ textAlign: "center", fontSize: "10", lineHeight: 1 }}>
      <td style={{ border: "1px solid black" }}>{index + 1}</td>
      <td
        style={{ border: "1px solid black", textAlign: "left" }}
        onDoubleClick={handleDblClick}
      >
        {showInputRoute ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strOder.strRoute}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strOder.strRoute
        )}
      </td>
      <td style={{ border: "1px solid black" }} onDoubleClick={handleDblClick}>
        {showInputNumber ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strOder.numberOfShipments}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strOder.numberOfShipments
        )}
      </td>
      <td style={{ border: "1px solid black" }}>шт</td>
      <td style={{ border: "1px solid black" }}>
        {Number(elem.customerPrice) / strOder.numberOfShipments}
      </td>
      <td style={{ border: "1px solid black" }}>{elem.customerPrice}</td>
    </tr>
  );
};
