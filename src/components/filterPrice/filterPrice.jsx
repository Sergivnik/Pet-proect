import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filterPrice.sass";

export const FilterPrice = (props) => {
  const [valueMinPrice, setValueMinPrice] = useState(props.minPrice);
  const [valueMaxPrice, setValueMaxPrice] = useState(props.maxPrice);
  const [startX, setStartX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const handleChangeMinRange = (e) => {
    setValueMinPrice(e.currentTarget.value);
  };
  const handleChangeMaxRange = (e) => {
    setValueMaxPrice(e.currentTarget.value);
  };

  const handleMouseDpwn = (e) => {
    setMouseDown(true);
    if (startX == 0) setStartX(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (mouseDown) {
      e.target.style.left = e.pageX - startX + "px";
      console.log(e);
    }
  };
  const handleMouseUp = (e) => {
    setMouseDown(false);
  };

  return (
    <div className="filterPriceMainDiv">
      <div>
        <div className="filterRangePrice">
          <div
            className="test"
            onMouseDown={handleMouseDpwn}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>
          {/* <input
            className="filterInputRangePrice"
            type="range"
            max={valueMaxPrice}
            min={props.minPrice}
            value={valueMinPrice}
            onChange={handleChangeMinRange}
          />
          <input
            className="filterInputRangePrice"
            type="range"
            max={props.maxPrice}
            min={valueMinPrice}
            value={valueMaxPrice}
            onChange={handleChangeMaxRange}
          /> */}
        </div>
        <div className="filterDivInputPrice">
          <fieldset className="filterFieldset">
            <legend>Мин. цена</legend>
            <input
              className="filterInputPrice"
              value={valueMinPrice}
              onChange={handleChangeMinRange}
            />
            <span>руб</span>
          </fieldset>
          <fieldset className="filterFieldset">
            <legend>Макс. цена</legend>
            <input
              className="filterInputPrice"
              value={valueMaxPrice}
              onChange={handleChangeMaxRange}
            />
            <span>руб</span>
          </fieldset>
        </div>
      </div>
      <div>
        <button>Ok</button>
        <button>Clear</button>
      </div>
    </div>
  );
};
