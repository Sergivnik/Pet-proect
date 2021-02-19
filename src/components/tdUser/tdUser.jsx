import React, { useState } from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";

let driverlist = [
  { id: 1, driver: "Вася" },
  { id: 2, driver: "Василий" },
  { id: 3, driver: "Василиса" },
  { id: 4, driver: "Сергей" },
  { id: 5, driver: "Саша" },
];
let normDriverList = [];
driverlist.forEach((elem) => {
  normDriverList.push({ id: elem.id, name: elem.driver });
});

export const TdUser = () => {
  const [showSearchField, setShowSearchField] = useState(false);
  const [text, setText] = useState("");

  const handleClick = () => {
    setShowSearchField(!showSearchField);
  };

  const setValue = (value) => {
    setText(value);
    setShowSearchField(false);
  };
  return (
    <React.Fragment>
      <td onClick={handleClick} width="100px" height="20px" className="apptd">
        {text}
        {showSearchField && (
          <ChoiseList arrlist={normDriverList} setValue={setValue} />
        )}
      </td>
    </React.Fragment>
  );
};
