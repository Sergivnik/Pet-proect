import React from "react";
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
  const tempData = { id: customerlist[customerlist.length - 1].id + 1 };
  const setValue = (value) => {
    if (value.field === "driver") tempData.driverID = value.id;
    if (value.field === "oders") tempData.odersID = value.id;
    if (value.field === "loadingPoint") tempData.loadingPointID = value.id;
    if (value.field === "unloadingPoint") tempData.unloadingPointID = value.id;
  };
  const onSubmit = (event) => {
    event.preventDefault();
    let data = {
      id: tempData.id,
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
  return (
    <form className="createOderForm" onSubmit={onSubmit}>
      <label htmlFor="date" className="createOderLabel">
        Дата
        <input name="date" type="date" />
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
        <ChoiseList
          name="loadingPoint"
          arrlist={citieslist}
          setValue={setValue}
        />
      </label>
      <label htmlFor="unloadingPoint" className="createOderLabel">
        Пункт разгрузки
        <ChoiseList
          name="unloadingPoint"
          arrlist={citieslist}
          setValue={setValue}
        />
      </label>
      <label htmlFor="oderPrice" className="createOderLabel">
        Цена клиента
        <input name="oderPrice" type="number" />
      </label>
      <label htmlFor="driverPrice" className="createOderLabel">
        Цена водителя
        <input name="driverPrice" type="number" />
      </label>
      <input type="submit" value="Send" />
    </form>
  );
};
