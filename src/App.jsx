import React, { useState } from "react";
import { ChoiseList } from "./components/choiseList/choiseList.jsx";
import "./app.sass";
import { TdUser } from "./components/tdUser/tdUser.jsx";

let driverlist = [
  { id: 1, driver: "Вася" },
  { id: 2, driver: "Василий" },
  { id: 3, driver: "Василиса" },
  { id: 4, driver: "Сергей" },
  { id: 5, driver: "Саша" },
];

export const App = () => {
  const [text, setText] = useState("Стартовая страница");

  setTimeout(() => setText("Обновленный React-компонент"), 1000);

  return (
    <div>
      {text}
      <table className="appTable">
        <tbody>
          <tr>
            <TdUser />
            <TdUser />
            <TdUser />
            <TdUser />
          </tr>
        </tbody>
      </table>
      <ChoiseList arrlist={driverlist} />
    </div>
  );
};
