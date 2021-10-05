import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataConstractorst } from "../../actions/constractorActions.js";

export const ConstractorsPayments = () => {
  const dispatch = useDispatch();
  const constractorsList = useSelector(
    (state) => state.oderReducer.constractorsList
  );
  const constractorsPayments = useSelector(
    (state) => state.oderReducer.constractorsPayments
  );
  
  useEffect(() => {
    dispatch(getDataConstractorst());
  }, [dispatch]);

  return <div>Other spends{constractorsPayments}{constractorsList}</div>;
};
