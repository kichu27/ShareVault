"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const NavMenu = () => {
  const { data: session } = useSession();

console.log(session);

  return (
    <nav style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", background: "#333", color: "#fff", height: "100vh", justifyContent: "center" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ShareVault</h1>
      </div>
      <div>
        {session ? (
          <>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Signed in as {session.user.email} <Image src={session.user.image} height={50} width={50} alt="Profile Picture"  style={{ borderRadius: '50%' }}/> </h2>
            <button onClick={() => signOut()} style={{ background: "#fff", color: "#333", border: "none", padding: "1rem 2rem", borderRadius: "4px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }}>Sign out</button>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Not signed in</h2>
            <button onClick={() => signIn("google")} style={{ background: "#fff", color: "#333", border: "none", padding: "1rem 2rem", borderRadius: "4px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }}>Sign in with Google</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
