import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./driverForms.sass";
import { dateLocal } from "../myLib/myLib";

export const DriverPaymentTr = (props) => {
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const customerList = useSelector((state) => state.oderReducer.clientList);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  const [classNameTr, setClassNameTr] = useState("driverDebtMainTd");
  let elem = props.elem;

  const getDriverValueById = (id) => {
    let driver = driversList.find((item) => item._id == id);
    return driver.value;
  };
  const getCustomerValueById = (id) => {
    if (id != null) {
      let customer = customerList.find((item) => item._id == id);
      return customer.value;
    }
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

  const handleClickTr = (e) => {
    if (e.target.tagName == "TD") {
      if (classNameTr == "driverDebtMainTd") {
        setClassNameTr("driverDebtMainTd driverDebtMark");
      } else {
        setClassNameTr("driverDebtMainTd");
      }
      props.choiseOders(elem._id, Number(elem.driverPrice));
    }
  };
  return (
    <React.Fragment>
      <tr className={classNameTr} onClick={handleClickTr}>
        <td className="driverDebtMainTr">{dateLocal(elem.date)}</td>
        <td className="driverDebtMainTr">
          {getDriverValueById(elem.idDriver)}
        </td>
        <td className="driverDebtMainTr">
          {getCustomerValueById(elem.idCustomer)}
        </td>
        <td className="driverDebtMainTr">
          {getRouteByIdCites(elem.idLoadingPoint)}
        </td>
        <td className="driverDebtMainTr">
          {getRouteByIdCites(elem.idUnloadingPoint)}
        </td>
        <td className="driverDebtMainTr">{elem.driverPrice}</td>
        <td className="driverDebtMainTr">{elem.document}</td>
        <td className="driverDebtMainTr">{elem.accountNumber}</td>
      </tr>
    </React.Fragment>
  );
};
