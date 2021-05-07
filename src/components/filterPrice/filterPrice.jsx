import React, { useEffect, useState } from "react";
import "./filterPrice.sass";

export const FilterPrice = (props) => {
  return (
    <div className="filterPriceMainDiv">
      <div>
        <input type="range" />
        <input type="range" />
      </div>
      <div>
        <button>Ok</button>
        <button>Clear</button>
      </div>
    </div>
  );
};
