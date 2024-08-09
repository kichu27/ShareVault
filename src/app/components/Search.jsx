"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import style from "@/app/styles/Searchbar.module.css";
import { useSession } from 'next-auth/react';
import { refreshSession } from '../Helpers/Session';

const Search = ({ setQuery }) => {
  const [input, setInput] = useState('');
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const updateSession = async () => {
      if (session) {
        const user = await refreshSession();
        console.log("user", user);
        setUserData(user?.user); 
      }
    };
  
    updateSession();
  }, [session]);
  

  useEffect(() => {
    setQuery(input); // Update the parent query state when input changes
  }, [input, setQuery]);

  return (
    <div className={style.maindiv}>
      <div className={style.subdiv1}>
        <Image
          className={style.loupe}
          src={"/loupe.png"}
          alt="Search"
          width={26}
          height={26}
          style={{ cursor: 'pointer' }}
        />
        <input
          className={style.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className={style.subdiv2}>
        {userData && userData.provider === "google" && (
          <Image
            src={userData.image}
            height={40}
            width={40}
            alt="User Profile"
            style={{ borderRadius: "50px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
