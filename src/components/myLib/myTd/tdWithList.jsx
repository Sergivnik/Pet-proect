import React, { useEffect, useState } from "react";
import { ChoiseList } from "../../choiseList/choiseList.jsx";
import "./userTd.sass";

export const TdWithList = (props) => {
  const list = props.list;
  const id = props.id;
  const filedId = props.filedId;
  const field = props.field;
  const name = props.name;

  const [showList, setShowList] = useState(false);
  const [fieldValue, setFieldValue] = useState(null);

  useEffect(() => {
    if (id != null) {
      let elem = list.find((elem) => elem[filedId] == id);
      setFieldValue(elem[field]);
    }
  }, [id]);

  const setValue = (data) => {
    data.name = data.field;
    data.id = data._id;
    props.callBack(data);
    setShowList(false);
  };
  const handleDblClick = () => {
    setShowList(true);
  };
  return (
    <td className="myTd" onDoubleClick={handleDblClick}>
      {showList ? (
        <div className="myTdDivChoise">
          <ChoiseList
            arrlist={list}
            name={name}
            setValue={setValue}
            parent={props.showChoise ? "oders" : ""}
          />
        </div>
      ) : (
        fieldValue
      )}
    </td>
  );
};
