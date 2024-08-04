"use client";
import React, { useState } from 'react';
import headerstyle from "../styles/Header.module.css";
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import MyModal from './Modal';
import { useSession, signOut } from 'next-auth/react';

function Header() {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' }); 
    };

    const handleCloseButton = (
        <Image 
            className={headerstyle.logo} 
            src="/close.png" 
            height={40} 
            width={40} 
            alt="close"  
            onClick={closeModal} 
        />
    );

    const mainModal = (
        <MyModal closeModal={closeModal} handleCloseButton={handleCloseButton}>
         
        </MyModal>
    );

    return (
        <div className={headerstyle.maindiv}>
            <div className="subdiv1">
                <Image 
                    className={headerstyle.logo} 
                    src="/logo.png" 
                    height={50} 
                    width={50} 
                    alt="logo" 
                />
            </div>
            <div className={headerstyle.subdiv2}>
                <div><Link className={headerstyle.subdiv02} href="/">Home</Link></div>
                <div><Link className={headerstyle.subdiv02} href="/properties">Portal</Link></div>
                <div><Link className={headerstyle.subdiv02} href="https://github.com/kichu27/ShareVault">GitHub</Link></div>
            </div>
            <div className={headerstyle.subdiv3}>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : session ? (
                    <div className={headerstyle.subdiv02} onClick={handleSignOut}>
                        Logout
                    </div>
                ) : (
                    <div onClick={() => setShowModal(true)}>
                        <Button text="Login | Signup" href="/" />
                    </div>
                )}
            </div>
            <div id="myPortalModalDiv">
                {showModal && mainModal}
            </div>
        </div>
    );
}

export default Header;
