import React, { useEffect, useState } from "react";

import "./userTrNew.sass";

export const FormAddDoc = (props) => {
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

  const handleGetFile = () => {
    let file = document.getElementById("inputFile").files[0];
    setPdfFile(file);
    setHrefFile(URL.createObjectURL(file));
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
      <h3>Документ</h3>
      <input type="file" id="inputFile" onChange={handleGetFile} />
      <embed src={hrefFile} width="100%" height="100%" />
    </div>
  );
};
