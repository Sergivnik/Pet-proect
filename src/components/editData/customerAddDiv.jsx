import React, { useEffect, useState } from "react";
import axios from "axios";

import "./editData.sass";

export const CustomerAddDiv = (props) => {
  const fielsList = [
    "value",
    "TIN",
    "companyName",
    "address",
    "postAddress",
    "email",
    "phone",
    "contract",
    "active",
    "KPP",
    "OGRN",
    "bossName",
    "RCBIC",
    "Acc",
    "CorAcc",
    "bankName",
    "bankAddress",
    "addInfo",
  ];
  const [editField, setEditField] = useState("value");
  const [value, setValue] = useState("");
  const [customerData, setCustomerData] = useState({});
  const [requestTIN, setRequestTIN] = useState([]);
  const [requestRCBIC, setRequestRCBIC] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleEnter = (e) => {
    let index = fielsList.findIndex((field) => field == editField);
    let newData = { ...customerData };
    const token = "fd7ad5614056fe4932599a0a3d94dd317d009510";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const getDaDataTIN = (TIN) => {
      console.log("TIN", TIN);
      const url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
      const data = {
        query: TIN,
      };
      axios
        .post(url, data, config)
        .then((response) => {
          console.log(response.data.suggestions);
          setRequestTIN(response.data.suggestions);
          setShowSuggestions(true);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const getDadataRCBIC = (RCBIC) => {
      console.log("RCBIC", RCBIC);
      const url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank";
      const data = {
        query: RCBIC,
      };
      axios
        .post(url, data, config)
        .then((response) => {
          console.log(response.data.suggestions);
          setRequestRCBIC(response.data.suggestions);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    if (e.key == "Enter") {
      newData[editField] = value;
      setCustomerData(newData);
      setEditField(null);
      setValue("");
      if (editField == "TIN") {
        getDaDataTIN(value);
      }
      if (editField == "RCBIC") {
        getDadataRCBIC(value);
      }
    }
    if (e.key == "Tab") {
      newData[editField] = value;
      setCustomerData(newData);
      setEditField(fielsList[index + 1]);
      setValue(
        customerData[fielsList[index + 1]]
          ? customerData[fielsList[index + 1]]
          : ""
      );
      if (editField == "TIN") {
        getDaDataTIN(value);
        setEditField(null);
      }
      if (editField == "RCBIC") {
        getDadataRCBIC(value);
        setEditField(null);
      }
    }
    if (e.shiftKey && e.key == "Tab") {
      newData[editField] = value;
      setCustomerData(newData);
      setEditField(fielsList[index - 1]);
      setValue(
        customerData[fielsList[index - 1]]
          ? customerData[fielsList[index - 1]]
          : ""
      );
      if (editField == "TIN") {
        getDaDataTIN(value);
      }
      if (editField == "RCBIC") {
        getDadataRCBIC(value);
      }
    }
  };
  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };
  const handleDBLclick = (field) => {
    console.log(field);
    setEditField(field);
    setValue(customerData[field]);
  };
  const handleClickSuggestion = (index) => {
    console.log(index);
    let newData = { ...customerData };
    if (customerData.KPP == null || customerData.KPP == "") {
      newData.KPP = requestTIN[index].data.kpp
        ? requestTIN[index].data.kpp
        : "нет данных";
    }
    if (customerData.companyName == null || customerData.companyName == "") {
      newData.companyName = requestTIN[index].data.name.short_with_opf
        ? requestTIN[index].data.name.short_with_opf
        : "нет данных";
    }
    if (customerData.OGRN == null || customerData.OGRN == "") {
      newData.OGRN = requestTIN[index].data.ogrn
        ? requestTIN[index].data.ogrn
        : "нет данных";
    }
    if (customerData.bossName == null || customerData.bossName == "") {
      newData.bossName = requestTIN[index].data.management
        ? requestTIN[index].data.management.name
        : "нет данных";
    }
    if (customerData.address == null || customerData.address == "") {
      newData.address = requestTIN[index].data.address.unrestricted_value
        ? requestTIN[index].data.address.unrestricted_value
        : "нет данных";
    }
    setCustomerData(newData);
    setShowSuggestions(false);
  };
  const handleClickSave = () => {
    if (!customerData.active) customerData.active = 1;
    if (customerData.value) {
      props.handleAddCustomer(customerData);
    }
  };

  useEffect(() => {
    if (requestRCBIC.length) {
      let newData = { ...customerData };
      if (customerData.CorAcc == null || customerData.CorAcc == "") {
        newData.CorAcc = requestRCBIC[0].data.correspondent_account
          ? requestRCBIC[0].data.correspondent_account
          : "нет данных";
      }
      if (customerData.bankName == null || customerData.bankName == "") {
        newData.bankName = requestRCBIC[0].value
          ? requestRCBIC[0].value
          : "нет данных";
      }
      if (customerData.bankAddress == null || customerData.bankAddress == "") {
        newData.bankAddress = requestRCBIC[0].data.address.value
          ? requestRCBIC[0].data.address.value
          : "нет данных";
      }
      setCustomerData(newData);
    }
  }, [requestRCBIC]);

  return (
    <div className="costomerAddDiv">
      <header className="CustomerAddHeader">Данные клиента</header>
      <table className="customerTbl">
        <thead>
          <tr>
            <td className="customerAddTdHeader">Название</td>
            <td className="customerAddTdHeader">ИНН</td>
            <td className="customerAddTdHeader">Полное название</td>
            <td className="customerAddTdHeader">Адрес</td>
            <td className="customerAddTdHeader">Почтовый адрес</td>
            <td className="customerAddTdHeader">E-mail</td>
            <td className="customerAddTdHeader">Телефон</td>
            <td className="customerAddTdHeader">Договор</td>
            <td className="customerAddTdHeader">Активный</td>
          </tr>
        </thead>
        <tbody className="customerTbody">
          <tr>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("value");
              }}
            >
              {editField == "value" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.value
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("TIN");
              }}
            >
              {editField == "TIN" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.TIN
              )}
              {showSuggestions && (
                <div className="suggestionsDiv">
                  {requestTIN.map((elem, index) => {
                    return (
                      <p
                        key={`suggestion${index}`}
                        onClick={() => handleClickSuggestion(index)}
                      >
                        {elem.value +
                          " КПП " +
                          elem.data.kpp +
                          " " +
                          elem.data.address.value}
                      </p>
                    );
                  })}
                </div>
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("companyName");
              }}
            >
              {editField == "companyName" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.companyName
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("address");
              }}
            >
              {editField == "address" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.address
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("postAddress");
              }}
            >
              {editField == "postAddress" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.postAddress
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("email");
              }}
            >
              {editField == "email" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.email
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("phone");
              }}
            >
              {editField == "phone" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.phone
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("contract");
              }}
            >
              {editField == "contract" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.contract
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("active");
              }}
            >
              {editField == "active" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.active
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <header className="CustomerAddHeader">Реквизиты клиента</header>
      <table className="customerTbl">
        <thead>
          <tr>
            <td className="customerAddTdHeader">КПП</td>
            <td className="customerAddTdHeader">ОГРН</td>
            <td className="customerAddTdHeader">ФИО директора</td>
            <td className="customerAddTdHeader">БИК</td>
            <td className="customerAddTdHeader">р/сч</td>
            <td className="customerAddTdHeader">кор/сч</td>
            <td className="customerAddTdHeader">Банк</td>
            <td className="customerAddTdHeader">Адрес банка</td>
          </tr>
        </thead>
        <tbody className="customerTbody">
          <tr>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("KPP");
              }}
            >
              {editField == "KPP" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.KPP
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("OGRN");
              }}
            >
              {editField == "OGRN" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.OGRN
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("bossName");
              }}
            >
              {editField == "bossName" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.bossName
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("RCBIC");
              }}
            >
              {editField == "RCBIC" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.RCBIC
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("Acc");
              }}
            >
              {editField == "Acc" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.Acc
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("CorAcc");
              }}
            >
              {editField == "CorAcc" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.CorAcc
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("bankName");
              }}
            >
              {editField == "bankName" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.bankName
              )}
            </td>
            <td
              className="customerAddTd"
              onDoubleClick={() => {
                handleDBLclick("bankAddress");
              }}
            >
              {editField == "bankAddress" ? (
                <input
                  type="text"
                  className="customerTrInput"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={value}
                />
              ) : (
                customerData.bankAddress
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <footer className="customerAddFooter">
        <span className="customerAddSpanHeader">{"Особые условия:"}</span>
        <span
          className="customerAddSpanInfo"
          onDoubleClick={() => {
            handleDBLclick("addInfo");
          }}
        >
          {editField == "addInfo" ? (
            <input
              type="text"
              className="customerTrInput"
              onKeyDown={handleEnter}
              onChange={handleChange}
              value={value}
            />
          ) : (
            customerData.addInfo
          )}
        </span>
        <div className="customerAddButtonWrapper">
          <button onClick={handleClickSave}>Сохранить</button>
        </div>
      </footer>
    </div>
  );
};
