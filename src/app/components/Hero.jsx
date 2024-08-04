import React from 'react'
import herostyles from "../styles/Hero.module.css"
import Image from 'next/image'

function Hero() {
  return (
    <>
    <div className={herostyles.maindiv} >
<h1 className={herostyles.maintitle}> ShareVault </h1>
<h4 className={herostyles.subtitle}> Safe, Simple, Secure Document Management</h4>
    </div>
    <div className={herostyles.subdiv}>

<Image src={"/hero.jpg"} height={350} width={1510} alt="heropic"/>

    </div>
    </>
    
  )
}

export default Hero