import React, { useState } from "react";
import { ChoiseList } from "./components/choiseList/choiseList.jsx";
import "./app.sass";
import { TdUser } from "./components/tdUser/tdUser.jsx";

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
          <tr>
            <TdUser />
            <TdUser />
            <TdUser />
            <TdUser />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
