import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { editData } from "../../actions/editDataAction.js";
import { TdWithText } from "../myLib/myTd/tdWithText.jsx";

import "./editData.sass";
export interface Driver {
  _id: number;
  value: string;
  phone: string;
  companyName: string;
  TIN: string;
  address: string;
  currentAccount: string;
  contract: string;
  active: boolean;
  addInfo: string;
  KPP: string;
  OGRN: string;
  Acc: string;
  CorAcc: string;
  RCBIC: string;
  bossName: string;
  bankName: string;
  bankAddress: string;
}
interface Props {
  driver: Driver;
}
export const DriverAccountTr = ({ driver }: Props) => {
  const urlTIN =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
  const urlRCBIC =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank";
  const token = "fd7ad5614056fe4932599a0a3d94dd317d009510";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${token}`,
    },
  };

  const dispatch = useDispatch();

  const [driverData, setDriverData] = useState<Driver>(driver);
  const [requestTIN, setRequestTIN] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setDriverData(driver);
  }, [driver]);
  useEffect(() => {
    const data = { query: driverData.TIN };
    if (
      driverData.TIN != null &&
      (driverData.address == null ||
        driverData.companyName == null ||
        driverData.KPP == null ||
        driverData.OGRN == null ||
        driverData.bossName == null ||
        driverData.address == "" ||
        driverData.companyName == "" ||
        driverData.KPP == "" ||
        driverData.OGRN == "" ||
        driverData.bossName == "")
    ) {
      axios
        .post(urlTIN, data, config)
        .then((response) => {
          console.log(response.data.suggestions);
          setRequestTIN(response.data.suggestions);
          setShowSuggestions(true);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [driverData.TIN]);

  const handleClickSuggestion = (index) => {
    console.log(index);
    let newData: Driver = { ...driverData };
    if (driverData.KPP == null || driverData.KPP == "") {
      newData.KPP = requestTIN[index].data.kpp
        ? requestTIN[index].data.kpp
        : "нет данных";
    }
    if (driverData.companyName == null || driverData.companyName == "") {
      newData.companyName = requestTIN[index].data.name.short_with_opf
        ? requestTIN[index].data.name.short_with_opf
        : "нет данных";
    }
    if (driverData.OGRN == null || driverData.OGRN == "") {
      newData.OGRN = requestTIN[index].data.ogrn
        ? requestTIN[index].data.ogrn
        : "нет данных";
    }
    if (driverData.bossName == null || driverData.bossName == "") {
      newData.bossName = requestTIN[index].data.management
        ? requestTIN[index].data.management.name
        : "нет данных";
    }
    if (driverData.address == null || driverData.address == "") {
      newData.address = requestTIN[index].data.address.unrestricted_value
        ? requestTIN[index].data.address.unrestricted_value
        : "нет данных";
    }
    setDriverData(newData);
    setShowSuggestions(false);
    dispatch(editData(newData, "drivers"));
  };
  const getNewData = () => {};

  return (
    <React.Fragment>
      <tr>
        <TdWithText
          text={driverData.KPP}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.OGRN}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.Acc}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.CorAcc}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.RCBIC}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.bossName}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.bankName}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
        <TdWithText
          text={driverData.bankAddress}
          name="KPP"
          getData={getNewData}
          elem={driverData}
        />
      </tr>
      {showSuggestions &&
        requestTIN.map((elem, index) => {
          let kpp = elem.data.kpp ? elem.data.kpp : "";
          let address = elem.data.address ? elem.data.address.value : "";
          return (
            <tr
              key={`suggestion${index}`}
              onClick={() => handleClickSuggestion(index)}
            >
              <td className="suggestionTd" colSpan={8}>
                {elem.value + " КПП " + kpp + " " + address}
              </td>
            </tr>
          );
        })}
    </React.Fragment>
  );
};
