"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import style from "@/app/styles/Searchbar.module.css";
import { useSession } from 'next-auth/react';
import Button2 from './Button2';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from '../firebase/config';
import NextImage from "next/image";
import MyModal1 from './Modal1';
import headerstyle from "@/app/styles/Header.module.css"



const Search = ({fetchImageList}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
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
  <MyModal1 closeModal={closeModal} handleCloseButton={handleCloseButton}  fetchImageList ={fetchImageList}>
   
  </MyModal1>
);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`https://api.example.com/search`, {
        params: { q: query },
      });
      setResults(response.data); // Adjust based on your API response
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className={style.maindiv}>
      <div className={style.subdiv1}>
        
       <h2 className={style.text} >YOUR RECENT FILES</h2>
      </div>

      <div onClick={() => setShowModal(true)} className={style.subdiv2}>
        <Button2 text="UPLOAD" img="/up-arrow.png"/>
      </div>
      <div id="myPortalModalDiv">
                {showModal && mainModal}
            </div>
    </div>
  );
};

export default Search;
