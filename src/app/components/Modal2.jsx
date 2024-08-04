"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Modalstyles from "../styles/Modal.module.css";
import Image from "next/image";

const MyModal2 = ({ closeModal, handleCloseButton, docUrl, metadata }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const isPdf = metadata?.contentType === "application/pdf";

  return ReactDOM.createPortal(
    <>
      <div className={Modalstyles.modaloverlay} onClick={closeModal}></div>

      <div className={Modalstyles.modalcontent}>
        <div className={Modalstyles.modal02}>
          {docUrl && (
            isPdf ? (
              <iframe
                src={docUrl}
                title="PDF Document"
                width="100%"
                height="500px"
                style={{ border: "none" }}
              />
            ) : (
              <Image src={docUrl} alt="Document" height={500} width={400} />
            )
          )}
        </div>

        <div className={Modalstyles.modal03}>{handleCloseButton}</div>
      </div>
    </>,
    document.getElementById("myPortalModalDiv")
  );
};

export default MyModal2;
