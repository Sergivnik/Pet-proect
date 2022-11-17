import React from "react";
import "./customerOrders.sass";

export const ManagerTHeader = (props) => {
  return (
    <thead className="managerOrderThead">
      <tr>
        <td className="managerOrderTd">{"Клиент"}</td>
        <td className="managerOrderTd">{"Погрузка"}</td>
        <td className="managerOrderTd">{"Выгрузка"}</td>
        <td className="managerOrderTd">{"Цена"}</td>
        <td className="managerOrderTd">{"Адрес погрузки"}</td>
        <td className="managerOrderTd">{"Адрес выгрузкм"}</td>
        <td className="managerOrderTd">{"Номер заявки"}</td>
        <td className="managerOrderTd">{"Особые условия"}</td>
      </tr>
    </thead>
  );
};
