import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./customerPaymentForm.sass";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { UserTrNew } from "../userTrNew/userTrNew.jsx";

export const CustomerPaymentForm = () => {
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [idChoisenCustomer, setIdCoisenCustomer] = useState(null);
  const [oders, setOders] = useState(null);

  useEffect(() => {
    let arr = odersList.filter(
      (item) =>
        item.idCustomer == idChoisenCustomer && item.customerPayment != "Ок"
    );
    setOders(arr);
    console.log("arr", arr);
  }, [idChoisenCustomer]);

  const setValue = (data) => {
    setIdCoisenCustomer(data._id);
  };
  return (
    <div className="customerPaymentMainDiv">
      <header className="customerPaymentHeader">
        <div className="customerPaymentHeaderDiv">
          <p className="customerPaymentHeaderP">Заказчик</p>
          <ChoiseList name="oders" arrlist={clientList} setValue={setValue} />
        </div>
        <div className="customerPaymentHeaderDiv">
          <p className="customerPaymentHeaderP">Сумма платежа</p>
          <input type="number" />
        </div>
        <div className="customerPaymentHeaderDiv">
          <p className="customerPaymentHeaderP">
            Сумма нераспределенных платежей
          </p>
          <div className="customerPaymentHeaderUnkown">{0} руб</div>
        </div>
      </header>
      <div className="customerPaymentOdersDiv">
        <table className="odersTable">
          {idChoisenCustomer && (
            <tbody className="odersTbody">
              {oders.map((elem) => {
                let driver, customer;
                let loadingPoint,
                  unloadingPoint = [];
                elem.idDriver
                  ? (driver = driversList.find(
                      (item) => item._id === elem.idDriver
                    ).value)
                  : (driver = "");
                elem.idCustomer
                  ? (customer = clientList.find(
                      (item) => item._id === elem.idCustomer
                    ).value)
                  : (customer = "");
                if (elem.idLoadingPoint) {
                  loadingPoint = elem.idLoadingPoint.map((itemLP) => {
                    return citieslist.find((item) => item._id == itemLP).value;
                  });
                } else {
                  loadingPoint = [""];
                }
                if (elem.idUnloadingPoint) {
                  unloadingPoint = elem.idUnloadingPoint.map((itemLP) => {
                    return citieslist.find((item) => item._id == itemLP).value;
                  });
                } else {
                  unloadingPoint = [""];
                }
                return (
                  <UserTrNew
                    key={elem._id}
                    elem={elem}
                    //handleClickTR={handleClickTR}
                    driver={driver}
                    customer={customer}
                    loadingPoint={loadingPoint}
                    unloadingPoint={unloadingPoint}
                  />
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
