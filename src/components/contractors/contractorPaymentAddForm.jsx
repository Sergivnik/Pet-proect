import React, { useEffect, useState } from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./contractorForm.sass";

export const ContractorAddForm = (props) => {
  const [classMainDiv, setClassMainDiv] = useState(
    "contrPayAddDiv contrPaySmallSize"
  );
  const [classCrossSvg, setClassCrossSvg] = useState(
    "contrPayAddHeaderCloseSvgSmall"
  );
  const [classInput, setClassInput] = useState(
    "contrPayInput contrPayAddFontSizeSmall"
  );

  const [paymentsData, setPaymentsData] = useState({
    idContractor: null,
    date: null,
    sum: null,
    category: null,
    addInfo: null,
  });

  useEffect(() => {
    setClassMainDiv("contrPayAddDiv contrPayNormalSize");
    setClassCrossSvg("contrPayAddHeaderCloseSvgNormall");
    setClassInput("contrPayInput contrPayAddFontSizeNormal");
  }, []);

  const handleClickClose = () => {
    setClassMainDiv("contrPayAddDiv contrPaySmallSize");
    setClassCrossSvg("contrPayAddHeaderCloseSvgSmall");
    setClassInput("contrPayInput contrPayAddFontSizeSmall");
    setTimeout(props.clickCross, 500);
  };

  const setValue = (e) => {
    let { ...obj } = paymentsData;
    if (e.target.name == "date") obj.date = e.target.value;
    if (e.target.name == "sum") obj.sum = e.target.value;
    if (e.target.name == "addInfo") obj.addInfo = e.target.value;
    setPaymentsData(obj);
  };
  const setValueFromList = (data) => {
    let { ...obj } = paymentsData;
    if (data.field == "contractor") obj.idContractor = data._id;
    if (data.field == "tax") obj.category = data._id;
    setPaymentsData(obj);
  };
  const handleClickAdd = () => {
    props.handleClickAdd(paymentsData);
  };
  return (
    <div className={classMainDiv}>
      <header className="contrPayAddHeader">
        <div className="contrPayAddHeaderText">
          Форма ввода платежа контрагену
        </div>
        <div className="contrPayAddHeaderClose">
          <svg className={classCrossSvg} onClick={handleClickClose}>
            <rect
              x="5%"
              y="48.5%"
              width="90%"
              height="10%"
              transform="rotate(45)"
            />
            <rect
              x="5%"
              y="48.5%"
              width="90%"
              height="10%"
              transform="rotate(-45)"
            />
          </svg>
        </div>
      </header>
      <main className="contrPayAddMain">
        <div className="contrPayAddMainDiv">
          <span>Дата платежа</span>
          <input
            className={classInput}
            name="date"
            type="date"
            onBlur={setValue}
          />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Контрагент</span>
          <ChoiseList
            className="contrPayAddMainDiv"
            name="contractor"
            arrlist={props.contractorsList}
            setValue={setValueFromList}
          />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Сумма</span>
          <input
            className={classInput}
            name="sum"
            type="number"
            onBlur={setValue}
          />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Учет в налогах</span>
          <ChoiseList
            className="contrPayAddMainDiv"
            name="tax"
            arrlist={[
              { _id: 1, value: "Да" },
              { _id: 2, value: "нет" },
              { _id: 3, value: "прочее" },
            ]}
            setValue={setValueFromList}
          />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Примечание</span>
          <input
            className={classInput}
            name="addInfo"
            type="text"
            onBlur={setValue}
          />
        </div>
      </main>
      <button onClick={handleClickAdd}>Добавить</button>
    </div>
  );
};
