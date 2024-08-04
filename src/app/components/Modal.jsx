"use client"

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modalstyles from "../styles/Modal.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


const MyModal = ({ closeModal, handleCloseButton }) => {
  const [isSignup, setIsSignup] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={Modalstyles.modaloverlay} onClick={closeModal}></div>
  

      <div className={Modalstyles.modalcontent}>

        <div className={Modalstyles.modal02}>
        {isSignup ? (
                <RegisterForm setIsSignup={setIsSignup} />
            ) : (
                <LoginForm setIsSignup={setIsSignup} />
            )} 
        </div>

        <div className={Modalstyles.modal03}>{handleCloseButton}</div>

      </div>
    </>,
    document.getElementById("myPortalModalDiv")
  );
};

export default MyModal;
