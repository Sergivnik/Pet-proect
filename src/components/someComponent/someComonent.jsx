import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignOut } from "../../actions/auth";

export const SomeComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oderReducer.currentUser);
  const handleClick = () => {
    dispatch(authSignOut());
  };
  return (
    <h1>
      SomeComponent {user.name}
      <span onClick={handleClick}>Выйти</span>
    </h1>
  );
};
