import React, { useState } from "react";
import { ChoiseList } from "./components/choiseList/choiseList.jsx";

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
      <ChoiseList arrlist={driverlist} />
    </div>
  );
};
