"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from "@/app/styles/dashboard.module.css";
import SideNav from '@/app/components/SideNav';
import Search from '@/app/components/Search';
import Search2 from '@/app/components/Search2';
import Document from '@/app/components/Document';
import { getStorage, ref, listAll, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { storage } from '@/app/firebase/config';
import Image from 'next/image';
import MyModal2 from '@/app/components/Modal2';
import headerstyle from "@/app/styles/Header.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const [docUrl, setDocUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [query, setQuery] = useState(''); // Search query state
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
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/');
      return;
    }

    const userId = session.user.id;
    console.log("user id from dashboard/id" , userId , session.user.id , session) 
    setId(userId); 
  }, [session, status, router, params.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/api/USERS/user', { id });
        if (response.data.data) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const fetchImageList = async () => {
    if (!id) return;

    const storageRef = getStorage();
    const listImgRef = ref(storageRef, `${id}/`);

    try {
      const res = await listAll(listImgRef);
      const downloadURLs = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          return {
            url,
            metadata, // Pass metadata here
            name: metadata.name.split(".")[0], // Filename without extension
            size: (metadata.size / 1024).toFixed(2) + ' KB', // Convert size to KB and format
            type: metadata.contentType
          };
        })
      );

      // Filter images based on the query
      const filteredImages = downloadURLs.filter(img =>
        img.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setImgList(filteredImages);
    } catch (error) {
      console.error("Error listing images: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchImageList();
    }
  }, [id, query]); // Include query in dependency array

  async function deleteItem(imgUrl) {
    const fileRef = ref(storage, imgUrl); // Initialize the ref with imgUrl
    try {
      await deleteObject(fileRef);
      fetchImageList(); // Refresh the list after deletion
    } catch (error) {
      console.log("Error deleting item: ", error);
    } 
  }

  const mainModal = (
    <MyModal2 closeModal={closeModal} handleCloseButton={handleCloseButton} docUrl={docUrl} metadata={metadata} />
  );
  
  return (
    <div className={style.maindiv}>
      <div id="myPortalModalDiv">
        {showModal && mainModal}
      </div>
      <SideNav />
      <div className={style.subdiv}>
        <Search setQuery={setQuery} />
        <Search2 fetchImageList={fetchImageList} />
        <div className={style.docdiv}>
          {imgList.length === 0 ? (
<div className="div"> <br />  <br /> <Image src="/nodata.jpg" alt="No Data" width={450} height={360} /> <hr /></div>
          
          ) : (
            imgList.map((img, index) => (
              <Document
                key={index}
                name={img.name}
                type={img.type}
                size={img.size}
                deleteItem={deleteItem}
                imgUrl={img.url} // Pass imgUrl to Document
                setShowModal={setShowModal}
                setDocUrl={(url) => {
                  setDocUrl(url);
                  setMetadata(img.metadata); // Set metadata for the document
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
