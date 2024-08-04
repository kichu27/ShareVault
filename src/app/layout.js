
import SessionProvider from "@/app/components/SessionProvider"
import { getServerSession } from "next-auth";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({ children }) {

const session = await getServerSession()

  return (
    <html lang="en">

      
      <body>
        
         <SessionProvider session={session}>
         <ToastContainer />
          {children }
          
          
          </SessionProvider> 
      
      </body>
    </html>
  );
}
