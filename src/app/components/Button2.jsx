import React from 'react';
import buttonstyle from "../styles/Button.module.css";
import Image from 'next/image';

function Button2(props) {
  const buttonClass = props.color === "red" ? buttonstyle.button02 : buttonstyle.button2;

  return (
    <button className={buttonClass} onClick={props.onClick}>
      <Image src={props.img} alt="button" height={15} width={15} /> {props.text}
    </button>
  );
}

export default Button2;
