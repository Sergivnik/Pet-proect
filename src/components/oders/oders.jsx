import React, { useState } from "react";
import { TdUser } from "../tdUser/tdUser.jsx";
import { CreateOder } from "../createOder/createOder.jsx";
import "./oders.sass";

export const Oders = () => {
  const [showCreateOder, setShowCreateOder] = useState(false);
  const handleClick = () => setShowCreateOder(!showCreateOder);
  return (
    <div className="odersDiv">
      <table className="odersTable">
        <tbody>
          <tr className="odersTr">
            <td className="odersTd odersTRheader">Дата</td>
            <td className="odersTd odersTRheader">Водитель</td>
            <td className="odersTd odersTRheader">Заказчик</td>
            <td className="odersTd odersTRheader">Загрузка</td>
            <td className="odersTd odersTRheader">Выгрузка</td>
            <td className="odersTd odersTRheader">Цена клиента</td>
            <td className="odersTd odersTRheader">Цена водителя</td>
            <td className="odersTd odersTRheader">Доверенность</td>
            <td className="odersTd odersTRheader">Выполнен</td>
            <td className="odersTd odersTRheader">
              <button className="odersTdBtn" onClick={handleClick}>
                Саздать
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {showCreateOder && <CreateOder />}
    </div>
  );
};
