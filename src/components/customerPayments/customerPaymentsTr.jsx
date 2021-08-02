import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CustomerPaymentsTr = (props) => {
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [showDetails, setShowDetails] = useState(false);
  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };

  const handleClickTr = () => {
    setShowDetails(!showDetails);
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
      <tr onClick={handleClickTr}>
        <td>{DateStr(elem.date)}</td>
        <td>{nameOfCustomer}</td>
        <td>{elem.sumOfPayment}</td>
        <td>{sumOfOders}</td>
        <td>{elem.sumExtraPayment}</td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="5">
            <table className="customerPaymentInsideTable">
              <thead>
                <tr>
                  <td>Дата рейса</td>
                  <td>Водитель</td>
                  <td>Заказчик</td>
                  <td>Погрузка</td>
                  <td>Выгрузка</td>
                  <td>Списано в платеже</td>
                  <td>Полная стоимость рейса</td>
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
                      <td>{DateStr(oder.date)}</td>
                      <td>{driver.value}</td>
                      <td>{nameOfCustomer}</td>
                      <td>{loadingPoints}</td>
                      <td>{unloadingPoints}</td>
                      <td>{item.customerPrice}</td>
                      <td>{oder.customerPrice}</td>
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
