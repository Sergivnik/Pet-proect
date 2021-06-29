import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { UserTdCityContext } from "./userTdCityContext/userTdCityContext.jsx";

export const UserTr = (props) => {
  const accountList = useSelector(
    (state) => state.oderReducer.statusCustomerPay
  );
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const [oderId, setOderId] = useState(null);
  const [dateOfSubmission, setDateOfSubmission] = useState(null);
  const [dateOfPromise, setDateOfPromise] = useState(null);
  const [showFullSum, setShowFullSum] = useState(null);

  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const handleMouseOver = (e) => {
    let id = Number(e.target.parentElement.id);
    if (e.target.nodeName == "TD") {
      let oder = odersList.find((item) => item._id == id);
      if (oder.dateOfSubmission && e.target.cellIndex == 9) {
        setDateOfSubmission(DateStr(oder.dateOfSubmission));
        setOderId(id);
      }
      if (oder.dateOfPromise && e.target.cellIndex == 10) {
        setDateOfPromise(DateStr(oder.dateOfPromise));
        setOderId(id);
      }
      if (
        oder.customerPayment == "Частично оплачен" &&
        e.target.cellIndex == 5
      ) {
        setShowFullSum(true);
        setOderId(id);
      }
    }
  };
  const handleMouseLeave = () => {
    setOderId(null);
    setDateOfSubmission(null);
    setDateOfPromise(null);
    setShowFullSum(false);
  };

  return (
    <tr id={props.elem._id} onClick={props.handleClickTR}>
      {/* Column Data */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem._id == props.trId &&
        props.colNumber == 0 ? (
          <input name="date" type="date" onKeyDown={props.handleEnter} />
        ) : (
          DateStr(props.elem.date)
        )}
      </td>
      {/* Column Driver */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem._id == props.trId &&
        props.colNumber == 1 ? (
          <div className="divChoise">
            <ChoiseList
              name="driver"
              parent="oders"
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
        props.elem._id == props.trId &&
        props.colNumber == 2 ? (
          <div className="divChoise">
            <ChoiseList
              name="oders"
              parent="oders"
              arrlist={props.clientList}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.customer
        )}
      </td>
      {/* Column LoadingPoint */}
      <td className="odersTd">
        {props.loadingPoint.map((item, index) =>
          props.showEdit &&
          props.elem._id == props.trId &&
          props.colNumber == 3 &&
          props.indexCity == index ? (
            <div
              className="divChoise"
              key={`ChoiseList-${props.elem._id}-${index}`}
            >
              <ChoiseList
                name="loadingPoint"
                parent="oders"
                arrlist={props.citieslist}
                setValue={props.setValue}
                index={index}
              />
            </div>
          ) : (
            <div className="odersDivP" key={`divLP-${props.elem._id}-${index}`}>
              <p
                className="odersP"
                id={index}
                onDoubleClick={props.handleDBLClick}
                onContextMenu={props.handleContext}
              >
                {item}
              </p>
              {props.showContextMenu &&
                props.elem._id == props.trId &&
                props.pId == index &&
                props.colNumber == 3 && (
                  <UserTdCityContext
                    coord={props.coord}
                    trId={props.trId}
                    pId={props.pId}
                    colNumber={props.colNumber}
                    loadingPointList={props.elem.idLoadingPoint}
                    handleClickAddCity={props.handleClickAddCity}
                    hideContextMenu={props.hideContextMenu}
                  />
                )}
            </div>
          )
        )}
        {props.showAddCity &&
          props.elem._id == props.trId &&
          props.colNumber == 3 && (
            <div
              className="divChoise"
              key={`ChoiseList-${props.elem._id}-${props.loadingPoint.length}`}
            >
              <ChoiseList
                name="loadingPoint"
                parent="oders"
                arrlist={props.citieslist}
                setValue={props.setValue}
                index={props.loadingPoint.length}
              />
            </div>
          )}
      </td>

      {/* Column UnloadingPoint */}
      <td className="odersTd">
        {props.unloadingPoint.map((item, index) =>
          props.showEdit &&
          props.elem._id == props.trId &&
          props.colNumber == 4 &&
          props.indexCity == index ? (
            <div
              className="divChoise"
              key={`ChoiseList-${props.elem._id}-${index}`}
            >
              <ChoiseList
                name="unloadingPoint"
                parent="oders"
                arrlist={props.citieslist}
                setValue={props.setValue}
                index={index}
              />
            </div>
          ) : (
            <div className="odersDivP" key={`divUP-${props.elem._id}-${index}`}>
              <p
                className="odersP"
                id={index}
                onDoubleClick={props.handleDBLClick}
                onContextMenu={props.handleContext}
              >
                {item}
              </p>
              {props.showContextMenu &&
                props.elem._id == props.trId &&
                props.pId == index &&
                props.colNumber == 4 && (
                  <UserTdCityContext
                    coord={props.coord}
                    trId={props.trId}
                    pId={props.pId}
                    colNumber={props.colNumber}
                    loadingPointList={props.elem.idUnloadingPoint}
                    handleClickAddCity={props.handleClickAddCity}
                    hideContextMenu={props.hideContextMenu}
                  />
                )}
            </div>
          )
        )}
        {props.showAddCity &&
          props.elem._id == props.trId &&
          props.colNumber == 4 && (
            <div
              className="divChoise"
              key={`ChoiseList-${props.elem._id}-${props.unloadingPoint.length}`}
            >
              <ChoiseList
                name="unloadingPoint"
                parent="oders"
                arrlist={props.citieslist}
                setValue={props.setValue}
                index={props.unloadingPoint.length}
              />
            </div>
          )}
      </td>
      {/* Column Customer Price */}
      <td
        className="odersTd"
        onDoubleClick={props.handleDBLClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {props.showEdit &&
        props.elem._id == props.trId &&
        props.colNumber == 5 &&
        props.elem.customerPayment != "Ок" ? (
          <input name="oderPrice" type="number" onKeyDown={props.handleEnter} />
        ) : props.elem.customerPayment == "Частично оплачен" ? (
          props.elem.customerPrice
        ) : (
          props.elem.customerPrice
        )}
        {props.elem._id == oderId && showFullSum && (
          <div className="oderTdTooltip">
            Частично оплачено {props.elem.partialPaymentAmount} руб
          </div>
        )}
      </td>
      {/* Column Driver Price */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.elem._id == props.trId &&
        props.colNumber == 6 &&
        props.elem.driverPayment != "Ок" ? (
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
        props.elem._id == props.trId ? (
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
      {/* Column Check Complited */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.colNumber == 8 &&
        props.elem._id == props.trId ? (
          <div>
            <span>
              <input
                type="radio"
                name="complited"
                value="yes"
                onChange={props.handleClickRadio}
              />
              Ок
            </span>
            <span>
              <input
                type="radio"
                name="complited"
                value="no"
                onChange={props.handleClickRadio}
              />
              Нет
            </span>
          </div>
        ) : props.elem.complited ? (
          "Ок"
        ) : (
          "Нет"
        )}
      </td>
      {/* Column Check Document */}
      <td
        className="odersTd"
        onDoubleClick={props.handleDBLClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {props.showEdit &&
        props.colNumber == 9 &&
        props.elem._id == props.trId ? (
          <div className="divChoise">
            <ChoiseList
              name="document"
              parent="oders"
              arrlist={[
                { _id: 1, value: "Ок" },
                { _id: 2, value: "Нет" },
                { _id: 3, value: "Факс" },
              ]}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.elem.document
        )}
        {props.elem._id == oderId && dateOfSubmission && (
          <div className="oderTdTooltip">{dateOfSubmission}</div>
        )}
      </td>
      {/* Column customerPayment */}
      <td
        className="odersTd"
        onDoubleClick={props.handleDBLClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {props.showEdit &&
        props.colNumber == 10 &&
        props.elem._id == props.trId ? (
          <div className="divChoise">
            <ChoiseList
              name="customerPayment"
              parent="oders"
              arrlist={accountList}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.elem.customerPayment
        )}
        {(props.elem.customerPayment == "Обещал оплату" ||
          props.elem.customerPayment == "Почта" ||
          props.elem.customerPayment == "Отдал клиенту") &&
          props.elem.dateOfPromise == null && (
            <div className="oderTdTooltip">
              <input
                name="dateOfPromise"
                type="date"
                onKeyDown={props.handleEnter}
              />
            </div>
          )}
        {props.elem.customerPayment == "Частично оплачен" &&
          props.elem.partialPaymentAmount == null && (
            <div className="oderTdTooltip">
              <input
                name="sumPartPay"
                type="number"
                onKeyDown={props.handleEnter}
              />
            </div>
          )}
        {props.elem._id == oderId && dateOfPromise && (
          <div className="oderTdTooltip">{dateOfPromise}</div>
        )}
      </td>
      {/* Column driverPayment */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.colNumber == 11 &&
        props.elem._id == props.trId ? (
          <div className="divChoise">
            <ChoiseList
              name="driverPayment"
              parent="oders"
              arrlist={[
                { _id: 1, value: "Ок" },
                { _id: 2, value: "Нет" },
              ]}
              setValue={props.setValue}
            />
          </div>
        ) : (
          props.elem.driverPayment
        )}
      </td>
      {/* Column acountNumber */}
      <td className="odersTd" onDoubleClick={props.handleDBLClick}>
        {props.showEdit &&
        props.colNumber == 12 &&
        props.elem._id == props.trId ? (
          <div className="divChoise">
            <input
              name="accountNumber"
              type="number"
              onKeyDown={props.handleEnter}
            />
          </div>
        ) : (
          props.elem.accountNumber
        )}
      </td>
      {/* Button Delete */}
      {props.showDelete &&
        props.elem._id == props.trId &&
        props.elem.complited != 1 &&
        props.elem.customerPayment != "Ок" && (
          <td>
            <button className="odersTdBtn" onClick={props.handleClickDelete}>
              Delete
            </button>
          </td>
        )}
    </tr>
  );
};
