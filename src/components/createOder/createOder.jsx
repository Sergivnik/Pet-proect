import React from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./createOder.sass";

let driverlist = [
  { id: 1, value: "Вася" },
  { id: 2, value: "Коля" },
  { id: 3, value: "Паша" },
  { id: 4, value: "Володя" },
  { id: 5, value: "Рома" },
];

let oderslist = [
  { id: 1, value: "Айрон" },
  { id: 2, value: "Алипаша" },
  { id: 3, value: "ДМК" },
  { id: 4, value: "Норма" },
  { id: 5, value: "Сталь-инвест" },
];

let citieslist = [
  { id: 1, value: "Таганрог" },
  { id: 2, value: "Ростов" },
  { id: 3, value: "Новошахтинск" },
  { id: 4, value: "Батайск" },
  { id: 5, value: "Краснодар" },
];

export const CreateOder = () => {
  const setValue = () => {};
  return (
    <form className="createOderForm">
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
    </form>
  );
};
