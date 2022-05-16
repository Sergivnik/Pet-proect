import React, { useEffect, useState } from "react";
import "./specialTable.sass";

export const SpecialTableHeaderTr = () => {
  return (
    <tr>
      <td className="specialTableHeaderTd">Клиент</td>
      <td className="specialTableHeaderTd">Сумма</td>
      <td className="specialTableHeaderTd">Сейф</td>
      <td className="specialTableHeaderTd">Карта</td>
      <td className="specialTableHeaderTd">Счет</td>
      <td className="specialTableHeaderTd">Оплата заказа</td>
      <td className="specialTableHeaderTd">Оплата клиенту</td>
      <td className="specialTableHeaderTd">Дата</td>
    </tr>
  );
};
