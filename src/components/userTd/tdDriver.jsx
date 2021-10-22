import React, { useState } from "react";

export const TdDriver = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleMouseOver = (e) => {
    console.log(props);
    setShowDetails(true);
  };
  const handleMouseLeave = () => {
    setShowDetails(false);
  };
  return (
    <td
      className="odersTd"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {props.driver}
      {showDetails && <div className="oderTdTooltip">{props.elem.idTrackDriver}</div>}
    </td>
  );
};
