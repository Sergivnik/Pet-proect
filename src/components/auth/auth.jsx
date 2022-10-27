import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn, authSignUp } from "../../actions/auth";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./auth.sass";

export const Auth = () => {
  const roleList = [
    { _id: 1, value: "admin" },
    { _id: 2, value: "accounter" },
    { _id: 3, value: "logist" },
    { _id: 4, value: "customerBoss" },
    { _id: 5, value: "customerManager" },
  ];

  const dispatch = useDispatch();

  const user = useSelector((state) => state.oderReducer.currentUser);
  const customerList = useSelector((state) => state.oderReducer.clientList);
  const managerListFull = useSelector(
    (state) => state.oderReducer.clientmanager
  );

  const [btnName, setBtnName] = useState("Вход");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [managerList, setManagerList] = useState([]);
  const [managerId, setManagerId] = useState(null);

  useEffect(() => {
    setManagerList(managerListFull);
  }, [managerListFull]);

  const handleClickSignIn = (e) => {
    let div = e.currentTarget;
    let siblings = div.parentNode.childNodes;
    siblings.forEach((node) => {
      node.style.borderBottom = "1px solid #000";
      node.style.backgroundColor = "#FFFFFF";
    });
    div.style.borderBottom = "none";
    div.style.backgroundColor = "#cdcdcd";
    setBtnName("Войти");
  };
  const handleClickSignUp = (e) => {
    if (user.role == "admin") {
      let div = e.currentTarget;
      let siblings = div.parentNode.childNodes;
      siblings.forEach((node) => {
        node.style.borderBottom = "1px solid #000";
        node.style.backgroundColor = "#FFFFFF";
      });
      div.style.borderBottom = "none";
      div.style.backgroundColor = "#cdcdcd";
      setBtnName("Зарегистрироваться");
    }
  };
  const handleChangeLogin = (e) => {
    setLogin(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  const handleChangeRole = (data) => {
    setRole(data.value);
  };
  const setIdCustomer = (data) => {
    setCustomerId(data._id);
    let arr = managerListFull.filter((elem) => elem.odersId == data._id);
    setManagerList(arr);
  };
  const setIdMamager = (data) => {
    setManagerId(data._id);
  };
  const handleClickBtn = () => {
    if (btnName === "Зарегистрироваться") {
      dispatch(
        authSignUp({
          login: login,
          password: password,
          name: name,
          role: role,
          customerId: customerId,
          managerID: managerId,
        })
      );
    }
    if (btnName === "Вход") {
      dispatch(authSignIn({ login: login, password: password }));
    }
  };
  const handleLabelGetFocus = (e) => {
    console.log(e);
    e.currentTarget.style.zIndex=5
  };
  const handleLabelLostFocus = (e) => {
    e.currentTarget.style.zIndex=0
  };
  return (
    <div className="authContainer">
      <div className="authWrap">
        <header className="authHeader">
          <div className="authHeaderSignIn" onClick={handleClickSignIn}>
            Войти
          </div>
          <div className="authHeaderSignUp" onClick={handleClickSignUp}>
            Зарегистрироваться
          </div>
        </header>
        <main className="authMain">
          <label className="authLabel">
            <span className="authSpan">Логин</span>
            <input
              className="authInput"
              type="text"
              value={login}
              onChange={handleChangeLogin}
            />
          </label>
          <label className="authLabel">
            <span className="authSpan">Пароль</span>
            <input
              className="authInput"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
          {btnName == "Зарегистрироваться" && (
            <label className="authLabel">
              <span className="authSpan">Имя</span>
              <input
                className="authInput"
                type="text"
                value={name}
                onChange={handleChangeName}
              />
            </label>
          )}
          {btnName == "Зарегистрироваться" && (
            <>
              <label
                className="authLabel"
                onFocus={handleLabelGetFocus}
                onBlur={handleLabelLostFocus}
              >
                <span className="authSpan">Роль</span>
                <div className="choiseWrap">
                  <ChoiseList
                    name="customer"
                    arrlist={roleList}
                    setValue={handleChangeRole}
                  />
                </div>
              </label>
              <label
                className="authLabel"
                onFocus={handleLabelGetFocus}
                onBlur={handleLabelLostFocus}
              >
                <span className="authSpan">Клиент</span>
                <div className="choiseWrap">
                  <ChoiseList
                    name="customer"
                    arrlist={customerList}
                    setValue={setIdCustomer}
                  />
                </div>
              </label>
              <label
                className="authLabel"
                onFocus={handleLabelGetFocus}
                onBlur={handleLabelLostFocus}
              >
                <span className="authSpan">Менеджер</span>
                <div className="choiseWrap">
                  <ChoiseList
                    name="manager"
                    arrlist={managerList}
                    setValue={setIdMamager}
                  />
                </div>
              </label>
            </>
          )}
        </main>
        <footer className="authFooter">
          <button onClick={handleClickBtn}>{btnName}</button>
        </footer>
      </div>
    </div>
  );
};
