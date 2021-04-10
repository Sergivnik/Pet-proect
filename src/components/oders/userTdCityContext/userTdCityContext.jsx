import React, { useEffect, useState } from "react";

export const UserTdCityContext = (props) => {
  const [stylePUp, setStylePUp] = useState({ color: "#000000" });
  const [stylePDown, setStylePDown] = useState({ color: "#000000" });
  useEffect(() => {
    if (props.loadingPointList.length === 1) {
      setStylePUp({ color: "#bbbbbb" });
      setStylePDown({ color: "#bbbbbb" });
    }
  }, [props.pId]);
  return (
    <div className="odersDivContextMenu" style={props.coord}>
      <h4 className="odersContextH4">Выбрать действие</h4>
      <hr />
      <p className="odersContextP">Добавить место</p>
      <hr />
      <p className="odersContextP" style={stylePUp}>
        Поднять место
      </p>
      <hr />
      <p className="odersContextP" style={stylePDown}>
        Опустить место
      </p>
      <hr />
      <p className="odersContextP">Удалить место</p>
      <hr />
    </div>
  );
};
