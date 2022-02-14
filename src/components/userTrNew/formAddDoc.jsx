import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addConsignmentNote } from "../../actions/documentAction";

import "./userTrNew.sass";

export const FormAddDoc = (props) => {
  const dispatch = useDispatch();
  let TD = props.TD;
  let divFormWidth = 800;
  let divFormHeight = 500;
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  let leftTD = TD.getBoundingClientRect().left;
  let topTD = TD.getBoundingClientRect().top;
  let divFormLeft = windowWidth / 2 - divFormWidth / 2 - leftTD;
  let divFormTop = windowHeight / 2 - divFormHeight / 2 - topTD;

  const [pdfFile, setPdfFile] = useState(null);
  const [hrefFile, setHrefFile] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  const handleGetFile = () => {
    let file = document.getElementById("inputFile").files[0];
    if (file.type === "application/pdf") {
      setPdfFile(file);
      setHrefFile(URL.createObjectURL(file));
      setShowInput(false);
      setShowBtn(true);
    } else {
      alert("Выбранный файл должен быть pdf");
    }
  };
  const handleClickClose = () => {
    props.handleClickClose();
  };
  const handleClickSave = () => {
    dispatch(addConsignmentNote(props.currentId, pdfFile));
    props.handleClickClose();
  };

  return (
    <div
      style={{
        left: divFormLeft + "px",
        width: divFormWidth + "px",
        height: divFormHeight + "px",
        top: divFormTop + "px",
      }}
      className="formAddDocMainDiv"
    >
      <header className="formAddDocHeaser">
        <h3 className="formAddDocHeaderH3">Документ</h3>
        <svg width="20px" height="20px" onClick={handleClickClose}>
          <rect
            x="5%"
            y="48.5%"
            width="90%"
            height="10%"
            transform="rotate(45)"
          />
          <rect
            x="5%"
            y="48.5%"
            width="90%"
            height="10%"
            transform="rotate(-45)"
          />
        </svg>
      </header>
      {showInput && (
        <input
          type="file"
          id="inputFile"
          name="fileData"
          onChange={handleGetFile}
        />
      )}
      {showBtn && <button onClick={handleClickSave}>Добавить</button>}
      <embed type="application/pdf" src={hrefFile} width="100%" height="100%" />
    </div>
  );
};
