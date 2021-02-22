import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Oders } from "./components/oders/oders.jsx";

export const App = () => {
  const [text, setText] = useState("Стартовая страница");

  setTimeout(() => setText("Обновленный React-компонент"), 1000);

  return (
    <div>
      {text}
      <Link to="/something">Something</Link>
      <Oders />
    </div>
  );
};
