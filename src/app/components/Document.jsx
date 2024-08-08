import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import style from "@/app/styles/Document.module.css";
import Button2 from './Button2';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Document = ({ name, size, type, deleteItem, imgUrl, setShowModal, setDocUrl }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.post('/api/USERS/getid', { email: session.user.email });
          setUserId(response.data.id);
        } catch (error) {
          console.error('Failed to fetch user ID:', error);
        }
      }
    };

    fetchUserId();
  }, [session?.user?.email]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const addToFav = async (imgUrl) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    try {
      const object = {
        imgurl: imgUrl,
        id: userId,
        name: name,
        size: size,
        type: type,
      };
      const response = await axios.post('/api/USERS/favouritedoc', { object });
      if (response.status === 200) {
        toast.success(`${response.data.Message}`);
      }
    } catch (error) {
      toast.error('Error adding document to favorites.');
    }
  };

  const handleResize = () => {
    const encodedUrl = encodeURIComponent(imgUrl);
    router.push(`/Resize/${encodedUrl}`);
  };

  return (
    <div className={style.maindiv}>
      <div className={style.subdiv1}>
        <Image
          onClick={() => deleteItem(imgUrl)}
          src="/bin.png"
          alt="Delete"
          height={23}
          width={23}
        />
        <Image
          src="/folder.png"
          alt="View Document"
          height={23}
          width={23}
          onClick={() => {
            setShowModal(true);
            setDocUrl(imgUrl);
          }}
        />
        <Image
          src="/favourite.png"
          alt="Menu"
          height={23}
          width={23}
          onClick={() => addToFav(imgUrl)}
        />
      </div>

      <div className={style.subdiv2}></div>

      <div className={style.subdiv3}>
        <p className={style.subdiv03}>{name}</p>
        <p className={style.subdiv13}>{size}</p>
      </div>

      <div className={style.subdiv4}>
        <Button2 text="RESIZE" img="/share.png" color="red" onClick={handleResize} />
        <Button2 text="DOWNLOAD" img="/download.png" color="blue" onClick={handleDownload} />
      </div>
    </div>
  );
};

export default Document;
