import React from "react";
import { useSelector } from "react-redux";

export const SomeComponent = () => {
  const user = useSelector((state) => state.oderReducer.currentUser);
  return <h1>SomeComponent {user.name}</h1>;
};
