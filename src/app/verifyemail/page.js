"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import {useRouter} from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
const router = useRouter()
  const verifyUserEmail = async () => {
    try {
      const response = await fetch("/api/USERS/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
router.push("/")
        setVerified(true);
        const responsedata = await response.json();
        const { message } = responsedata;
      } else {
        setError(true);
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div style={styles.main}>
    
      <div style={styles.container}>
        <h1 style={styles.heading}>Verify Email</h1>
        <h2 style={styles.token}>{token ? `${token}` : "no token"}</h2>

        {verified && (
          <div style={styles.success}>
            <h2>Email Verified</h2>
            <Link href="/" style={styles.link}>
              Login
            </Link>
          </div>
        )}
        
        {error && (
          <div style={styles.error}>
            <h2>Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}


const styles = {

  main : {
  height: "100vh" , 
  width : "100%" ,

  
  } ,
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f2f2f2",
    padding: "20px",
    borderRadius: "100px",
    height: "400px",
    margin: "auto",
    marginTop: "150px",
    width : "1200px" , 
    display : "flex" , 
    "justify-content" : "center" , 
    "align-items" : "center" , 
    "flex-direction" : "column"
    
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  token: {
    color: "#555",
    fontSize: "18px",
    margin: "10px 0",
  },
  success: {
    color: "#4CAF50",
    marginTop: "20px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "5px",
  },
  error: {
    color: "#FF0000",
    marginTop: "20px",
  },
}

