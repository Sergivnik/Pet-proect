import React, { useEffect, useState } from "react";
import { UserThead } from "./userThead.jsx";
import { UserTr } from "./userTr.jsx";
import { CreateOder } from "../createOder/createOder.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getData, filterData } from "../../middlewares/initialState.js";
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

  const [oders, setOders] = useState(odersList.slice(-100));

  const [showCreateOder, setShowCreateOder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);

  const [trId, setTrId] = useState(null);
  const [colNumber, setColNumber] = useState(null);
  const [indexCity, setIndexCity] = useState(null);
  const [addData, setAddData] = useState(0);
  const [pId, setPId] = useState(null);
  const [filterList, setFilterList] = useState({
    date: [],
    driver: [],
    oder: [],
    cityLoading: [],
    cityUnloading: [],
    customerPrice: [],
    driverPrice: [],
    proxy: [],
    complited: [],
    documents: [],
    customerPayment: [],
    driverPayment: [],
  });

  const [coord, setCoord] = useState({ left: 0, top: 0 });

  useEffect(() => {
    let length = odersList.length;
    console.log(length);
    if (length > 100) {
      setOders(odersList.slice(length - 100 - addData, length - addData));
    } else {
      setOders(odersList);
    }
  }, [odersList, addData]);

  useEffect(() => {
    setAddData(0);
  }, [odersList]);

  const writeFilterList = (chosenList, name) => {
    let { ...arr } = filterList;
    switch (name) {
      case "Date":
        arr.date = chosenList;
        setFilterList(arr);
        let arrdate = [];
        let localDate = "";
        chosenList = chosenList.map((elem) => {
          arrdate = elem.split("-");
          localDate = `${arrdate[0]}-${Number(arrdate[1]) + 1}-${arrdate[2]}`;
          return localDate;
        });
        arr.date = chosenList;
        break;
      case "Driver":
        arr.driver = chosenList;
        setFilterList(arr);
        break;
      case "Customer":
        arr.oder = chosenList;
        setFilterList(arr);
        break;
      case "LoadingCity":
        arr.cityLoading = chosenList;
        setFilterList(arr);
        break;
      case "UnloadingCity":
        arr.cityUnloading = chosenList;
        setFilterList(arr);
        break;
      case "CustomerPrice":
        arr.customerPrice = chosenList;
        setFilterList(arr);
        break;
      case "DriverPrice":
        arr.driverPrice = chosenList;
        setFilterList(arr);
        break;
      case "Proxy":
        arr.proxy = chosenList;
        setFilterList(arr);
        break;
      case "Complited":
        arr.complited = chosenList;
        setFilterList(arr);
        break;
      case "Documents":
        arr.documents = chosenList;
        setFilterList(arr);
        break;
      case "CustomerPayment":
        arr.customerPayment = chosenList;
        setFilterList(arr);
        break;
      case "DriverPayment":
        arr.driverPayment = chosenList;
        setFilterList(arr);
        break;
      default:
        break;
    }
    dispatch(filterData(arr));
  };

  const handleContext = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
    handleContextCity(e);
    setPId(e.target.id);
    setColNumber(e.target.parentElement.parentElement.cellIndex);
    let coordelem = e.target.parentElement.getBoundingClientRect();
    setCoord({ left: e.clientX - coordelem.x, top: e.clientY - coordelem.y });
  };

  const handleClickProxy = (e) => {
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
    let length = odersList.length;
    if (event.target.scrollTop < 200) {
      if (addData < length - 110) {
        setAddData(addData + 10);
        event.target.scrollTop = 300;
      }
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

  const handleContextCity = (e) => {
    if (e.target.tagName == "P") {
      setTrId(e.target.parentElement.parentElement.parentElement.id);
    }
  };

  const handleClickTR = (event) => {
    if (event.target.tagName == "TD") {
      setTrId(event.currentTarget.id);
      event.currentTarget.style.backgroundColor = "#ccc";
      setShowDelete(true);
      setShowAddCity(false);
    }
    if (event.target.tagName == "P") {
      setTrId(event.currentTarget.id);
      event.currentTarget.style.backgroundColor = "#ccc";
      setShowDelete(true);
      setShowAddCity(false);
    }
  };

  const handleDBLClick = (event) => {
    event.stopPropagation();
    if (event.target.localName === "td") {
      setColNumber(event.target.cellIndex);
      event.target.parentElement.style.backgroundColor = "#fff";
    }
    if (event.target.localName === "p") {
      setColNumber(event.target.parentElement.parentElement.cellIndex);
      setIndexCity(event.target.id);
      event.target.parentElement.parentElement.parentElement.style.backgroundColor =
        "#fff";
    }
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
    let data = [];
    switch (value.field) {
      case "loadingPoint":
        data = oders.find((item) => item._id == trId).idLoadingPoint;
        if (showAddCity) {
          data.push(value._id);
          setShowAddCity(false);
        } else {
          data[value.index] = value._id;
        }
        dispatch(editOder(trId, value.field, data));
        break;
      case "unloadingPoint":
        data = oders.find((item) => item._id == trId).idUnloadingPoint;
        if (showAddCity) {
          data.push(value._id);
          setShowAddCity(false);
        } else {
          data[value.index] = value._id;
        }
        dispatch(editOder(trId, value.field, data));
        break;
      default:
        dispatch(editOder(trId, value.field, value._id));
    }
    setShowEdit(false);
  };

  const handleClickAddCity = (e) => {
    e.stopPropagation();
    setShowContextMenu(false);
    setShowAddCity(true);
  };

  const hideContextMenu = () => {
    setShowContextMenu(false);
  };

  return (
    <React.Fragment>
      <div className="odersDivInfo">
        <p>check</p>
      </div>
      <div className="odersDiv" onScroll={onScroll}>
        <table className="odersTable">
          <UserThead
            handleClick={handleClick}
            filterList={filterList}
            writeFilterList={writeFilterList}
          />
          <tbody className="odersTbody">
            {oders.map((elem) => {
              let driver, customer;
              let loadingPoint,
                unloadingPoint = [];
              elem.idDriver
                ? (driver = driversList.find(
                    (item) => item._id === elem.idDriver
                  ).value)
                : (driver = "");
              elem.idCustomer
                ? (customer = clientList.find(
                    (item) => item._id === elem.idCustomer
                  ).value)
                : (customer = "");
              if (elem.idLoadingPoint) {
                loadingPoint = elem.idLoadingPoint.map((itemLP) => {
                  return citieslist.find((item) => item._id == itemLP).value;
                });
              } else {
                loadingPoint = [""];
              }
              if (elem.idUnloadingPoint) {
                unloadingPoint = elem.idUnloadingPoint.map((itemLP) => {
                  return citieslist.find((item) => item._id == itemLP).value;
                });
              } else {
                unloadingPoint = [""];
              }
              return (
                <UserTr
                  key={elem._id}
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
                  indexCity={indexCity}
                  handleContextCity={handleContextCity}
                  showContextMenu={showContextMenu}
                  pId={pId}
                  coord={coord}
                  handleContext={handleContext}
                  handleClickAddCity={handleClickAddCity}
                  showAddCity={showAddCity}
                  hideContextMenu={hideContextMenu}
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
