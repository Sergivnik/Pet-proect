import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { CreateOderNew } from "../createOder/createOderNew.jsx";
import { TdDate } from "../userTd/tdDate.jsx";
import { TdDriver } from "../userTd/tdDriver.jsx";
import { TdCustomer } from "../userTd/tdCustomer.jsx";
import { TdLoadingPoint } from "../userTd/tdLoadingPoint.jsx";
import { TdUnoadingPoint } from "../userTd/tdUnloadingPoint.jsx";
import { TdCustomerPrice } from "../userTd/tdCustomerPrice.jsx";
import { TdDriverPrice } from "../userTd/tdDriverPrice.jsx";
import { TdProxy } from "../userTd/tdProxy.jsx";
import { TdCompleted } from "../userTd/tdCompleted.jsx";

export const UserTr = (props) => {
  const accountList = useSelector(
    (state) => state.oderReducer.statusCustomerPay
  );
  const trackDriverList = useSelector(
    (state) => state.oderReducer.trackdrivers
  );
  const managerList = useSelector((state) => state.oderReducer.clientmanager);

  const [oderId, setOderId] = useState(null);
  const [trackDriver, setTrackDriver] = useState(null);
  const [manager, setManager] = useState(null);
  const [pointLoadInfo, setPointLoadInfo] = useState(null);
  const [pointUnloadInfo, setPointUnloadInfo] = useState(null);
  const [dateOfSubmission, setDateOfSubmission] = useState(null);
  const [dateOfPromise, setDateOfPromise] = useState(null);
  const [showFullSum, setShowFullSum] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const handleMouseOver = (e) => {
    let id = Number(e.target.parentElement.id);
    let oder = props.elem;
    if (e.target.nodeName == "TD") {
      if (e.target.cellIndex == 1 && oder.idTrackDriver != null) {
        let driver = trackDriverList.find(
          (elem) => elem._id == oder.idTrackDriver
        ).value;
        setTrackDriver(driver);
      }
      if (e.target.cellIndex == 2 && oder.idManager != null) {
        let clientManager = managerList.find(
          (elem) => elem._id == oder.idManager
        ).value;
        setManager(clientManager);
      }
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
    setTrackDriver(null);
    setManager(null);
    setPointLoadInfo(null);
    setPointUnloadInfo(null);
  };
  const handleClickEdit = () => {
    setShowEdit(false);
  };
  const handleClickSave = () => {
    setShowEdit(true);
  };
  const trGetId = () => {
    props.getCurrentTR(props.elem._id);
  };
  const deleteActive = (completed)=>{
    setShowDelete(!completed);
  }

  return (
    <>
      {showEdit ? (
        <tr
          id={props.elem._id}
          onClick={props.handleClickTR}
          onMouseDown={(e) => {
            if (e.target.tagName === "TD") e.preventDefault();
          }}
        >
          <TdDate date={props.elem.date} currentTR={props.trId} edit={true} />
          <TdDriver
            idDriver={props.elem.idDriver}
            idTrackDriver={props.elem.idTrackDriver}
            currentTR={props.trId}
            edit={true}
          />
          <TdCustomer
            idCustomer={props.elem.idCustomer}
            idManager={props.elem.idManager}
            currentTR={props.trId}
            edit={true}
          />
          <TdLoadingPoint
            idLoadingPoint={props.elem.idLoadingPoint}
            loadingInfo={props.elem.loadingInfo}
            getCurrentTR={trGetId}
            currentTR={props.trId}
            edit={true}
          />
          <TdUnoadingPoint
            idUnloadingPoint={props.elem.idUnloadingPoint}
            unLoadingInfo={props.elem.unloadingInfo}
            getCurrentTR={trGetId}
            currentTR={props.trId}
            edit={true}
          />
          <TdCustomerPrice
            customerPrice={props.elem.customerPrice}
            customerPayment={props.elem.customerPayment}
            partialPaymentAmount={props.elem.partialPaymentAmount}
            currentTR={props.trId}
            edit={true}
          />
          <TdDriverPrice
            driverPrice={props.elem.driverPrice}
            driverPayment={props.elem.driverPayment}
            currentTR={props.trId}
            edit={true}
          />
          <TdProxy
            proxy={props.elem.proxy}
            currentTR={props.trId}
            edit={true}
          />
          <TdCompleted
            completed={props.elem.completed}
            currentTR={props.trId}
            edit={true}
            deleteActive={deleteActive}
          />
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
            !props.elem.completed &&
            props.elem.customerPayment != "Ок" && (
              <td>
                <button
                  className="odersTdBtn"
                  onClick={props.handleClickDelete}
                >
                  Delete
                </button>
              </td>
            )}

          {props.showDelete &&
            props.elem.completed &&
            props.elem._id == props.trId && (
              <td>
                <button className="odersTdBtn" onClick={handleClickEdit}>
                  Edit
                </button>
              </td>
            )}
        </tr>
      ) : (
        <tr>
          <td colSpan="13">
            <CreateOderNew elem={props.elem} clickSave={handleClickSave} />
          </td>
          <td>
            <button className="odersTdBtn" onClick={handleClickEdit}>
              Edit
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
