import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { addOder } from "../../actions/oderActions.js";
import "./createOder.sass";

export const CreateOder = (props) => {
  const driverlist = useSelector((state) => state.oderReducer.driverlist);
  const oderslist = useSelector((state) => state.oderReducer.clientList);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  const customerlist = useSelector((state) => state.oderReducer.odersList);
  const dispatch = useDispatch();
  const [clearLoadingPoint, setClearLoadingPoint] = useState(true);
  const [clearUnloadingPoint, setClearUnloadingPoint] = useState(true);
  const [tempData, setTempData] = useState({
    _id: customerlist[customerlist.length - 1]._id + 1,
  });

  const [tempLoadingPoint, setTempLoadingPoint] = useState([]);
  const [tempUnloadingPoint, setTempUnloadingPoint] = useState([]);

  //const tempData = { _id: customerlist[customerlist.length - 1]._id + 1 };
  const setValue = (value) => {
    if (value.field === "driver") {
      let { ...obj } = tempData;
      obj.driverID = value._id;
      setTempData(obj);
    }
    if (value.field === "oders") {
      let { ...obj } = tempData;
      obj.odersID = value._id;
      setTempData(obj);
    }
    if (value.field === "loadingPoint") {
      let { ...obj } = tempData;
      if (obj.loadingPointID) obj.loadingPointID.push(value._id);
      else obj.loadingPointID = [value._id];
      setTempData(obj);
      setClearLoadingPoint(false);
      let [...arr] = tempLoadingPoint;
      arr.push(value.value);
      setTempLoadingPoint(arr);
    }
    if (value.field === "unloadingPoint") {
      let { ...obj } = tempData;
      if (obj.unloadingPointID) obj.unloadingPointID.push(value._id);
      else obj.unloadingPointID = [value._id];
      setTempData(obj);
      setClearUnloadingPoint(false);
      let [...arr] = tempUnloadingPoint;
      arr.push(value.value);
      setTempUnloadingPoint(arr);
    }
  };

  const onAddLoadingPoint = () => {
    setClearLoadingPoint(true);
  };
  const onAddUnloadingPoint = () => {
    setClearUnloadingPoint(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!tempData.loadingPointID.length) tempData.loadingPointID = null;
    if (!tempData.unloadingPointID.length) tempData.unloadingPointID = null;
    let data = {
      _id: tempData._id,
      date: event.target.elements.date.value,
      driver: tempData.driverID,
      oder: tempData.odersID,
      loadingPoint: tempData.loadingPointID,
      unloadingPoint: tempData.unloadingPointID,
      oderPrice: event.target.elements.oderPrice.value,
      driverPrice: event.target.elements.driverPrice.value,
    };
    dispatch(addOder(data));
    props.addOder();
  };
  const handlePushEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <form className="createOderForm" onSubmit={onSubmit}>
      <label htmlFor="date" className="createOderLabel">
        Дата
        <input name="date" type="date" onKeyDown={handlePushEnter} />
      </label>
      <label htmlFor="driver" className="createOderLabel">
        Водитель
        <ChoiseList name="driver" arrlist={driverlist} setValue={setValue} />
      </label>
      <label htmlFor="oders" className="createOderLabel">
        Заказчик
        <ChoiseList name="oders" arrlist={oderslist} setValue={setValue} />
      </label>
      <label htmlFor="loadingPoint" className="createOderLabel">
        Пункт загрузки
        {clearLoadingPoint ? (
          <ChoiseList
            name="loadingPoint"
            arrlist={citieslist}
            setValue={setValue}
          />
        ) : (
          <>
            <p className="createOderAddP">{tempLoadingPoint}</p>
            <input
              type="button"
              className="createOderAddBtn"
              onClick={onAddLoadingPoint}
              value="Добавить"
            />
          </>
        )}
      </label>
      <label htmlFor="unloadingPoint" className="createOderLabel">
        Пункт разгрузки
        {clearUnloadingPoint ? (
          <ChoiseList
            name="unloadingPoint"
            arrlist={citieslist}
            setValue={setValue}
          />
        ) : (
          <>
            <p className="createOderAddP">{tempUnloadingPoint}</p>
            <input
              type="button"
              className="createOderAddBtn"
              onClick={onAddUnloadingPoint}
              value="Добавить"
            />
          </>
        )}
      </label>
      <label htmlFor="oderPrice" className="createOderLabel">
        Цена клиента
        <input name="oderPrice" type="number" onKeyDown={handlePushEnter} />
      </label>
      <label htmlFor="driverPrice" className="createOderLabel">
        Цена водителя
        <input name="driverPrice" type="number" onKeyDown={handlePushEnter} />
      </label>
      <input type="submit" value="Send" />
    </form>
  );
};
