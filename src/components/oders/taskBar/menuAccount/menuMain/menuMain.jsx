import React from "react";
import { DOMENNAME } from "../../../../../middlewares/initialState";
import "./menuMain.sass";

export const MenuMain = (props) => {
  const {
    handleClickSmallMenu,
    handleClickBtnDrop,
    showDropDownMenu,
    handleClickBtnMenu,
    showNewApps,
    numberApps,
    showVerticalMenu,
  } = props;
  return (
    <React.Fragment>
      <div className="smallMenu" onClick={handleClickSmallMenu}>
        <img src={`${DOMENNAME}/img/menu.png`} height="50" width="50" />
      </div>
      <div className="odersMenu">
        <button className="odersMenuBtn" onClick={handleClickBtnDrop}>
          Платежи
        </button>
        {showDropDownMenu && (
          <div className="dropDownMenu">
            <button
              name="customPay"
              className="odersDropMenuBtn"
              onClick={handleClickBtnMenu}
            >
              Поступление от поставщиков
            </button>
            <button
              name="customPayments"
              className="odersDropMenuBtn"
              onClick={handleClickBtnMenu}
            >
              Входящие платежы
            </button>
            <button
              name="driverPay"
              className="odersDropMenuBtn"
              onClick={handleClickBtnMenu}
            >
              Оплата переозчикам
            </button>
            <button
              name="driverPayments"
              className="odersDropMenuBtn"
              onClick={handleClickBtnMenu}
            >
              Платежи переозчикам
            </button>
            <button
              name="otherPay"
              className="odersDropMenuBtn"
              onClick={handleClickBtnMenu}
            >
              Расходы
            </button>
            <button
              name="post"
              className="odersDropMenuBtn"
              onClick={handleClickBtnMenu}
            >
              Почта
            </button>
          </div>
        )}

        <button
          name="driversDebt"
          className="odersMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Долг переозчиков
        </button>

        <button
          name="bill"
          className="odersMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Высавление счетов
        </button>
        <button
          name="dataEdit"
          className="odersMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Внесение данных
        </button>
        <button
          name="reports"
          className="odersMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Отчеты
        </button>
        <button
          name="customerApp"
          className="odersMenuBtn"
          onClick={handleClickBtnMenu}
        >
          {showNewApps ? `Заявки ${numberApps}` : "Заявки"}
        </button>
      </div>
      {showVerticalMenu && (
        <div className="odersMenuVertical">
          <button className="odersMenuBtn" onClick={handleClickBtnDrop}>
            Платежи
          </button>
          {showDropDownMenu && (
            <div className="dropDownMenu">
              <button
                name="customPay"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Поступление от поставщиков
              </button>
              <button
                name="customPayments"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Входящие платежы
              </button>
              <button
                name="driverPay"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Оплата переозчикам
              </button>
              <button
                name="otherPay"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Расходы
              </button>
            </div>
          )}

          <button
            name="driversDebt"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Долг переозчиков
          </button>

          <button
            name="bill"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Высавление счетов
          </button>
          <button
            name="dataEdit"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Внесение данных
          </button>
          <button
            name="reports"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Отчеты
          </button>
          <button
            name="customerApp"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Заявки
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
