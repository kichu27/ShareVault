"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from "@/app/styles/dashboard.module.css";
import SideNav from '@/app/components/SideNav';
import Document from '@/app/components/Document';
import Image from 'next/image';
import MyModal2 from '@/app/components/Modal2';
import headerstyle from "@/app/styles/Header.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search3 from '../components/Search3';

const DashboardPage = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const [docUrl, setDocUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
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

  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/');
      return;
    }

    setId(session.user.id);
  }, [session, status, router, params.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/api/USERS/user', { id });
        if (response.data.data) {
          setUserData(response.data.data);
        }
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const refetchUserData = async () => {
    try {
      const response = await axios.post('/api/USERS/user', { id });
      if (response.data.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error refetching user data:", error);
    }
  };

  async function deleteItem(imgUrl) {
    try {
      const response = await axios.post('/api/USERS/deletefav', { data: { imgUrl, id } });
      if (response.status === 200) {
        toast.success('Document deleted from favorites!');
        refetchUserData(); // Refetch the user data after deletion
      }
    } catch (error) {
      console.log("Error deleting item: ", error);
      toast.error('Error deleting document from favorites.');
    }
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Image URL copied to clipboard!');
    }).catch((err) => {
      toast.error('Failed to copy URL.');
      console.error('Could not copy text: ', err);
    });
  };

  const mainModal = (
    <MyModal2 closeModal={closeModal} handleCloseButton={handleCloseButton} docUrl={docUrl} metadata={metadata} />
  );

  return (
    <div className={style.maindiv}>
      <ToastContainer />
      <div id="myPortalModalDiv">
        {showModal && mainModal}
      </div>
      <SideNav />
      <div className={style.subdiv}>
        <Search3 />
        <div className={style.docdiv}>
          {userData && userData.favdocuments.length === 0 ? (
            <div className="div">
              <br /> <br /> <br /><br />
              <Image src="/nodata.jpg" alt="No Data" width={450} height={400} />
            </div>
          ) : (
            userData && userData.favdocuments.map((doc, index) => (
              <div className={style.share} key={index}>
                <Document
                  key={index}
                  name={doc.name}
                  size={doc.size}
                  deleteItem={() => deleteItem(doc.imgurl)}
                  imgUrl={doc.imgurl}
                  setShowModal={setShowModal}
                  setDocUrl={(url) => {
                    setDocUrl(url);
                    setMetadata(null);
                  }}
                />
                <Image 
                  src="/share.png" 
                  alt="Share" 
                  height={20} 
                  width={20}  
                  className={style.shareimg}
                  onClick={() => copyToClipboard(doc.imgurl)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
