import React, { useState } from "react";
import { Link } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Link to="/something">Something</Link>
      <Link to="/oders">Заказы</Link>
    </div>
  );
};
