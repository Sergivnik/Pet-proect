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

  const setValue = () => {};
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
          <input className={classInput} type="date" />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Контрагент</span>
          <ChoiseList
            className="contrPayAddMainDiv"
            name="contractor"
            arrlist={props.constractorsList}
            setValue={setValue}
          />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Сумма</span>
          <input className={classInput} type="number" />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Учет в налогах</span>
          <ChoiseList
            className="contrPayAddMainDiv"
            name="tax"
            arrlist={[
              { _id: 1, value: "Да" },
              { _id: 2, value: "нет" },
            ]}
            setValue={setValue}
          />
        </div>
        <div className="contrPayAddMainDiv">
          <span>Примечание</span>
          <input className={classInput} type="text" />
        </div>
      </main>
    </div>
  );
};
