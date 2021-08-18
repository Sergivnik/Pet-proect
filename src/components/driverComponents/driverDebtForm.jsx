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
                />
              );
            })}
            {showCreateDebt && (
              <DriverDebtCreate
                key="tempIdKey"
                driversList={driversList}
                sentDebt={sentDebt}
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
