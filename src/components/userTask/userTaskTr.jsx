import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import "./userTask.sass";
import { editData } from "../../actions/editDataAction";

export const UserTaskTr = (props) => {
  const dispatch = useDispatch();
  let task = props.task;

  const userList = useSelector((state) => state.tasksReducer.userList);

  const [taskText, setTaskText] = useState(task.taskText);
  const [editTextTask, setEditTextTask] = useState(false);

  const styleTr = (currentId) => {
    if (currentId == task._id) {
      return "backGroundColorGrey";
    } else {
      return "";
    }
  };
  const handleClickTr = () => {
    props.getCurrentTaskId(task._id);
  };
  const handleDblClickTask = () => {
    setEditTextTask(true);
  };
  const handleChangeTask = (e) => {
    setTaskText(e.target.value);
  };
  const handleEnterTask = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Предотвращаем стандартное поведение клавиш
      setEditTextTask(false);
      let newTask = { ...task };
      newTask.taskText = taskText;
      dispatch(editData(newTask, "taskstable"));
    }
  };

  return (
    <tr className={styleTr(props.currentTaskId)} onClick={handleClickTr}>
      <td className="taskTableTd">
        {props.tabId == "taskTab1"
          ? findValueBy_Id(task.senderId, userList).name
          : findValueBy_Id(task.userId, userList).name}
      </td>
      <td className="taskTableTd">
        {editTextTask ? (
          <input
            type="text"
            value={taskText}
            onChange={handleChangeTask}
            onKeyDown={handleEnterTask}
            className="editableInput"
            autoFocus
          />
        ) : (
          <span onDoubleClick={handleDblClickTask}>{taskText}</span>
        )}
      </td>
      <td className="taskTableTd">{task.statusOfTask}</td>
    </tr>
  );
};
