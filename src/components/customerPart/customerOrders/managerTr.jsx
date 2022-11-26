import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./customerOrders.sass";

export const ManagerTr = (props) => {
  let elem = props.elem;
  const customerclients = useSelector(
    (state) => state.customerReducer.customerclients
  );
  const citiesList = useSelector((state) => state.customerReducer.citiesList);

  const client = customerclients.find(
    (customer) => customer._id == elem.customerClientId
  );

  const isChosenStyle = (id) => {
    if (id == props.currentId) return "grey";
    if (id != props.currentId) return "white";
  };

  const getPoint = (id) => {
    let point = citiesList.find((point) => point._id == id);
    return point ? point.value : null;
  };
  const handleClickTr = () => {
    props.onClick(props.elem._id);
  };
  const dandleDblClickTR = () => {
    props.onDoubleClick(props.elem._id);
  };
  return (
    <tr
      className={isChosenStyle(props.elem._id)}
      onClick={handleClickTr}
      onDoubleClick={dandleDblClickTR}
    >
      <td className="managerOrderTd">{client ? client.name : null}</td>
      <td className="managerOrderTd">
        {elem.idLoadingPoint.map((poitId, index) => {
          return (
            <p key={`pointKey${poitId}-${index}`} className="managerOrderTdP">
              {getPoint(poitId)}
            </p>
          );
        })}
      </td>
      <td className="managerOrderTd">
        {elem.idUnloadingPoint.map((poitId, index) => {
          return (
            <p key={`pointKey${poitId}-${index}`} className="managerOrderTdP">
              {getPoint(poitId)}
            </p>
          );
        })}
      </td>
      <td className="managerOrderTd">
        {Number(elem.customerPrice).toLocaleString()}
      </td>
      <td className="managerOrderTd">
        {elem.loadingText.map((poitInfo, index) => {
          return (
            <p key={`pointKey${poitInfo}-${index}`} className="managerOrderTdP">
              {poitInfo}
            </p>
          );
        })}
      </td>
      <td className="managerOrderTd">
        {elem.unloadingText.map((poitInfo, index) => {
          return (
            <p key={`pointKey${poitInfo}-${index}`} className="managerOrderTdP">
              {poitInfo}
            </p>
          );
        })}
      </td>
      <td className="managerOrderTd">{elem.applicationNumber}</td>
      <td className="managerOrderTd">{elem.textInfo}</td>
    </tr>
  );
};
