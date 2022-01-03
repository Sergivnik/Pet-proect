import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TdDate } from "../userTd/tdDate.jsx";
import { TdDriver } from "../userTd/tdDriver.jsx";
import { TdCustomer } from "../userTd/tdCustomer.jsx";
import { TdLoadingPoint } from "../userTd/tdLoadingPoint.jsx";
import { TdUnoadingPoint } from "../userTd/tdUnloadingPoint.jsx";
import { TdCustomerPrice } from "../userTd/tdCustomerPrice.jsx";
import { TdDocument } from "../userTd/tdDocument.jsx";
import { TdAccountNumber } from "../userTd/tdAccountNumber.jsx";
import { TdDriverPrice } from "../userTd/tdDriverPrice.jsx";
import "./billsForm.sass";
import { DocForm } from "./docForm.jsx";

export const BillsForm = () => {
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const notBilledList = odersList.filter((elem) => elem.accountNumber == null);
  const [check, setCheck] = useState(false);
  const [billList, setBillList] = useState(notBilledList);
  const [chosenOdersId, setChoisenOdersId] = useState([]);
  const [billNumber, setBillNumber] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [printObj, setPrintObj] = useState({ number: null, odersListId: [] });
  const [showDocForm, setShowDocForm] = useState(false);

  const handleClickCheckBox = () => {
    setCheck(!check);
  };
  const handleTrClick = (id) => {
    let customer = billList.find((elem) => elem._id == id).idCustomer;
    let number = billList.find((elem) => elem._id == id).accountNumber;
    let [...arr] = chosenOdersId;
    if (!arr.includes(id)) {
      if (number == null) {
        arr.push(id);
      } else {
        if (billNumber == null) {
          setBillNumber(number);
          arr.push(id);
        } else {
          alert("нельзя объединять выставленные счета");
        }
      }
    } else {
      let index = arr.findIndex((elem) => elem == id);
      arr.splice(index, 1);
      if (number != null) setBillNumber(null);
    }
    setChoisenOdersId(arr);
    let [...arrBillsList] = billList.filter(
      (elem) => elem.idCustomer == customer
    );
    setBillList(arrBillsList);
    setShowBtn(true);
  };
  const handleBtnClick = () => {
    let i = odersList.length - 1;
    while (odersList[i].accountNumber == null) {
      i = i - 1;
    }
    let { ...obj } = printObj;
    if (billNumber == null) {
      obj.number = Number(odersList[i].accountNumber) + 1;
      obj.odersListId = chosenOdersId;
      setPrintObj(obj);
    } else {
      obj.number = Number(billNumber);
      obj.odersListId = chosenOdersId;
      setPrintObj(obj);
    }
    setBillList(notBilledList);
    setCheck(false);
    setChoisenOdersId([]);
    setBillNumber(null);
    setShowBtn(false);
    setShowDocForm(true);
  };
  const handleClickClose = () => {
    setShowDocForm(false);
  };

  const isClassChosen = (id) => {
    if (chosenOdersId.includes(id)) {
      return "trChosen";
    } else {
      return "trNotChosen";
    }
  };

  useEffect(() => {
    if (check) {
      setBillList(odersList.filter((elem) => elem.customerPayment != "Ок"));
    } else {
      setBillList(notBilledList);
    }
  }, [check]);
  return (
    <div className="billsFormMainDiv">
      <div className="billsFormHeaderDiv">
        <span>Показать неоплаченные счета</span>
        <input type="checkbox" checked={check} onChange={handleClickCheckBox} />
      </div>
      <div className="billsFormTableContainer">
        <table className="billsFormTable">
          <thead className="billsFormMainHeader">
            <tr>
              <td>Дата</td>
              <td>Водитель</td>
              <td>Заказчик</td>
              <td>Погрузка</td>
              <td>Выгрузка</td>
              <td>Цена клиента</td>
              <td>Цена водителя</td>
              <td>Документы</td>
              <td>Номер счета</td>
            </tr>
          </thead>
          <tbody>
            {billList.map((elem) => {
              return (
                <tr
                  key={`notBill${elem._id}`}
                  className={isClassChosen(elem._id)}
                  onClick={() => {
                    handleTrClick(elem._id);
                  }}
                >
                  <TdDate date={elem.date} />
                  <TdDriver
                    idDriver={elem.idDriver}
                    idTrackDriver={elem.idTrackDriver}
                  />
                  <TdCustomer
                    idCustomer={elem.idCustomer}
                    idManager={elem.idManager}
                  />
                  <TdLoadingPoint
                    idLoadingPoint={elem.idLoadingPoint}
                    loadingInfo={elem.loadingInfo}
                  />
                  <TdUnoadingPoint
                    idUnloadingPoint={elem.idUnloadingPoint}
                    unLoadingInfo={elem.unloadingInfo}
                  />
                  <TdCustomerPrice
                    customerPrice={elem.customerPrice}
                    customerPayment={elem.customerPayment}
                    partialPaymentAmount={elem.partialPaymentAmount}
                  />
                  <TdDriverPrice
                    driverPrice={elem.driverPrice}
                    driverPayment={elem.driverPayment}
                  />
                  <TdDocument
                    document={elem.document}
                    dateOfSubmission={elem.dateOfSubmission}
                  />
                  <TdAccountNumber accountNumber={elem.accountNumber} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showBtn && (
        <button className="billsFormBtn" onClick={handleBtnClick}>
          Выставить счет
        </button>
      )}
      {showDocForm && (
        <DocForm dataDoc={printObj} handleClickClose={handleClickClose} />
      )}
    </div>
  );
};
