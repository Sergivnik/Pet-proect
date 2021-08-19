import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DriverDebtTr } from "./driverDebtTr.jsx";
import { DriverDebtCreate } from "./driverDebtCreate.jsx";
import {
  getDataDriverDebt,
  addDataDriverDebt,
  delDataDriverDebt,
} from "../../actions/driverActions.js";
import "./driverForms.sass";

export const DriverDebtForm = () => {
  useEffect(() => {
    let div = document.getElementsByClassName("driverDebtTableDiv")[0];
    console.log(div.scrollHeight);
    div.scrollTop = div.scrollHeight;
  }, [driverDebtList]);
  const categoryList = [
    { _id: 1, value: "Топливо" },
    { _id: 2, value: "Проценты" },
    { _id: 3, value: "Пинк" },
    { _id: 4, value: "Аванс" },
    { _id: 5, value: "Прочее" },
  ];
  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const driverDebtList = useSelector(
    (state) => state.oderReducer.driverDebtList
  );

  const [showCreateDebt, setShowCreateDebt] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [dataNewDebt, setDataNewDebt] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getDataDriverDebt());
  }, [dispatch]);

  const handleClickBtn = () => {
    setShowCreateDebt(!showCreateDebt);
    setShowSaveBtn(!showSaveBtn);
  };
  const sentDebt = (data) => {
    if (data.idDebtClosed == null) {
      data.idDebtClosed = 2;
      data.debtClosedValue = "нет";
    }
    setDataNewDebt(data);
  };
  const handleClickSaveBtn = () => {
    dispatch(addDataDriverDebt(dataNewDebt));
    setShowCreateDebt(!showCreateDebt);
    setShowSaveBtn(!showSaveBtn);
  };
  const handleCliclTr = (id) => {
    if (id) {
      setShowDeleteBtn(true);
    } else {
      setShowDeleteBtn(false);
    }
    setDeleteId(id);
  };
  const handleClickDeleteBtn = () => {
    setShowDeleteBtn(false);
    dispatch(delDataDriverDebt(deleteId));
  };

  return (
    <div className="driverDebtMainDiv">
      <div className="driverDebtTableDiv">
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
              return (
                <DriverDebtTr
                  key={elem.id}
                  debtData={elem}
                  handleCliclTr={handleCliclTr}
                  deleteId={deleteId}
                  categoryList={categoryList}
                />
              );
            })}
            {showCreateDebt && (
              <DriverDebtCreate
                key="tempIdKey"
                driversList={driversList}
                sentDebt={sentDebt}
                categoryList={categoryList}
              />
            )}
          </tbody>
        </table>
      </div>
      {showSaveBtn ? (
        <button className="driverDebtBtn" onClick={handleClickSaveBtn}>
          Сохранить
        </button>
      ) : (
        <button className="driverDebtBtn" onClick={handleClickBtn}>
          Добавить
        </button>
      )}
      {showDeleteBtn && (
        <button className="driverDebtBtn" onClick={handleClickDeleteBtn}>
          Удалить
        </button>
      )}
    </div>
  );
};
