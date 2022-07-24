import React, { useEffect, useState } from "react";
import { ChoiseList } from "../../choiseList/choiseList.jsx";
import "./spanWithList.sass";

export const SpanWithList = (props) => {
  const list = props.list;
  const id = props.id;
  const filedId = props.filedId;
  const fieldPrint = props.fieldPrint;
  const name = props.name;

  const [showList, setShowList] = useState(false);
  const [fieldValue, setFieldValue] = useState(null);

  useEffect(() => {
    if (id != null) {
      let elem = list.find((elem) => elem[filedId] == id);
      setFieldValue(elem[fieldPrint] ? elem[fieldPrint] : elem["value"]);
    }
  }, [id]);

  const setValue = (data) => {
    console.log(data);
    setShowList(false);
    props.getId(data._id, name);
  };
  const handleDblClick = () => {
    setShowList(true);
  };
  const handleBlur = () => {
    setShowList(false);
  };
  return (
    <span className="mySpan" onDoubleClick={handleDblClick}>
      {showList ? (
        <div className="mySpanDivChoise" onBlur={handleBlur}>
          <ChoiseList
            arrlist={list}
            name={name}
            setValue={setValue}
            parent={"oders"}
          />
        </div>
      ) : (
        fieldValue
      )}
    </span>
  );
};
