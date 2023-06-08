import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataTasks } from "../../actions/tasksActions";
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

  const handleTabDivClick = (e) => {
    let taskId = e.currentTarget.id;
    setTabId(taskId);
    if (taskId == "taskTab1") {
      let taskList = taskListFull.filter((task) => task.userId == user._id);
      setTaskList(taskList);
    }
    if (taskId == "taskTab2") {
      let taskList = taskListFull.filter((task) => task.senderId == user._id);
      setTaskList(taskList);
    }
  };

  useEffect(() => {
    let taskList = taskListFull.filter((task) => task.userId == user._id);
    setTaskList(taskList);
  }, [taskListFull]);
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
              <button className="tasksMenuBtn">Прочитано</button>
              <button className="tasksMenuBtn">Выполнено</button>
            </React.Fragment>
          )}
          {tabId == "taskTab2" && (
            <React.Fragment>
              <button className="tasksMenuBtn">Проверено</button>
              <button className="tasksMenuBtn">Удалить</button>
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
              <td className="taskTableTd">Статус</td>
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
