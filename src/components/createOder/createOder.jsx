import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { addOder } from "../../actions/oderActions.js";
import "./createOder.sass";

export const CreateOder = (props) => {
  const driverlist = useSelector((state) => state.oderReducer.driverlist);
  const oderslist = useSelector((state) => state.oderReducer.oderlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  const dispatch = useDispatch();
  const setValue = () => {};
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements);
    let data = {
      id: 3,
      date: event.target.elements.date.value,
      driver: event.target.elements.driver.value,
      oder: event.target.elements.oders.value,
      loadingPoint: event.target.elements.loadingPoint.value,
      unloadingPoint: event.target.elements.unloadingPoint.value,
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
