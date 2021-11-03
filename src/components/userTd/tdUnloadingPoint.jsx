import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { UserTdCityContext } from "../oders/userTdCityContext/userTdCityContext.jsx";

export const TdUnoadingPoint = (props) => {
  const dispatch = useDispatch();
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [pointUnloadInfo, setPointUnloadingInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editCityIndex, setEditCityIndex] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [pIndex, setPIndex] = useState(null);
  const [addPoint, setAddPoint] = useState(false);

  const getValue = (id, arrObj) => {
    if (id) {
      let value = arrObj.find((elem) => elem._id == id);
      return value.value;
    }
  };
  const handleMouseOver = (e) => {
    if (props.unLoadingInfo) {
      if (props.unLoadingInfo.length > 0)
        setPointUnloadingInfo(props.unLoadingInfo[e.currentTarget.id]);
    }
  };
  const handleMouseLeave = () => {
    setPointUnloadingInfo(null);
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
    let [...arr] = props.idUnloadingPoint;
    if (addPoint) {
      arr.push(data._id);
    } else {
      arr[data.index] = data._id;
    }
    dispatch(editOder(currentId, "unloadingPoint", arr));
    setShowEdit(false);
    setCurrentId(null);
    setAddPoint(false);
  };
  const handleContext = (e) => {
    if (props.edit) {
      e.preventDefault();
      props.getCurrentTR();
      let id = e.currentTarget.parentElement.parentElement.parentElement.id;
      setPIndex(e.currentTarget.id);
      setCurrentId(Number(id));
      setShowContextMenu(true);
    }
  };
  const hideContextMenu = () => {
    setShowContextMenu(false);
  };
  const handleClickAddCity = () => {
    setAddPoint(true);
    setShowContextMenu(false);
    setShowEdit(true);
  };

  useEffect(() => {
    if (props.currentTR != currentId) {
      setShowEdit(false);
      setCurrentId(null);
    }
  }, [props.currentTR]);
  useEffect(() => {
    const onKeypress = (e) => {
      if (showContextMenu) setShowContextMenu(false);
      if (showEdit) {
        setShowEdit(false);
        setCurrentId(null);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [showContextMenu, showEdit]);

  return (
    <td className="userTd">
      {pointUnloadInfo && (
        <div className="oderTdTooltip">{pointUnloadInfo}</div>
      )}
      {props.idUnloadingPoint.map((idCity, index) =>
        showEdit ? (
          <div className="divChoise" key={`ChoiseList-${index}`}>
            <ChoiseList
              name="unloadingPoint"
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
              onContextMenu={handleContext}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {getValue(idCity, citieslist)}
            </p>
            {showContextMenu &&
              currentId == props.currentTR &&
              pIndex == index && (
                <UserTdCityContext
                  loadingPointList={props.idUnloadingPoint}
                  hideContextMenu={hideContextMenu}
                  trId={currentId}
                  pId={pIndex}
                  colNumber={4}
                  handleClickAddCity={handleClickAddCity}
                />
              )}
          </div>
        )
      )}
    </td>
  );
};
