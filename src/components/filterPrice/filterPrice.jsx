import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filterPrice.sass";

export const FilterPrice = (props) => {
  const [valueMinPrice, setValueMinPrice] = useState(props.minPrice);
  const [valueMaxPrice, setValueMaxPrice] = useState(props.maxPrice);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const handleChangeMinRange = (e) => {
    if (e.currentTarget.value >= props.minPrice) {
      setValueMinPrice(e.currentTarget.value);
      let elemScale =
        e.currentTarget.parentElement.parentElement.parentElement.children[0];
      let width = elemScale.children[0].clientWidth;
      let left = Math.floor(
        (e.currentTarget.value / (props.maxPrice - props.minPrice)) * width
      );
      if (left < width * 0.94) {
        elemScale.children[1].style.left = left + "px";
      } else {
        elemScale.children[1].style.left = width * 0.94 + "px";
      }
    }
  };
  const handleChangeMaxRange = (e) => {
    if (e.currentTarget.value <= props.maxPrice) {
      setValueMaxPrice(e.currentTarget.value);
      let elemScale =
        e.currentTarget.parentElement.parentElement.parentElement.children[0];
      let width = elemScale.children[0].clientWidth;
      let right = Math.floor(
        ((props.maxPrice - e.currentTarget.value) /
          (props.maxPrice - props.minPrice)) *
          width
      );
      if (right < width * 0.94) {
        elemScale.children[2].style.right = right + "px";
      } else {
        elemScale.children[2].style.right = width * 0.94 + "px";
      }
    }
  };

  const handleMouseDown = (e) => {
    setMouseDown(true);
    if (e.target.className == "filterPriceMinSlider") {
      let left = e.target.style.left.slice(0, -2);
      setStartX(e.clientX - Number(left));
    }
    if (e.target.className == "filterPriceMaxSlider") {
      let right = e.target.style.right.slice(0, -2);
      setEndX(e.clientX + Number(right));
    }
  };
  const handleMouseMove = (e) => {
    let width = e.target.parentElement.children[0].clientWidth;
    if (mouseDown) {
      if (e.target.className == "filterPriceMinSlider") {
        let left = e.pageX - startX;
        if (left >= 0) {
          setValueMinPrice(
            Math.floor((left / width) * (props.maxPrice - props.minPrice))
          );
          e.target.style.left = left + "px";
        }
      }
      if (e.target.className == "filterPriceMaxSlider") {
        let right = endX - e.pageX;
        if (right >= 0) {
          e.target.style.right = right + "px";
          setValueMaxPrice(
            Math.floor(
              ((width - right) / width) * (props.maxPrice - props.minPrice)
            )
          );
        }
      }
    }
  };
  const handleMouseUp = (e) => {
    setMouseDown(false);
  };

  const handleBtnClear = () => {
    props.closeFilter();
  };

  return (
    <div className="filterPriceMainDiv">
      <div>
        <div className="filterRangePrice">
          <div className="filterPriceScale"></div>
          <div
            className="filterPriceMinSlider"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>
          <div
            className="filterPriceMaxSlider"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>
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
        <button onClick={handleBtnClear}>Clear</button>
      </div>
    </div>
  );
};
