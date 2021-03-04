import React, { useEffect, useState } from "react";
import { CreateOder } from "../createOder/createOder.jsx";
import { useSelector, useDispatch } from "react-redux";
import "./oders.sass";
import { getData } from "../../middlewares/initialState.js";

export const Oders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [showCreateOder, setShowCreateOder] = useState(false);
  const [oders, setOders] = useState(odersList);

  const handleClick = () => setShowCreateOder(!showCreateOder);
  const addOder = () => {
    setShowCreateOder(false);
  };
  useEffect(() => {
    setOders(odersList);
  }, [odersList]);

  const handleClickTR = (event) => {
    console.log(event.currentTarget.id);
    event.currentTarget.style.backgroundColor = "#ccc";
  };

  const handleDBLClick = (event) => {
    console.log(event.target);
    event.stopPropagation();
    event.target.parentElement.style.backgroundColor = "#fff";
    event.target.style.backgroundColor = "#ccc";
  };

  return (
    <React.Fragment>
      <div className="odersDiv">
        <table className="odersTable">
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
                <button className="odersTdBtn" onClick={handleClick}>
                  Саздать
                </button>
              </td>
            </tr>
          </thead>
          <tbody className="odersTbody">
            {oders.map((elem) => {
              let driver, oder, loadingPoint, unloadingPoint;
              elem.idDriver
                ? (driver = driversList.find(
                    (item) => item.id === elem.idDriver
                  ).value)
                : (driver = "");
              elem.idOder
                ? (oder = clientList.find((item) => item.id === elem.idOder)
                    .value)
                : (oder = "");
              elem.idLoadingPoint
                ? (loadingPoint = citieslist.find(
                    (item) => item.id === elem.idLoadingPoint
                  ).value)
                : (loadingPoint = "");
              elem.idUnloadingPoint
                ? (unloadingPoint = citieslist.find(
                    (item) => item.id === elem.idUnloadingPoint
                  ).value)
                : (unloadingPoint = "");
              return (
                <tr key={elem.id} id={elem.id} onClick={handleClickTR}>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {elem.date}
                  </td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {driver}
                  </td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {oder}
                  </td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {loadingPoint}
                  </td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {unloadingPoint}
                  </td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {elem.customerPrice}
                  </td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {elem.driverPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showCreateOder && <CreateOder addOder={addOder} />}
    </React.Fragment>
  );
};
