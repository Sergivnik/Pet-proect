import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";

import "./billsForm.sass";

export const TrEditable = (props) => {
  const elem = props.elem;
  const index = props.index;

  const citiesList = useSelector((state) => state.oderReducer.citieslist);
  const driver = useSelector((state) => state.oderReducer.trackdrivers);
  const track = useSelector((state) => state.oderReducer.tracklist);

  const [showInputRoute, setshowInputRoute] = useState(false);
  const [showInputNumber, setShowInputNumber] = useState(false);

  let route = elem.idLoadingPoint.concat(elem.idUnloadingPoint);
  let routeText = "";
  route.forEach((element) => {
    let city = findValueBy_Id(element, citiesList).value;
    routeText = routeText + " - " + city;
  });
  routeText = routeText.slice(2);
  let driverText = findValueBy_Id(elem.idTrackDriver, driver).name;
  if (driverText == undefined) driverText = "";
  const trackObj = findValueBy_Id(elem.idTrack, track);
  const [strOder, setStrOder] = useState({
    strRoute: `Перевозка по маршруту ${routeText} водитель ${driverText} ${
      trackObj.model ? " а/м " + trackObj.model : ""
    } ${trackObj.value ? trackObj.value : ""}`,
    numberOfShipments: 1,
  });

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
      props.getStrText(strOder);
    }
  };
  useEffect(() => {
    if (props.strObj != null) {
      let obj = { ...strOder };
      obj = props.strObj;
      setStrOder(obj);
    }
  }, [props.strObj]);

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
