import React, { useEffect, useState } from "react";
import "./filterList.sass";

export const FilterList = (props) => {
  const [text, setText] = useState("");
  const [list, setList] = useState(props.arrlist);

  return (
    <div className="filterDiv">
      <input type="text" value={text} />
      {list.map((elem) => {
        return (
          <div key={elem._id}>
            <p className="filterP">
              <input type="checkbox" value={elem.value} />
              {elem.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};
