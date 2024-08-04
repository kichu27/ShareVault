import React from 'react';
import sty from "@/app/styles/Hero3.module.css";
import Image from 'next/image';

const Hero3 = ({ a, h4, p, img }) => {
  // Determine the className based on the value of `a`
  const containerClassName = a === "ir" ? sty.maincont : sty.maincont1;

  return (
    <div className={containerClassName}>
      <div className={sty.div1}>
        <h4>{h4}</h4>
        <p>{p}</p>
      </div>

      <div className={sty.div2}>
        <Image src={img} alt="hero3" height={400} width={400} />
      </div>
    </div>
  );
}

export default Hero3;
