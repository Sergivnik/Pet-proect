import React, { useEffect, useState } from "react";
import { editOder } from "../../../actions/oderActions.js";
import { useDispatch } from "react-redux";

export const UserTdCityContext = (props) => {
  const [stylePUp, setStylePUp] = useState({ color: "#000000" });
  const [stylePDown, setStylePDown] = useState({ color: "#000000" });
  const dispatch = useDispatch();

  //dispatch(editOder(37103, "loadingPoint", [1]));

  useEffect(() => {
    if (props.loadingPointList.length === 1) {
      setStylePUp({ color: "#bbbbbb" });
      setStylePDown({ color: "#bbbbbb" });
    }
    if (props.pId == 0) {
      setStylePUp({ color: "#bbbbbb" });
    }
    if (props.pId == props.loadingPointList.length - 1) {
      setStylePDown({ color: "#bbbbbb" });
    }
  }, [props.pId]);

  const handleClickDeleteCity = () => {
    let [...arr] = props.loadingPointList;
    arr.splice(props.pId, 1);
    dispatch(editOder(props.trId, "loadingPoint", arr));
  };

  return (
    <div className="odersDivContextMenu" style={props.coord}>
      <h4 className="odersContextH4">Выбрать действие</h4>
      <hr />
      <p className="odersContextP" onClick={props.handleClickAddCity}>
        Добавить место
      </p>
      <hr />
      <p className="odersContextP" style={stylePUp}>
        Поднять место
      </p>
      <hr />
      <p className="odersContextP" style={stylePDown}>
        Опустить место
      </p>
      <hr />
      <p className="odersContextP" onClick={handleClickDeleteCity}>
        Удалить место
      </p>
      <hr />
    </div>
  );
};
