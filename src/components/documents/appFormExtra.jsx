import React, { useEffect, useState } from "react";
import { AppForm } from "./appForm.jsx";
import "./billsForm.sass";

export const AppFormExtra = (props) => {
  const getEditData = () => {};
  return (
    <div>
      <AppForm
        dataDoc={{ number: null, odersListId: [props.id] }}
        id={1}
        stamp={true}
        getEditData={getEditData}
        //currentDate={appData.date}
      />
    </div>
  );
};
