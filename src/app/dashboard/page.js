// pages/dashboard/index.js
"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    } else if (session.user?.email) {
      console.log(session)
      router.push(`/dashboard/${session.user.email}`);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return null; 
};

export default Dashboard;
