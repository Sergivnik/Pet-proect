import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TdWithToolTip } from "../../myLib/tdWithToolTip/tdWithToolTip.jsx";
import { TdDate } from "../../userTd/tdDate.jsx";
import "./customerOrders.sass";

export const CustomerTr = (props) => {
  const managerList = useSelector((state) => state.customerReducer.managerList);
  const driversList = useSelector((state) => state.customerReducer.driversList);
  const trackList = useSelector((state) => state.customerReducer.trackList);

  let elem = props.elem;
  let mouseOut = true;

  const [manager, setManager] = useState(null);
  const [driver, setDriver] = useState(null);
  const [track, setTrack] = useState(null);
  const [showDetailsManager, setShowDetailsManager] = useState(false);
  const [showDetailsDriver, setShowDetailsDriver] = useState(false);

  useEffect(() => {
    let currentManager = managerList.find(
      (manager) => manager._id == elem.idManager
    );
    let currentDriver = driversList.find(
      (driver) => driver._id == elem.idTrackDriver
    );
    let currentTrack = trackList.find((track) => track._id == elem.idTrack);
    setManager(currentManager);
    setDriver(currentDriver);
    setTrack(currentTrack);
  }, [managerList]);

  const handleMouseOverManager = () => {
    mouseOut = false;
    setTimeout(() => {
      if (!mouseOut) setShowDetailsManager(true);
    }, 500);
    setTimeout(() => {
      setShowDetailsManager(false);
    }, 5000);
  };
  const handleMouseOverDriver = () => {
    mouseOut = false;
    setTimeout(() => {
      if (!mouseOut) setShowDetailsDriver(true);
    }, 500);
    setTimeout(() => {
      setShowDetailsDriver(false);
    }, 5000);
  };
  const handleMouseLeave = () => {
    mouseOut = true;
    setShowDetailsManager(false);
    setShowDetailsDriver(false);
  };
  return (
    <tr>
      <TdDate date={elem.date} />
      <TdWithToolTip
        value={manager ? manager.value : null}
        toolTip={manager ? manager.name : null}
      />
      <TdWithToolTip
        value={driver ? driver.name : null}
        toolTip={track ? `${track.model} ${track.value}` : null}
      />
    </tr>
  );
};
