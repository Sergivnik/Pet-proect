import React, { useEffect, useState } from "react";
import { UserThead } from "./userThead.jsx";
import { UserTr } from "./userTr.jsx";
import { CreateOder } from "../createOder/createOder.jsx";
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
    dispatch(setProxy(e.target.parentElement.parentElement.id));
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
          <UserThead handleClick={handleClick} />
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
                <UserTr
                  key={elem.id}
                  elem={elem}
                  handleClickTR={handleClickTR}
                  handleDBLClick={handleDBLClick}
                  showEdit={showEdit}
                  driver={driver}
                  customer={customer}
                  loadingPoint={loadingPoint}
                  unloadingPoint={unloadingPoint}
                  showDelete={showDelete}
                  handleClickDelete={handleClickDelete}
                  handleClickProxy={handleClickProxy}
                  colNumber={colNumber}
                  trId={trId}
                  handleClickRadio={handleClickRadio}
                  handleChange={handleChange}
                  handleEnter={handleEnter}
                  setValue={setValue}
                  clientList={clientList}
                  driversList={driversList}
                  citieslist={citieslist}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {showCreateOder && <CreateOder addOder={addOder} />}
    </React.Fragment>
  );
};
