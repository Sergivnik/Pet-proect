import React, { useEffect, useState } from "react";
import { CreateOder } from "../createOder/createOder.jsx";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../middlewares/initialState.js";
import { editOder, delOder, setProxy } from "../../actions/oderActions.js";
import "./oders.sass";

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
  const [oders, setOders] = useState(odersList.slice(-100));
  const [showDelete, setShowDelete] = useState(false);
  const [trId, setTrId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [colNumber, setColNumber] = useState(null);
  const [addData, setAddData] = useState(0);

  const handleClickProxy = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    setShowEdit(false);
    dispatch(editOder(e.target.parentElement.parentElement.id, "proxy", true));
  };
  const handleClickRadio = (e) => {
    setShowEdit(false);
    dispatch(
      editOder(trId, e.target.name, e.target.value == "yes" ? true : false)
    );
  };

  const onScroll = (event) => {
    console.log(event.target.scrollTop);
    if (event.target.scrollTop < 200) {
      setAddData(addData + 10);
      event.target.scrollTop = 300;
    }
    if (event.target.scrollTop > 1900) {
      setAddData(addData - 10);
      event.target.scrollTop = 1800;
    }
  };

  const handleClick = () => setShowCreateOder(!showCreateOder);
  const addOder = () => {
    setShowCreateOder(false);
  };
  useEffect(() => {
    let length = odersList.length;
    setOders(odersList.slice(length - 100 - addData, length - addData));
  }, [odersList, addData]);

  const handleClickTR = (event) => {
    if (event.target.tagName == "TD") {
      setTrId(event.currentTarget.id);
      event.currentTarget.style.backgroundColor = "#ccc";
      setShowDelete(true);
    }
  };

  const handleDBLClick = (event) => {
    event.stopPropagation();
    setColNumber(event.target.cellIndex);
    event.target.parentElement.style.backgroundColor = "#fff";
    setShowDelete(false);
    setShowEdit(true);
  };

  const handleClickDelete = () => {
    dispatch(delOder(trId));
  };

  const handleChange = (event) => {
    setShowEdit(false);
    dispatch(editOder(trId, event.target.name, event.target.value));
  };

  const handleEnter = (event) => {
    if (event.keyCode == 13) {
      setShowEdit(false);
      dispatch(editOder(trId, event.target.name, event.target.value));
    }
  };

  const setValue = (value) => {
    dispatch(editOder(trId, value.field, value.id));
    setShowEdit(false);
  };

  return (
    <React.Fragment>
      <div className="odersDiv" onScroll={onScroll}>
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
              let driver, customer, loadingPoint, unloadingPoint, proxyValue;
              elem.idDriver
                ? (driver = driversList.find(
                    (item) => item.id === elem.idDriver
                  ).value)
                : (driver = "");
              elem.idOder
                ? (customer = clientList.find((item) => item.id === elem.idOder)
                    .value)
                : (customer = "");
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
                  {/* Column Data */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 0 ? (
                      <input
                        name="date"
                        type="date"
                        value={elem.date}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                      />
                    ) : (
                      elem.date
                    )}
                  </td>
                  {/* Column Driver */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 1 ? (
                      <div className="divChoise">
                        <ChoiseList
                          name="driver"
                          arrlist={driversList}
                          setValue={setValue}
                        />
                      </div>
                    ) : (
                      driver
                    )}
                  </td>
                  {/* Column Customer */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 2 ? (
                      <div className="divChoise">
                        <ChoiseList
                          name="oders"
                          arrlist={clientList}
                          setValue={setValue}
                        />
                      </div>
                    ) : (
                      customer
                    )}
                  </td>
                  {/* Column LoadingPoint */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 3 ? (
                      <div className="divChoise">
                        <ChoiseList
                          name="loadingPoint"
                          arrlist={citieslist}
                          setValue={setValue}
                        />
                      </div>
                    ) : (
                      loadingPoint
                    )}
                  </td>
                  {/* Column UnloadingPoint */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 4 ? (
                      <div className="divChoise">
                        <ChoiseList
                          name="unloadingPoint"
                          arrlist={citieslist}
                          setValue={setValue}
                        />
                      </div>
                    ) : (
                      unloadingPoint
                    )}
                  </td>
                  {/* Column Customer Price */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 5 ? (
                      <input
                        name="oderPrice"
                        type="number"
                        onKeyDown={handleEnter}
                      />
                    ) : (
                      elem.customerPrice
                    )}
                  </td>
                  {/* Column Driver Price */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && elem.id == trId && colNumber == 6 ? (
                      <div className="divChoise">
                        <input
                          name="driverPrice"
                          type="number"
                          onKeyDown={handleEnter}
                        />
                      </div>
                    ) : (
                      elem.driverPrice
                    )}
                  </td>
                  {/* Column Check Proxy */}
                  <td className="odersTd" onDoubleClick={handleDBLClick}>
                    {showEdit && colNumber == 7 && elem.id == trId ? (
                      !elem.proxy ? (
                        <button
                          className="odersTdBtn"
                          onClick={handleClickProxy}
                        >
                          Печать
                        </button>
                      ) : (
                        <div>
                          <span>
                            <input
                              type="radio"
                              name="proxy"
                              value="yes"
                              onChange={handleClickRadio}
                            />
                            Ок
                          </span>
                          <span>
                            <input
                              type="radio"
                              name="proxy"
                              value="no"
                              onChange={handleClickRadio}
                            />
                            Нет
                          </span>
                        </div>
                      )
                    ) : elem.proxy ? (
                      "Ок"
                    ) : (
                      "Нет"
                    )}
                  </td>
                  {/* Button Delete */}
                  {showDelete && elem.id == trId && (
                    <td>
                      <button
                        className="odersTdBtn"
                        onClick={handleClickDelete}
                      >
                        Delete
                      </button>
                    </td>
                  )}
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
