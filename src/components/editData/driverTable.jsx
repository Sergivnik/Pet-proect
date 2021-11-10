import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./editData.sass";

export const DriverTable = (props) => {
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  return (
    <table className="driverTbl">
      <thead>
        <tr>
          <td className="driverTdHeader">Краткое название</td>
          <td className="driverTdHeader">Телефон</td>
          <td className="driverTdHeader">Полное название</td>
          <td className="driverTdHeader">ИНН</td>
          <td className="driverTdHeader">Адрес</td>
          <td className="driverTdHeader">Расчетный счет</td>
          <td className="driverTdHeader">Договор</td>
        </tr>
      </thead>
      <tbody className="driverTbody">
        {driversList.map((elem) => {
          return (
            <tr key={"driver" + elem._id}>
              <td className="driverTd">{elem.value}</td>
              <td className="driverTd"></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
