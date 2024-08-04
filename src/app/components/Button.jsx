import Link from 'next/link'
import React from 'react'
import buttonstyle from "../styles/Button.module.css"


function Button(props) {
  return <button className={buttonstyle.button}> <Link className={buttonstyle.link} href={props.href}>{props.text}</Link></button>
}

export default Button