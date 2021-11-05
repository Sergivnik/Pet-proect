import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./userTd.sass";

export const TdCustomer = (props) => {
   const dispatch = useDispatch();
   const clientList = useSelector((state) => state.oderReducer.clientList);
   const clientmanager = useSelector(
     (state) => state.oderReducer.clientmanager
   );
   const [showDetails, setShowDetails] = useState(false);
   const [showEdit, setShowEdit] = useState(false);
   const [currentId, setCurrentId] = useState(null);
   const [currentElement, setCurrentElement] = useState(null);
   const getValue = (id, arrObj) => {
     if (id) {
       let value = arrObj.find((elem) => elem._id == id);
       return value.value;
     }
   };
   const handleMouseOver = () => {
     if (props.idManager) setShowDetails(true);
   };
   const handleMouseLeave = () => {
     setShowDetails(false);
   };
   const handleDBLClick = (e) => {
     let element = e.currentTarget;
     if (props.edit) {
       setShowEdit(true);
       e.currentTarget.parentElement.style.backgroundColor = "#fff";
       setCurrentId(e.currentTarget.parentElement.id);
       setCurrentElement(element);
     }
   };
   const setValue = (data) => {
     console.log(currentId, "oders", data._id);
     dispatch(editOder(currentId, "oders", data._id));
     setShowEdit(false);
     setCurrentId(null);
     setCurrentElement(null);
   };
   const handleESC = (e) => {
     if (e.code == "Escape") {
       setShowEdit(false);
       setCurrentId(null);
       setCurrentElement(null);
     }
   };
   useEffect(() => {
     if (currentElement) currentElement.firstChild.firstChild.focus();
   }, [currentElement]);
   useEffect(() => {
     if (props.currentTR != currentId) {
       setShowEdit(false);
       setCurrentId(null);
     }
   }, [props.currentTR]);
   return (
     <td
       className="userTd"
       onMouseOver={handleMouseOver}
       onMouseLeave={handleMouseLeave}
       onDoubleClick={handleDBLClick}
       onKeyDown={handleESC}
     >
       {showEdit ? (
         <div className="divChoise">
           <ChoiseList name="oders" arrlist={clientList} setValue={setValue} />
         </div>
       ) : (
         getValue(props.idCustomer, clientList)
       )}
       {showDetails && (
         <div className="oderTdTooltip">
           {getValue(props.idManager, clientmanager)}
         </div>
       )}
     </td>
   );
 };