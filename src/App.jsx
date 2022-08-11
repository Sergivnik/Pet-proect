import React, { useState } from "react";
import { Link } from "react-router-dom";

export const App = () => {
  const [text, setText] = useState("Стартовая страница");

  setTimeout(() => setText("Обновленный React-компонент"), 1000);

  return (
    <div>
      {text}
      <Link to="/something">Something</Link>
      <Link to="/oders">Заказы</Link>
      <Link to="/auth">Вход</Link>
    </div>
  );
};
