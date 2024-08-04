// pages/dashboard/index.js
"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
console.log("session" , session)
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    } else {
      router.push(`/dashboard/${session.user.id}`);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return null; 
};

export default Dashboard;
