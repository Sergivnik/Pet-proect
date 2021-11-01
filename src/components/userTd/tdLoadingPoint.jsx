import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

export const TdLoadingPoint = (props) => {
  const dispatch = useDispatch();
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [pointLoadInfo, setPointLoadingInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editCityIndex, setEditCityIndex] = useState(null);

  const getValue = (id, arrObj) => {
    if (id) {
      let value = arrObj.find((elem) => elem._id == id);
      return value.value;
    }
  };
  const handleMouseOver = (e) => {
    if (props.loadingInfo) {
      if (props.loadingInfo.length > 0)
        setPointLoadingInfo(props.loadingInfo[e.currentTarget.id]);
    }
  };
  const handleMouseLeave = () => {
    setPointLoadingInfo(null);
  };
  const handleDBLClick = (e) => {
    setEditCityIndex(Number(e.currentTarget.id));
    let element = e.currentTarget.parentElement.parentElement;
    if (props.edit) {
      setShowEdit(true);
      element.parentElement.style.backgroundColor = "#fff";
      setCurrentId(element.parentElement.id);
    }
  };
  const setValue = (data) => {
    let arr = props.idLoadingPoint;
    arr[data.index] = data._id;
    console.log(currentId, "oders", arr);
    dispatch(editOder(currentId, "loadingPoint", arr));
    setShowEdit(false);
    setCurrentId(null);
  };
  const handleESC = (e) => {
    if (e.code == "Escape") {
      setShowEdit(false);
      setCurrentId(null);
    }
  };

  useEffect(() => {
    if (props.currentTR != currentId) {
      setShowEdit(false);
      setCurrentId(null);
    }
  }, [props.currentTR]);

  return (
    <td className="userTd" onKeyDown={handleESC}>
      {pointLoadInfo && <div className="oderTdTooltip">{pointLoadInfo}</div>}
      {props.idLoadingPoint.map((idCity, index) =>
        showEdit ? (
          <div className="divChoise" key={`ChoiseList-${index}`}>
            <ChoiseList
              name="loadingPoint"
              parent="oders"
              arrlist={citieslist}
              setValue={setValue}
              index={editCityIndex}
            />
          </div>
        ) : (
          <div className="odersDivP" key={`divLP-${index}`}>
            <p
              className="odersP"
              id={index}
              onDoubleClick={handleDBLClick}
              //onContextMenu={props.handleContext}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {getValue(idCity, citieslist)}
            </p>
          </div>
        )
      )}
    </td>
  );
};
