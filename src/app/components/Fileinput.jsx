import { useState } from "react";
import style from "../styles/fileinput.module.css";
import Image from "next/image";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from '../firebase/config';
import Formstyles from "../styles/Form.module.css";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fileinput = ({fetchImageList}) => {
    const { data: session, status } = useSession();
    const notify = (text) => toast.success(text);
    const [uploadFile, setUploadFile] = useState(null);
    const [fileType, setFileType] = useState(null);
  
    const handleFileUpload = () => {
      if (!uploadFile || !session?.user?.id) return;
  
      const fileRef = ref(getStorage(), `${session.user.id}/${uploadFile.name + v4()}`);
      uploadFileToStorage(fileRef, uploadFile);
    };
  
    const uploadFileToStorage = async (fileRef, file) => {
      try {
        await uploadBytes(fileRef, file);
       await fetchImageList()
        notify("Document Uploaded !");
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadFile(file);
        setFileType(file.type);
      }
    };

    return (
        <div className={style.maindiv}>
            <ToastContainer />
            <Image src={"/file.png"} alt="upload" height={100} width={100} />
            <input type="file" className={style.fileInput} onChange={handleFileChange} />
            <button className={Formstyles.button} onClick={handleFileUpload}>Upload File</button>
        </div>
    );
}

export default Fileinput;
