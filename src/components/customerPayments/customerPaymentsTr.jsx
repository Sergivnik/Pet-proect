import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CustomerPaymentsTr = (props) => {
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [showDetails, setShowDetails] = useState(false);
  const [fontWeight, setFontWeight] = useState("");
  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };

  const handleClickTr = () => {
    setShowDetails(!showDetails);
    if (fontWeight == "") {
      setFontWeight("customerPaymentBoldFont");
    }else{
      setFontWeight("");
    }
  };
  let elem = props.paymentData;
  let sumOfOders = elem.listOfOders.reduce(
    (sum, current) => sum + current.customerPrice,
    0
  );
  let nameOfCustomer = clientList.find(
    (item) => item._id == elem.idCustomer
  ).value;

  return (
    <React.Fragment>
      <tr onClick={handleClickTr} className={fontWeight}>
        <td className="customerPaymentMainTd">{DateStr(elem.date)}</td>
        <td className="customerPaymentMainTd">{nameOfCustomer}</td>
        <td className="customerPaymentMainTd">{elem.sumOfPayment}</td>
        <td className="customerPaymentMainTd">{sumOfOders}</td>
        <td className="customerPaymentMainTd">{elem.sumExtraPayment}</td>
      </tr>
      {showDetails && (
        <tr className="customerPaymentBoldFont">
          <td colSpan="5">
            <table className="customerPaymentInsideTable">
              <thead className="customerPaymentInsideHeader">
                <tr>
                  <td className="customerPaymentInsideTd">Дата рейса</td>
                  <td className="customerPaymentInsideTd">Водитель</td>
                  <td className="customerPaymentInsideTd">Заказчик</td>
                  <td className="customerPaymentInsideTd">Погрузка</td>
                  <td className="customerPaymentInsideTd">Выгрузка</td>
                  <td className="customerPaymentInsideTd">Списано в платеже</td>
                  <td className="customerPaymentInsideTd">
                    Полная стоимость рейса
                  </td>
                  <td className="customerPaymentInsideTd">Номер счета</td>
                </tr>
              </thead>
              <tbody>
                {elem.listOfOders.map((item) => {
                  let oder = odersList.find(
                    (element) => element._id == item.id
                  );
                  let driver = driversList.find(
                    (element) => element._id == oder.idDriver
                  );
                  let loadingPoints = "";
                  oder.idLoadingPoint.forEach((element) => {
                    let point = citieslist.find(
                      (city) => city._id == element
                    ).value;
                    loadingPoints = loadingPoints + point + "\n";
                  });
                  let unloadingPoints = "";
                  oder.idUnloadingPoint.forEach((element) => {
                    let point = citieslist.find(
                      (city) => city._id == element
                    ).value;
                    unloadingPoints = unloadingPoints + point + "\n";
                  });
                  return (
                    <tr key={`trOder${item.id}`} onClick={handleClickTr}>
                      <td className="customerPaymentInsideTd">
                        {DateStr(oder.date)}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {driver.value}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {nameOfCustomer}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {loadingPoints}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {unloadingPoints}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {item.customerPrice}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {oder.customerPrice}
                      </td>
                      <td className="customerPaymentInsideTd">
                        {oder.accountNumber}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
