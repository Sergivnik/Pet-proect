import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delTask, editTask, getDataTasks } from "../../actions/tasksActions";
import { UserTaskTr } from "./userTaskTr.jsx";
import { UserWindow } from "../userWindow/userWindow.jsx";
import { UserCreateTask } from "./userTaskCreate.jsx";
import "./userTask.sass";

export const UserTaskTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataTasks());
  }, []);
  const taskListFull = useSelector((state) => state.tasksReducer.taskList);
  const userList = useSelector((state) => state.tasksReducer.userList);
  const statusOfRequest = useSelector(
    (state) => state.tasksReducer.statusOfRequest
  );
  const user = useSelector((state) => state.oderReducer.currentUser);
  let clientList = [];
  if (
    user.role == "admin" ||
    user.role == "accounter" ||
    user.role == "logist"
  ) {
    clientList = useSelector((state) => state.oderReducer.clientList);
  } else {
    //сформировать список получателей из коллег и диспетчера
  }
  //console.log(taskList, userList, user);

  const [tabId, setTabId] = useState("taskTab1");
  const [taskList, setTaskList] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [showCreateWindow, setShowCreateWindow] = useState(false);
  const [statusCheck, setStatusCheck] = useState({
    new: true,
    read: true,
    complete: true,
    checked: true,
  });

  const checkStatusCheck = (statusOfTask, tab) => {
    let check = false;
    if (statusOfTask == "Новое" && statusCheck.new) check = true;
    if (statusOfTask == "Прочитано" && statusCheck.read) check = true;
    if (statusOfTask == "Выполнено" && statusCheck.complete) check = true;
    if (statusOfTask == "Проверено" && statusCheck.checked) {
      if (tab == "taskTab1") check = false;
      if (tab == "taskTab2") check = true;
    }
    return check;
  };

  const handleTabDivClick = (e) => {
    let tab = e.currentTarget.id;
    setTabId(tab);
    if (tab == "taskTab1") {
      let [...taskList] = taskListFull.filter(
        (task) =>
          task.userId == user._id && checkStatusCheck(task.statusOfTask, tab)
      );
      setTaskList(taskList);
    }
    if (tab == "taskTab2") {
      let [...taskList] = taskListFull.filter(
        (task) =>
          task.senderId == user._id && checkStatusCheck(task.statusOfTask, tab)
      );
      setTaskList(taskList);
    }
  };

  useEffect(() => {
    let [...taskList] = taskListFull.filter(
      (task) =>
        task.userId == user._id &&
        (task.statusOfTask == "Новое" ||
          task.statusOfTask == "Прочитано" ||
          task.statusOfTask == "Выполнено")
    );
    setTaskList(taskList);
  }, []);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setCurrentTaskId(null);
        setShowCreateWindow(false);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [currentTaskId, showCreateWindow]);
  useEffect(() => {
    if (tabId == "taskTab1") {
      let [...taskList] = taskListFull.filter(
        (task) =>
          task.userId == user._id && checkStatusCheck(task.statusOfTask, tabId)
      );
      setTaskList(taskList);
    }
    if (tabId == "taskTab2") {
      let [...taskList] = taskListFull.filter(
        (task) =>
          task.senderId == user._id &&
          checkStatusCheck(task.statusOfTask, tabId)
      );
      setTaskList(taskList);
    }
  }, [statusCheck, taskListFull]);

  const taskTabDivStyle = (id) => {
    if (id == tabId) {
      return "taskTabDiv borderBottomWhite";
    } else {
      return "taskTabDiv";
    }
  };
  const getCurrentTaskId = (id) => {
    setCurrentTaskId(id);
  };
  const handleClickBtnCreate = () => {
    setShowCreateWindow(true);
  };
  const handleClickUserWindowClose = () => {
    setShowCreateWindow(false);
  };
  const hendleClickRead = () => {
    if (currentTaskId != null) {
      dispatch(editTask(currentTaskId, "statusOfTask", "Прочитано"));
    } else {
      alert("Не выбрано задание!");
    }
  };
  const handleClickComplete = () => {
    if (currentTaskId != null) {
      dispatch(editTask(currentTaskId, "statusOfTask", "Выполнено"));
    } else {
      alert("Не выбрано задание!");
    }
  };
  const handleClickCheck = () => {
    if (currentTaskId != null) {
      dispatch(editTask(currentTaskId, "statusOfTask", "Проверено"));
    } else {
      alert("Не выбрано задание!");
    }
  };
  const handleClickDelete = () => {
    if (currentTaskId != null) {
      dispatch(delTask(currentTaskId));
    } else {
      alert("Не выбрано задание!");
    }
  };
  const handleChangeCheck = (e) => {
    let name = e.currentTarget.name;
    let status = { ...statusCheck };
    status[name] = !status[name];
    setStatusCheck(status);
  };
  return (
    <div className="taskTableContainer">
      <header className="tasksHeader">
        <div className="tasksTabContainer">
          <div
            className={taskTabDivStyle("taskTab1")}
            onClick={handleTabDivClick}
            id="taskTab1"
          >
            Здания полученные
          </div>
          <div
            className={taskTabDivStyle("taskTab2")}
            onClick={handleTabDivClick}
            id="taskTab2"
          >
            Здания выданные
          </div>
        </div>
        <menu className="tasksBtnContainer">
          <button className="tasksMenuBtn" onClick={handleClickBtnCreate}>
            Создать
          </button>
          {tabId == "taskTab1" && (
            <React.Fragment>
              <button className="tasksMenuBtn" onClick={hendleClickRead}>
                Прочитано
              </button>
              <button className="tasksMenuBtn" onClick={handleClickComplete}>
                Выполнено
              </button>
            </React.Fragment>
          )}
          {tabId == "taskTab2" && (
            <React.Fragment>
              <button className="tasksMenuBtn" onClick={handleClickCheck}>
                Проверено
              </button>
              <button className="tasksMenuBtn" onClick={handleClickDelete}>
                Удалить
              </button>
            </React.Fragment>
          )}
        </menu>
      </header>
      <main className="taskTableMain">
        <table className="taskTable">
          <thead>
            <tr>
              <td className="taskTableTd">
                {tabId == "taskTab1" ? "Отправитель" : "Получатель"}
              </td>
              <td className="taskTableTd">Задание</td>
              <td className="taskTableTd">
                <span>Статус</span>
                <div className="taskTableCheckContainer">
                  <label>
                    <input
                      type="checkbox"
                      checked={statusCheck.new}
                      name="new"
                      onChange={handleChangeCheck}
                    />
                    Новые
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={statusCheck.read}
                      name="read"
                      onChange={handleChangeCheck}
                    />
                    Прочитан
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={statusCheck.complete}
                      name="complete"
                      onChange={handleChangeCheck}
                    />
                    Выполнен
                  </label>
                  {tabId == "taskTab2" && (
                    <label>
                      <input
                        type="checkbox"
                        checked={statusCheck.checked}
                        name="checked"
                        onChange={handleChangeCheck}
                      />
                      Проверен
                    </label>
                  )}
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => {
              return (
                <UserTaskTr
                  key={`taskTr${task._id}`}
                  task={task}
                  tabId={tabId}
                  currentTaskId={currentTaskId}
                  getCurrentTaskId={getCurrentTaskId}
                />
              );
            })}
          </tbody>
        </table>
        {showCreateWindow && (
          <UserWindow
            header="Создать задание"
            width={700}
            height={370}
            left="20%"
            top="15%"
            handleClickWindowClose={handleClickUserWindowClose}
            windowId="createTaskWindow"
          >
            <UserCreateTask
              clientList={clientList}
              userList={userList}
              user={user}
              handleClickWindowClose={handleClickUserWindowClose}
            />
          </UserWindow>
        )}
      </main>
      {statusOfRequest != null && (
        <div className="requestStatusDiv">Loading...</div>
      )}
    </div>
  );
};
