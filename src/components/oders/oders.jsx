import React, { useEffect, useState } from "react";
import { CreateOder } from "../createOder/createOder.jsx";
import { useSelector } from "react-redux";
import "./oders.sass";

export const Oders = () => {
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const [showCreateOder, setShowCreateOder] = useState(false);
  const [oders, setOders] = useState(odersList);

  const handleClick = () => setShowCreateOder(!showCreateOder);
  const addOder = () => {
    setShowCreateOder(false);
  };
  useEffect(() => {
    setOders(odersList);
  }, [odersList]);

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
          {oders.map((elem) => {
            return (
              <tr key={elem.id}>
                <td>{elem.date}</td>
                <td>{elem.driver}</td>
                <td>{elem.oder}</td>
                <td>{elem.loadingPoint}</td>
                <td>{elem.unloadingPoint}</td>
                <td>{elem.oderPrice}</td>
                <td>{elem.driverPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCreateOder && <CreateOder addOder={addOder} />}
    </div>
  );
};
