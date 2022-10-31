import React, { useEffect, useState } from "react";
import "./tdWithToolTip.sass";

export const TdWithToolTip = (props) => {
  const value = props.value;
  const toolTip = props.toolTip;

  let mouseOut = false;

  const [showDetails, setShowDetails] = useState(false);

  const handleMouseOver = () => {
    mouseOut = false;
    setTimeout(() => {
      if (!mouseOut) setShowDetails(true);
    }, 500);
    setTimeout(() => {
      setShowDetails(false);
    }, 5000);
  };
  const handleMouseLeave = () => {
    mouseOut = true;
    setShowDetails(false);
  };
  return (
    <td
      className="toolTipsTd"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {value ? value : null}
      {showDetails && (
        <div className="divToolTip">{toolTip ? toolTip : null}</div>
      )}
    </td>
  );
};
