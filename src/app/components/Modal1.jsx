"use client"

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modalstyles from "../styles/Modal.module.css";
import Fileinput from "@/app/components/Fileinput";


const MyModal1 = ({ closeModal, handleCloseButton , fetchImageList }) => {

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
      
<Fileinput  fetchImageList ={fetchImageList} />

        </div>

        <div className={Modalstyles.modal03}>{handleCloseButton}</div>

      </div>
    </>,
    document.getElementById("myPortalModalDiv")
  );
};

export default MyModal1;
