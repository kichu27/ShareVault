import React from 'react';
import sidenavstyles from "../styles/Sidenav.module.css";
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const SideNav = () => {
  return (
    <div className={sidenavstyles.maindiv}>
      <ul className={sidenavstyles.navList}>    
     
        <li className={sidenavstyles.navItem}>
          <div className={sidenavstyles.navLinkContainer}>
            {/* <Image  className={sidenavstyles.image} src="/document.png" height={25} width={25} alt="upload document"/> */}
            <a href="/dashboard" className={sidenavstyles.navLink}>Files</a>
          </div>
        </li>
        <li className={sidenavstyles.navItem}>
          <div className={sidenavstyles.navLinkContainer}>
            {/* <Image  className={sidenavstyles.image}src="/bookmark.png" height={25} width={25} alt="favorites"/> */}
            <a href="/favourites" className={sidenavstyles.navLink}>Favorites</a>
          </div>
        </li>
        <li className={sidenavstyles.navItem}>
          <div className={sidenavstyles.navLinkContainer}>
            {/* <Image className={sidenavstyles.image} src="/help.png" height={25} width={25} alt="help"/> */}
            <a href="#help" className={sidenavstyles.navLink}>Help</a>
          </div>
        </li>
        <li className={sidenavstyles.navItem}>
          <div className={sidenavstyles.navLinkContainer}>
            {/* <Image className={sidenavstyles.image} src="/help.png" height={25} width={25} alt="help" /> */}
            <p  onClick={()=>{

signOut({ callbackUrl: '/' })

            }} className={sidenavstyles.navLink}>Logout</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
