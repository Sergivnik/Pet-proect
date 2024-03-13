import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContractorPaymentTr } from "./contractorPaymentTr.jsx";
import { ContractorAddForm } from "./contractorPaymentAddForm.jsx";
import { FormAddDoc } from "../userTrNew/formAddDoc.jsx";
import { ContractorPaymentsThead } from "./contractorPaymentsThead.tsx";
import {
  getDataContractors,
  addDataContractorPayment,
} from "../../actions/contractorActions.js";
import "./contractorForm.sass";

export const ContractorsPayments = () => {
  const dispatch = useDispatch();
  const contractorsList = useSelector(
    (state) => state.oderReducer.contractorsList
  );
  const contractorsPaymentsFull = useSelector(
    (state) => state.oderReducer.contractorsPayments
  );
  const [contractorsPayments, setContractorsPayments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [currentTD, setCurrentTD] = useState(null);

  useEffect(() => {
    dispatch(getDataContractors());
  }, [dispatch]);
  useEffect(() => {
    let length = contractorsPaymentsFull.length;
    if (length > 500) {
      setContractorsPayments(
        contractorsPaymentsFull.slice(length - 500, length)
      );
    } else {
      setContractorsPayments(contractorsPaymentsFull);
    }
  }, [contractorsPaymentsFull]);
  useEffect(() => {
    let div = document.getElementsByClassName("contrPayTableDiv")[0];
    div.scrollTop = div.scrollHeight;
  }, [contractorsPayments]);

  const handleClickFilter = () => {};

  const handleClickAdd = () => {
    setShowAddForm(true);
  };
  const handleClickCross = () => {
    setShowAddForm(false);
  };
  const handleClickAddPayment = (paymentsData) => {
    setShowAddForm(false);
    dispatch(addDataContractorPayment(paymentsData));
  };
  const handleAddDoc = () => {
    let currentElement = document.querySelector(".contrPayMainDiv");
    setCurrentTD(currentElement);
    setShowAddDoc(true);
  };
  const handleClickClose = () => {
    setShowAddDoc(false);
  };
  const getFiltredList = (list) => {
    setContractorsPayments(list);
  };

  return (
    <div className="contrPayMainDiv">
      <div className="contrPayTableDiv">
        <table className="contrPayMainTable">
          <ContractorPaymentsThead getFiltredList={getFiltredList} />
          <tbody>
            {contractorsPayments.map((elem) => {
              return (
                <ContractorPaymentTr
                  key={elem.id}
                  paymentData={elem}
                  currentId={currentId}
                  getCurrentId={(id) => {
                    setCurrentId(id);
                  }}
                  handleAddDoc={handleAddDoc}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <button onClick={handleClickAdd}>Добавить</button>
      {showAddForm && (
        <ContractorAddForm
          clickCross={handleClickCross}
          contractorsList={contractorsList}
          handleClickAdd={handleClickAddPayment}
        />
      )}
      {showAddDoc && (
        <FormAddDoc
          TD={currentTD}
          currentId={currentId}
          typeDoc="contractor"
          handleClickClose={handleClickClose}
        />
      )}
    </div>
  );
};
