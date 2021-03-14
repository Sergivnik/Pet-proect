import React from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";

export const UserTr = (props) => {
  return (
    <tr id={props.elem.id} onClick={props.handleClickTR}>
      {/* Column Data */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 0 ? (
          <input
            name="date"
            type="date"
            value={props.elem.date}
            onChange={props.handleChange}
            onKeyDown={props.handleEnter}
          />
        ) : (
          props.elem.date
        )}
      </td>
      {/* Column Driver */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 1 ? (
          <div className="divChoise">
            <ChoiseList
              name="driver"
              arrlist={props.driversList}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.driver
        )}
      </td>
      {/* Column Customer */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 2 ? (
          <div className="divChoise">
            <ChoiseList
              name="oders"
              arrlist={props.clientList}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.customer
        )}
      </td>
      {/* Column LoadingPoint */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 3 ? (
          <div className="divChoise">
            <ChoiseList
              name="loadingPoint"
              arrlist={props.citieslist}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.loadingPoint
        )}
      </td>
      {/* Column UnloadingPoint */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 4 ? (
          <div className="divChoise">
            <ChoiseList
              name="unloadingPoint"
              arrlist={props.citieslist}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.unloadingPoint
        )}
      </td>
      {/* Column Customer Price */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 5 ? (
          <input name="oderPrice" type="number" onKeyDown={props.handleEnter} />
        ) : (
          props.elem.customerPrice
        )}
      </td>
      {/* Column Driver Price */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem.id == props.trId &&
        props.colNumber == 6 ? (
          <div className="divChoise">
            <input
              name="driverPrice"
              type="number"
              onKeyDown={props.handleEnter}
            />
          </div>
        ) : (
          props.elem.driverPrice
        )}
      </td>
      {/* Column Check Proxy */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.colNumber == 7 &&
        props.elem.id == props.trId ? (
          !props.elem.proxy ? (
            <button className="odersTdBtn" onClick={props.handleClickProxy}>
              Доверенность
            </button>
          ) : (
            <div>
              <span>
                <input
                  type="radio"
                  name="proxy"
                  value="yes"
                  onChange={props.handleClickRadio}
                />
                Ок
              </span>
              <span>
                <input
                  type="radio"
                  name="proxy"
                  value="no"
                  onChange={props.handleClickRadio}
                />
                Нет
              </span>
            </div>
          )
        ) : props.elem.proxy ? (
          "Ок"
        ) : (
          "Нет"
        )}
      </td>
      {/* Button Delete */}
      {props.showDelete && props.elem.id == props.trId && (
        <td>
          <button className="odersTdBtn" onClick={props.handleClickDelete}>
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};
