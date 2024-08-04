import Formstyles from "../styles/Form.module.css"
import Image from "next/image"
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const RegisterForm = ({ setIsSignup }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const notify = (text) => toast.success(text);
    const notify1 = (text) => toast.error(text);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { username, password , confirmpassword , number , email };
console.log(data);
            const endpoint = '/api/USERS/register';

            const response = await axios.post(endpoint, data);
            console.log(response.data);

            if (response.data.status === 1) {
                notify("User Registration Success Please Verify Email !")
            } else {
                notify1("User Registtration Failed");
            }
        } catch (error) {
            notify1("User Registration Failed")
        }
    };
    return (
        <div className={Formstyles.Mainbox}>
            <ToastContainer />

            <div className={Formstyles.title}>

                <h1>Sign Up</h1>

            </div>
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
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className={Formstyles.input}
                    type="number"
                    placeholder="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />

                <input
                    className={Formstyles.input}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className={Formstyles.input}
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />


            </div>
            <button className={Formstyles.button} onClick={handleSubmit} >
                Register
            </button>


            <p className={Formstyles.subtext} onClick={() => setIsSignup(false)}>
                Login
            </p>



        </div>
    )
}

export default RegisterForm