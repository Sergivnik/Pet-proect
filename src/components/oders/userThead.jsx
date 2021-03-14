import React from "react";

export const UserThead = (props) => {
  return (
    <thead>
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
          <button className="odersTdBtn" onClick={props.handleClick}>
            Саздать
          </button>
        </td>
      </tr>
    </thead>
  );
};
