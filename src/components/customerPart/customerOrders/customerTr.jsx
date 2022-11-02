import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TdPoinWithToolTip } from "../../myLib/tdPointWithToolTip/tdPointWithToolTip.jsx";
import { TdWithToolTip } from "../../myLib/tdWithToolTip/tdWithToolTip.jsx";
import { TdDate } from "../../userTd/tdDate.jsx";
import "./customerOrders.sass";

export const CustomerTr = (props) => {
  const managerList = useSelector((state) => state.customerReducer.managerList);
  const driversList = useSelector((state) => state.customerReducer.driversList);
  const trackList = useSelector((state) => state.customerReducer.trackList);
  const citiesList = useSelector((state) => state.customerReducer.citiesList);
  const storelist = useSelector((state) => state.customerReducer.storelist);

  let elem = props.elem;

  const [manager, setManager] = useState(null);
  const [driver, setDriver] = useState(null);
  const [track, setTrack] = useState(null);
  const [loadingList, setLoadingList] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState([]);
  const [unLoadingList, setUnloadingList] = useState([]);
  const [unloadingInfo, setUnloadingInfo] = useState([]);

  useEffect(() => {
    let currentManager = managerList.find(
      (manager) => manager._id == elem.idManager
    );
    setManager(currentManager);
    let currentDriver = driversList.find(
      (driver) => driver._id == elem.idTrackDriver
    );
    setDriver(currentDriver);
    let currentTrack = trackList.find((track) => track._id == elem.idTrack);
    setTrack(currentTrack);
    let loadingList = elem.idLoadingPoint;
    let citiesArr = [];
    loadingList.forEach((point) => {
      citiesArr.push(citiesList.find((city) => point == city._id).value);
    });
    setLoadingList(citiesArr);
    setLoadingInfo(elem.loadingInfo);
    let unloadingList = elem.idUnloadingPoint;
    citiesArr = [];
    unloadingList.forEach((point) => {
      citiesArr.push(citiesList.find((city) => point == city._id).value);
    });
    setUnloadingList(citiesArr);
    setUnloadingInfo(elem.loadingInfo);
  }, []);

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
      <TdPoinWithToolTip pointsList={loadingList} pointInfoList={loadingInfo} />
      <TdPoinWithToolTip
        pointsList={unLoadingList}
        pointInfoList={unloadingInfo}
      />
      <td className="customerOrderTd">{elem.customerPrice}</td>
      <td className="customerOrderTd">{elem.document}</td>
      <td className="customerOrderTd">{elem.customerPayment}</td>
    </tr>
  );
};
