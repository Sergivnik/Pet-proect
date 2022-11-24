import React, { useEffect, useState } from "react";
import "./tdPointWithToolTip.sass";

export const TdPoinWithToolTip = (props) => {
  const pointsList = props.pointsList;
  const pointInfoList = props.pointInfoList;

  let mouseOut = false;

  const [showDetails, setShowDetails] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleMouseOver = (index) => {
    setCurrentIndex(index);
    mouseOut = false;
    setTimeout(() => {
      if (!mouseOut) setShowDetails(true);
    }, 1000);
    setTimeout(() => {
      setShowDetails(false);
    }, 5000);
  };
  const handleMouseLeave = () => {
    mouseOut = true;
    setCurrentIndex(null);
    setShowDetails(false);
  };
  return (
    <td className="pointWithToolTipTd">
      {pointsList.map((elem, index) => {
        return (
          <p
            key={`point${index}`}
            className="pointTdP"
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={handleMouseLeave}
          >
            {elem}
            {showDetails && currentIndex == index && (
              <span className="spanToolTip">
                {pointInfoList ? pointInfoList[index] : null}
              </span>
            )}
          </p>
        );
      })}
    </td>
  );
};
