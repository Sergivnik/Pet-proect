import React, { useState } from "react";
import { Oders } from "./components/oders/oders.jsx";
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
            <td>Дата</td>
            <td>Водитель</td>
            <td>Заказчик</td>
            <td>Загрузка</td>
            <td>Выгрузка</td>
          </tr>
          <Oders />
        </tbody>
      </table>
    </div>
  );
};
