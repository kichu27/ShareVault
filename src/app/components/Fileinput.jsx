import { useState, useEffect } from "react";
import style from "../styles/fileinput.module.css";
import Image from "next/image";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Formstyles from "../styles/Form.module.css";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Fileinput = ({ fetchImageList }) => {
    const { data: session, status } = useSession();
    const [uploadFile, setUploadFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            if (status === 'loading') return;

            if (session?.user?.email) {
                try {
                    const response = await axios.post('/api/USERS/getid', { email: session.user.email });
                    setUserId(response.data.id);
                } catch (error) {
                    console.error('Failed to get user ID:', error);
                }
            }
        };

        fetchUserId();
    }, [session, status]);

    const handleFileUpload = () => {
        if (!uploadFile || !userId) return;

        const fileRef = ref(getStorage(), `${userId}/${uploadFile.name + v4()}`);
        uploadFileToStorage(fileRef, uploadFile);
    };

    const uploadFileToStorage = async (fileRef, file) => {
        try {
            await uploadBytes(fileRef, file);
            await fetchImageList();
            toast.success("Document Uploaded!");
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
