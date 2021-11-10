import React, { useEffect, useState } from "react";
import "./editData.sass";

export const DriverTable = (props) => {
  return (
    <table className="driverTbl">
      <thead className="driverTblTr">
        <tr className="driverTblTr">
          <td>Краткое название</td>
          <td>Телефон</td>
          <td>Полное название</td>
          <td>ИНН</td>
          <td>Адрес</td>
          <td>Расчетный счет</td>
          <td>Договор</td>
        </tr>
      </thead>
    </table>
  );
};
