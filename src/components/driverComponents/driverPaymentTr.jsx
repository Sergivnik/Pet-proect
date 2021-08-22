import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./driverForms.sass";

export const DriverPaymentTr = (props) => {
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  let elem = props.elem;

  const getLocalDate = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const getDriverValueById = (id) => {
    let driver = driversList.find((item) => item._id == id);
    return driver.value;
  };
  const getRouteByIdCites = (arr) => {
    if (arr) {
      let str = "";
      arr.forEach((element) => {
        str = str + citieslist.find((item) => item._id == element).value;
      });
      return str;
    }
  };
  return (
    <React.Fragment>
      <tr>
        <td className="driverDebtMainTr">{getLocalDate(elem.date)}</td>
        <td className="driverDebtMainTr">
          {getDriverValueById(elem.idDriver)}
        </td>
        <td className="driverDebtMainTr">
          {getRouteByIdCites(elem.idLoadingPoint)}
        </td>
        <td className="driverDebtMainTr">
          {getRouteByIdCites(elem.idUnloadingPoint)}
        </td>
        <td className="driverDebtMainTr">{elem.driverPrice}</td>
        <td className="driverDebtMainTr">{elem.document}</td>
      </tr>
    </React.Fragment>
  );
};
