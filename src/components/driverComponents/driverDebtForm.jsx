import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DriverDebtTr } from "./driverDebtTr.jsx";
import { DriverDebtCreate } from "./driverDebtCreate.jsx";
import { getDataDriverDebt } from "../../actions/driverActions.js";
import "./driverForms.sass";

export const DriverDebtForm = () => {
  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const driverDebtList = useSelector(
    (state) => state.oderReducer.driverDebtList
  );

  const [showCreateDebt, setShowCreateDebt] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    dispatch(getDataDriverDebt());
  }, [dispatch]);

  const handleClickBtn = () => {
    setShowCreateDebt(!showCreateDebt);
    setShowSaveBtn(!showSaveBtn);
  };
  const sentDebt = (data) => {
    console.log(data);
  };

  return (
    <div className="driverDebtMainDiv">
      <table className="driverDebtMainTable">
        <thead className="driverDebtMainHeader">
          <tr className="driverDebtMainHeaderTr">
            <td className="driverDebtMainHeaderTd">Дата</td>
            <td className="driverDebtMainHeaderTd">Перевозчик</td>
            <td className="driverDebtMainHeaderTd">Категория</td>
            <td className="driverDebtMainHeaderTd">Сумма</td>
            <td className="driverDebtMainHeaderTd">Примечание</td>
            <td className="driverDebtMainHeaderTd">Долг закрыт</td>
          </tr>
        </thead>
        <tbody>
          {driverDebtList.map((elem) => {
            return <DriverDebtTr key={elem.id} debtData={elem} />;
          })}
          {showCreateDebt && (
            <DriverDebtCreate driversList={driversList} sentDebt={sentDebt} />
          )}
        </tbody>
      </table>
      {showSaveBtn ? (
        <button className="driverDebtBtn" onClick={handleClickBtn}>
          Сохранить
        </button>
      ) : (
        <button className="driverDebtBtn" onClick={handleClickBtn}>
          Добавить
        </button>
      )}
    </div>
  );
};
