import { Box, Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { SESSION_TIMEOUT } from "../constants";
import { logoutUser } from "../features/user/LoginLogoutUserSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var subtitle;

  const onIdle = () => {
    console.log("user is idle---");
    setModalIsOpen(true);
    sessionTimeoutRef.current = setTimeout(logout, 5000);
  };
  const stayActive = () => {
    setModalIsOpen(false);
    clearTimeout(sessionTimeoutRef.current);
  };
  const logout = () => {
    setModalIsOpen(false);
    dispatch(logoutUser());
    clearTimeout(sessionTimeoutRef.current);
    navigate("/login", { replace: true });
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={stayActive}
        onAfterOpen={afterOpenModal}
        contentLabel="User Inactive alert"
        ariaHideApp={false}
      >
        <Box component="span" m={1}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Hello! You've been idle for a while!
          </h2>
          <p>you will be logged out soon</p>
          {/* <div>Countdown: {seconds}</div> */}
        </Box>

        <div>
          <Box component="span" m={1}>
            <Button variant="outlined" color="secondary" onClick={logout}>
              Log me Out
            </Button>
          </Box>
          <Box component="span" m={1}>
            <Button variant="outlined" color="secondary" onClick={stayActive}>
              Keep me signed in
            </Button>
          </Box>
        </div>
      </Modal>
      <IdleTimer
        ref={idleTimerRef}
        timeout={SESSION_TIMEOUT}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
}

export default IdleTimerContainer;
