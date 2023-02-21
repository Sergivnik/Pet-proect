import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../../choiseList/choiseList.jsx";
import "./customerApps.sass";

export const AppCustomerDriverPart = (props) => {
  const driverList = useSelector((state) => state.oderReducer.driverlist);
  const trackDriverListFull = useSelector(
    (state) => state.oderReducer.trackdrivers
  );
  const trackListFull = useSelector((state) => state.oderReducer.tracklist);
  const customerList = useSelector((state) => state.oderReducer.clientList);
  const managerListFull = useSelector(
    (state) => state.oderReducer.clientmanager
  );
  const appList = useSelector((state) => state.customerReducer.customerOrders);

  const [trackDriverList, setTrackDriverList] = useState(trackDriverListFull);
  const [trackList, setTrackList] = useState(trackListFull);
  const [showInputDriver, setShowInputDiver] = useState(true);
  const [showInputTrackDriver, setShowInputTrackDiver] = useState(true);
  const [showInputTrack, setShowInputTrack] = useState(true);
  const [showInputCustomer, setShowInputCustomer] = useState(true);
  const [showInputManager, setShowInputManager] = useState(true);
  const [driver, setDriver] = useState(null);
  const [trackDriver, setTrackDriver] = useState(null);
  const [track, setTrack] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [managerList, setManagerList] = useState(managerListFull);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    if (props.id) {
      let app = appList.find((app) => app._id == props.id);
      if (app.idDriver) {
        let driver = driverList.find((driver) => driver._id == app.idDriver);
        setDriver(driver);
        setShowInputDiver(false);
      }
      if (app.idTrackDriver) {
        let trackDriver = trackDriverListFull.find(
          (trackDriver) => trackDriver._id == app.idTrackDriver
        );
        setTrackDriver(trackDriver);
        setShowInputTrackDiver(false);
      }
      if (app.idTrack) {
        let track = trackListFull.find((track) => track._id == app.idTrack);
        setTrack(track);
        setShowInputTrack(false);
      }
      if (app.customerId) {
        let customer = customerList.find(
          (customer) => customer._id == app.customerId
        );
        setCustomer(customer);
        setShowInputCustomer(false);
      }
      if (app.idManager) {
        let manager = managerListFull.find(
          (manager) => manager._id == app.idManager
        );
        setManager(manager);
        setShowInputManager(false);
      }
    }
  }, [props.id]);
  const setValue = (data) => {
    if (data.field == "driver") {
      let driver = driverList.find((driver) => driver._id == data._id);
      setDriver(driver);
      setShowInputDiver(false);
      props.getDriverData(data);
      let shortArr = trackDriverListFull.filter(
        (trackDriver) => trackDriver.idOwner == data._id
      );
      setTrackDriverList(shortArr);
      shortArr = trackListFull.filter((track) => track.idOwner == data._id);
      setTrackList(shortArr);
    }
    if (data.field == "trackDriver") {
      let trackDriver = trackDriverList.find(
        (trackDriver) => trackDriver._id == data._id
      );
      setTrackDriver(trackDriver);
      data.idTrack = trackDriver.idTrack;
      setShowInputTrackDiver(false);
      props.getDriverData(data);
      let track = trackList.find((track) => track._id == trackDriver.idTrack);
      setTrack(track);
      setShowInputTrack(false);
    }
    if (data.field == "track") {
      props.getDriverData(data);
      setTrack(data);
      setShowInputTrack(false);
    }
    if (data.field == "customer") {
      let customer = customerList.find((customer) => customer._id == data._id);
      setCustomer(customer);
      setShowInputCustomer(false);
      props.getCustomerData(data);
      let managerList = managerListFull.filter(
        (manager) => manager.odersId == data._id
      );
      setManagerList(managerList);
    }
    if (data.field == "manager") {
      let manager = managerList.find((manager) => manager._id == data._id);
      setManager(manager);
      setShowInputManager(false);
      props.getCustomerData(data);
    }
  };
  const handleGetFocus = (e) => {
    let list = document.querySelectorAll(".InputPartDiv");
    list.forEach((dir) => {
      dir.style.zIndex = 0;
    });
    e.currentTarget.style.zIndex = 1;
  };
  const handleLostFocus = (e) => {
    e.currentTarget.style.zIndex = 0;
  };
  const handleDblClickDriver = (e) => {
    e.preventDefault();
    setShowInputDiver(true);
    setShowInputTrackDiver(true);
    setShowInputTrack(true);
  };
  const handleDblClickTrackDriver = (e) => {
    e.preventDefault();
    setShowInputTrackDiver(true);
  };
  const handleDblClickTrack = (e) => {
    e.preventDefault();
    setShowInputTrack(true);
  };
  const handleDblClickCustomer = (e) => {
    e.preventDefault();
    setShowInputCustomer(true);
    setShowInputManager(true);
  };
  const handleDblClickManager = (e) => {
    e.preventDefault();
    setShowInputManager(true);
  };

  return (
    <div className="containerDriverCustomerDiv">
      <div className="driverPartDiv">
        <h4 className="driverPartHeadline">Данные перевозчика</h4>
        <div
          className="InputPartDiv"
          onFocus={handleGetFocus}
          onBlur={handleLostFocus}
        >
          <div className="driverPartSpanWraper">
            <span>Перевозчик</span>
          </div>
          {showInputDriver ? (
            <div className="choiseListWrap">
              <ChoiseList
                name="driver"
                arrlist={driverList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span className="spanInput" onDoubleClick={handleDblClickDriver}>
              {driver ? driver.value : null}
            </span>
          )}
        </div>
        <div
          className="InputPartDiv"
          onFocus={handleGetFocus}
          onBlur={handleLostFocus}
        >
          <div className="driverPartSpanWraper">
            <span>Водитель</span>
          </div>
          {showInputTrackDriver ? (
            <div className="choiseListWrap">
              <ChoiseList
                name="trackDriver"
                arrlist={trackDriverList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span
              className="spanInput"
              onDoubleClick={handleDblClickTrackDriver}
            >
              {trackDriver ? trackDriver.value : null}
            </span>
          )}
        </div>
        <div
          className="InputPartDiv"
          onFocus={handleGetFocus}
          onBlur={handleLostFocus}
        >
          <div className="driverPartSpanWraper">
            <span>А/М</span>
          </div>
          {showInputTrack ? (
            <div className="choiseListWrap">
              <ChoiseList
                name="track"
                arrlist={trackList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span className="spanInput" onDoubleClick={handleDblClickTrack}>
              {track ? track.value : null}
            </span>
          )}
        </div>
      </div>
      <div className="customerPartDiv">
        <h4 className="customerPartHeadline">Данные заказчика</h4>
        <div
          className="InputPartDiv"
          onFocus={handleGetFocus}
          onBlur={handleLostFocus}
        >
          <div className="customerPartSpanWraper">
            <span>Заказчик</span>
          </div>
          {showInputCustomer ? (
            <div className="choiseListWrap">
              <ChoiseList
                name="customer"
                arrlist={customerList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span className="spanInput" onDoubleClick={handleDblClickCustomer}>
              {customer ? customer.value : null}
            </span>
          )}
        </div>
        <div
          className="InputPartDiv"
          onFocus={handleGetFocus}
          onBlur={handleLostFocus}
        >
          <div className="customerPartSpanWraper">
            <span>Менеджер</span>
          </div>
          {showInputManager ? (
            <div className="choiseListWrap">
              <ChoiseList
                name="manager"
                arrlist={managerList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span className="spanInput" onDoubleClick={handleDblClickManager}>
              {manager ? manager.value : null}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
