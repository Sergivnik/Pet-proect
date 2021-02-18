import React, { useState } from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";

let driverlist = [
  { id: 1, driver: "Вася" },
  { id: 2, driver: "Василий" },
  { id: 3, driver: "Василиса" },
  { id: 4, driver: "Сергей" },
  { id: 5, driver: "Саша" },
];

export const TdUser = () => {
  const [showSearchField, setShowSearchField] = useState(false);
  const handleClick = () => {
    setShowSearchField(!showSearchField);
  };
  return (
    <React.Fragment>
      <td onClick={handleClick} width="100px" height="20px" className="apptd">
        {showSearchField && <ChoiseList arrlist={driverlist} />}
      </td>
    </React.Fragment>
  );
};
