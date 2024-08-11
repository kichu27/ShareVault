import Formstyles from "../styles/Form.module.css";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = ({ setIsSignup }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const notify = (text) => toast(text);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { username, password };
            const endpoint = '/api/USERS/login';

            const response = await axios.post(endpoint, data);

            if (response.data.status === 200) {
                notify("User login Success");
                Cookies.set('token', response.data.token, { expires: 1 });
                router.push('/dashboard');
            } else {
                alert(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.log(error);
            notify("User login Failed");
        }
    };

    return (
        <div className={Formstyles.Mainbox}>
            <ToastContainer />

            <div className={Formstyles.title}>
                <h1>Login</h1>
            </div>

            <div className={Formstyles.accounts}>
                <Image 
                    onClick={() => signIn("google", { callbackUrl: 'https://share-vault-delta.vercel.app/dashboard' })} 
                    src={"/google.png"} 
                    height={40} 
                    width={40} 
                    alt="image1" 
                />
            </div>
            <p className={Formstyles.subtext}>
                or use your account
            </p>

            <div className={Formstyles.inputs}>
                <input
                    className={Formstyles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className={Formstyles.input}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <p className={Formstyles.subtext}>
                Forgot Your Password ?
            </p>
            <button className={Formstyles.button} onClick={handleSubmit}>
                SIGN IN 
            </button>

            <p className={Formstyles.subtext} onClick={() => setIsSignup(true)}>
                Register
            </p>
        </div>
    );
}

export default LoginForm;
