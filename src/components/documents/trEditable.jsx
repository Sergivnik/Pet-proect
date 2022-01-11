import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";

import "./billsForm.sass";

export const TrEditable = (props) => {
  const elem = props.elem;
  const index = props.index;

  const citiesList = useSelector((state) => state.oderReducer.citieslist);
  const driver = useSelector((state) => state.oderReducer.trackdrivers);
  const track = useSelector((state) => state.oderReducer.tracklist);

  const [showInput, setShowInput] = useState(false);

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
  const [strOder, setStrOder] = useState(
    `Перевозка по маршруту ${routeText} водитель ${driverText} ${
      trackObj.model ? " а/м " + trackObj.model : ""
    } ${trackObj.value ? trackObj.value : ""}`
  );

  const handleDblClick = () => {
    setShowInput(true);
  };
  const handleChange = (e) => {
    setStrOder(e.currentTarget.value);
  };
  const handleEnter = (e) => {
    if (e.keyCode == 13) setShowInput(false);
  };

  return (
    <tr style={{ textAlign: "center", fontSize: "10", lineHeight: 1 }}>
      <td style={{ border: "1px solid black" }}>{index + 1}</td>
      <td
        style={{ border: "1px solid black", textAlign: "left" }}
        onDoubleClick={handleDblClick}
      >
        {showInput ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strOder}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strOder
        )}
      </td>
      <td style={{ border: "1px solid black" }}>1</td>
      <td style={{ border: "1px solid black" }}>шт</td>
      <td style={{ border: "1px solid black" }}>{elem.customerPrice}</td>
      <td style={{ border: "1px solid black" }}>{elem.customerPrice}</td>
    </tr>
  );
};
