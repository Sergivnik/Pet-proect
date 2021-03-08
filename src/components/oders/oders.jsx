import React, { useEffect, useState } from "react";
import { CreateOder } from "../createOder/createOder.jsx";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../middlewares/initialState.js";
import { editOder, delOder } from "../../actions/oderActions.js";
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

  const onScroll = (event) => {
    console.log(event.target.scrollTop);
    if (event.target.scrollTop < 400) {
      setAddData(addData + 20);
      event.target.scrollTop = 500;
    }
    if (event.target.scrollTop > 2100) {
      setAddData(addData - 20);
      event.target.scrollTop = 2000;
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
              let driver, customer, loadingPoint, unloadingPoint;
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
                  <td className="odersTd" onDoubleClick={handleDBLClick}></td>
                  <td className="odersTd" onDoubleClick={handleDBLClick}></td>
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
