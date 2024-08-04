"use client"
import { signOut } from 'next-auth/react';
import  {useRouter}  from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {

    try {
      await signOut({ redirect: false }); // Prevent automatic redirect
      router.push('/'); 
    } catch (error) {
      console.log(error);
    }
    
  };

  return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignOutButton;
