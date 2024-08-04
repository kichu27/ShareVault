"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";
import { storage } from '@/app/firebase/config';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Resize.module.css';

const ResizePage = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [fileUrl, setFileUrl] = useState(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [imageName, setImageName] = useState('compressed_image.jpg');
  const [maxSizeKB, setMaxSizeKB] = useState(1000);
  const [presets, setPresets] = useState({
    NEET: { width: 800, height: 600, maxSizeKB: 500 },
    JEE: { width: 1000, height: 800, maxSizeKB: 600 },
    UPSC: { width: 1200, height: 1000, maxSizeKB: 700 },
    MPSC: { width: 800, height: 800, maxSizeKB: 650 }
  });
  const [selectedPreset, setSelectedPreset] = useState('NEET');
  const { data: session, status } = useSession();

  useEffect(() => {
    if (id) {
      const decodedUrl = decodeURIComponent(id);
      setFileUrl(decodedUrl);

      const fetchMetadata = async () => {
        try {
          const metadataRef = ref(storage, `${session.user.id}/${decodeURIComponent(id)}`);
          const metadata = await getMetadata(metadataRef);

          if (metadata.contentType === 'application/pdf') {
            setPdfPreviewUrl(decodedUrl);
          }
        } catch (error) {
          console.error('Error fetching metadata:', error);
        }
      };

      fetchMetadata();
    }
  }, [id, session]);

  useEffect(() => {
    if (selectedPreset && presets[selectedPreset]) {
      const preset = presets[selectedPreset];
      setWidth(preset.width);
      setHeight(preset.height);
      setMaxSizeKB(preset.maxSizeKB);
    }
  }, [selectedPreset, presets]);

  const handleCompressImage = async () => {
    if (!fileUrl) return;

    try {
      if (pdfPreviewUrl) {
        toast.info('PDF resizing is not supported in this example.');
        return;
      }

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const file = new File([arrayBuffer], 'image_to_compress.jpg', { type: 'image/jpeg' });

      const options = {
        maxSizeMB: maxSizeKB / 1024,
        maxWidthOrHeight: Math.max(width, height),
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);
      const compressedUrl = URL.createObjectURL(compressedFile);
      setCompressedImageUrl(compressedUrl);

      const storageRef = ref(storage, `${session.user.id}/${imageName}`);
      await uploadBytes(storageRef, compressedFile);
      const downloadUrl = await getDownloadURL(storageRef);

      toast.success('Compressed Image uploaded successfully!');
      router.push(`/dashboard/${session.user.id}`);
    } catch (error) {
      console.error('Error compressing the image:', error);
      toast.error('Error compressing the image');
    }
  };

  return (
    <div className={styles.maincontainer}>
      <ToastContainer />
      <div className={styles.container1}>
        {fileUrl ? (
          <div>
            {pdfPreviewUrl ? (
              <div className={styles.pdfContainer}>
                <iframe src={pdfPreviewUrl} width="100%" height="600px" title="PDF Preview"></iframe>
              </div>
            ) : (
              <div className={styles.imageContainer}>
                <Image src={fileUrl} alt="File to resize" width={400} height={600} />
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.container2}>

        <div className={styles.inputGroup}>
          <label>Width (px):</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
            className = {styles.input}
          />
          <label>Height (px):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
            className = {styles.input}
          />
          <label>Size (KB):</label>
          <input
            type="number"
            value={maxSizeKB}
            onChange={(e) => setMaxSizeKB(e.target.value)}
            placeholder="Size (KB)"
            className = {styles.input}
          />
          <label>FileName:</label>

          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Image Name"
            className = {styles.input}
          />
        </div>
        <button className={styles.button} onClick={handleCompressImage}>Compress Image</button>
      </div>
    </div>
  );
};

export default ResizePage;

  