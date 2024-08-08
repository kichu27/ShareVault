"use client";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

async function getid(email) {
  try {
    const response = await axios.post('/api/USERS/getid', { email });
    const id = response.data.id; // Adjust based on your API response structure
    return id;
  } catch (error) {
    console.error('Failed to get ID:', error);
    throw error; 
  }
}

const Dashboard = () => {
  const [id, setId] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
 
    if (status === 'loading') return;

    if (!session) {
      // Redirect to sign-in page or home if no session
      router.push('/');
      return;
    }

    const fetchId = async () => {
      try {
        const fetchedId = await getid(session.user.email);
        setId(fetchedId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    if (session.user) {
      fetchId();
    }
  }, [session, status, router]);

  useEffect(() => {
    console.log('ID:', id);

    if (id !== null) {
      router.push(`/dashboard/${id}`);
    }
  }, [id, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return null;
};

export default Dashboard;
