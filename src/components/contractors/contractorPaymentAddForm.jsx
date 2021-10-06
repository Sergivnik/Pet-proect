import React, { useEffect, useState } from "react";
import "./contractorForm.sass";

export const ContractorAddForm = () => {
  useEffect(() => {
    let div = document.getElementsByClassName("contrPayAddDiv")[0];
    div.style.height = "50%";
    div.style.width = "80%";
    div.style.top = "25%";
    div.style.left = "10%";
    div.style.opacity = 0.95;
  }, []);
  return <div className="contrPayAddDiv">some</div>;
};
