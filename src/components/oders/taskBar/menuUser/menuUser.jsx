import React, { useEffect, useState } from "react";
import "../../oders.sass";

export const MenuUser = (props) => {
  let tasksNumber = props.tasksNumber;
  let user = props.user;
  let showTimeout;
  let hideTimeout;
  const [isHovered, setIsHovered] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearTimeout(hideTimeout);
  };

  const handleMouseLeave = () => {
    if (isTooltipVisible) {
      clearTimeout(showTimeout);
      hideTimeout = setTimeout(() => {
        setIsTooltipVisible(false);
        setIsHovered(false);
      }, 3000);
    } else {
      setIsHovered(false);
      setIsTooltipVisible(false);
      clearTimeout(showTimeout);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);
  useEffect(() => {
    showTimeout = setTimeout(() => {
      if (isHovered) {
        setIsTooltipVisible(true);
      }
    }, 1000);
  }, [isHovered]);
  return (
    <div className="orderMenuUser">
      {tasksNumber != null && tasksNumber != 0 && (
        <div className="orderMenuUserCircle" onClick={props.handleClickTasks}>
          {tasksNumber}
        </div>
      )}
      <span
        className="orderMenuUserSpan"
        onClick={props.handleClickUser}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {user.name}
        {isTooltipVisible && isHovered && (
          <div className="tooltip">
            Для входа в список заданий нажать ctrl+З
          </div>
        )}
      </span>
      <button className="orderMenuUserBtn" onClick={props.handleClickExit}>
        Выйти
      </button>
    </div>
  );
};
