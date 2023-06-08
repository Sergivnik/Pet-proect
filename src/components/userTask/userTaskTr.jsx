import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import "./userTask.sass";

export const UserTaskTr = (props) => {
  let task = props.task;
  const userList = useSelector((state) => state.tasksReducer.userList);

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

  return (
    <tr
      className={styleTr(props.currentTaskId)}
      onClick={handleClickTr}
    >
      <td className="taskTableTd">
        {props.tabId == "taskTab1"
          ? findValueBy_Id(task.senderId, userList).name
          : findValueBy_Id(task.userId, userList).name}
      </td>
      <td className="taskTableTd">{task.taskText}</td>
      <td className="taskTableTd">{task.statusOfTask}</td>
    </tr>
  );
};
