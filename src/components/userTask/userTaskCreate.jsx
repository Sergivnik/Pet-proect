import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import "./userTask.sass";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { addNewTask } from "../../actions/tasksActions";

export const UserCreateTask = (props) => {
  const dispatch = useDispatch();
  const [clientList, setClientList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showEditOrganization, setShowEditOrganization] = useState(true);
  const [organization, setOrganization] = useState(null);
  const [showEditUser, setShowEditUser] = useState(true);
  const [user, setUser] = useState(null);
  const [showEditText, setShowEditText] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    let arr = [...props.clientList];
    arr.push({ _id: 0, value: "ИП Иванов С.Н." });
    setClientList(arr);
    let newUserList = props.userList.map((user) => {
      return { _id: user._id, value: user.name, customerId: user.customerId };
    });
    setUserList(newUserList);
  }, []);
  const setValue = (data) => {
    if (data.field == "organization") {
      let arr = userList.filter(
        (user) => data._id == user.customerId || user.customerId == null
      );
      setUserList(arr);
      setOrganization({ _id: data._id, name: data.value });
      setShowEditOrganization(false);
    }
    if (data.field == "user") {
      setUser({ _id: data._id, name: data.value });
      setShowEditUser(false);
    }
  };
  const handleDBLClickOrganization = () => {
    let newUserList = props.userList.map((user) => {
      return { _id: user._id, value: user.name, customerId: user.customerId };
    });
    setUserList(newUserList);
    setShowEditOrganization(true);
    setShowEditUser(true);
    setOrganization(null);
    setUser(null);
  };
  const handleDBLClickUser = () => {
    setShowEditUser(true);
  };
  const handleChangeText = (e) => {
    setText(e.currentTarget.value);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter" || e.key == "Tab") {
      setShowEditText(false);
    }
  };
  const handleDBLClickText = () => {
    setShowEditText(true);
  };
  const handleClickSave = () => {
    let task = {
      userId: user._id,
      taskText: text,
      statusOfTask: "Новое",
      senderId: props.user._id,
    };
    console.log(task);
    dispatch(addNewTask(task));
  };
  return (
    <div className="taskCreateMainDiv">
      <div className="taskCreateGetter">
        <div className="taskCreateWho">Кому</div>
        <div className="taskCreateOrganization">
          <h4 className="taskCreateH4">Организация</h4>
          {showEditOrganization ? (
            <div className="taskCreateChoiseWrapper">
              <ChoiseList
                name="organization"
                arrlist={clientList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span
              className="taskCreateSpan"
              onDoubleClick={handleDBLClickOrganization}
            >
              {organization.name}
            </span>
          )}
        </div>
        <div className="taskCreateCoworker">
          <h4 className="taskCreateH4">Сщтрудник</h4>
          {showEditUser ? (
            <div className="taskCreateChoiseWrapper">
              <ChoiseList name="user" arrlist={userList} setValue={setValue} />
            </div>
          ) : (
            <span className="taskCreateSpan" onDoubleClick={handleDBLClickUser}>
              {user.name}
            </span>
          )}
        </div>
      </div>
      <div className="taskCreateMessage" onDoubleClick={handleDBLClickText}>
        {showEditText ? (
          <input
            type="text"
            className="taskCreateInput"
            value={text}
            onChange={handleChangeText}
            onKeyDown={handleEnter}
          />
        ) : (
          <span className="taskCreateSpan">{text}</span>
        )}
      </div>
      <button className="taskCreateBtn" onClick={handleClickSave}>
        Сохранить
      </button>
    </div>
  );
};
