import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passRef.current.value
        };
        try {
            const res = await axios.post("http://localhost:3000/api/user/login", user);
            localStorage.setItem("userData", JSON.stringify(res.data));
            console.log((JSON.parse(localStorage.getItem("userData"))));
            navigate("/chat");
        } catch(err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className='px-4 py-1.5'>
               <p className='text-md font-medium'>Email Address</p>
               <input type="email" name="" ref={emailRef} required placeholder='Enter your email' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500'/>
            </div>
            <div className='px-4 py-1.5'>
               <p className='text-md font-medium'>Password</p>
               <div className='relative flex justify-end items-center'>
                    <input type={!passShow ? `password` : `text`} name="" ref={passRef} required placeholder='Enter your password' className='flex justify-center w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500 '/>
                    <button onClick={() => setPassShow(!passShow)} className='bg-gray-300 text-sm font-medium p-1 rounded-md absolute mx-1' >{!passShow ? "Show" : "Hide"}</button>
               </div>
            </div>
            <div className='px-4 py-1.5'>
                <button className='bg-sky-600 hover:bg-sky-700 w-full h-10 rounded-md text-white text-md font-medium'>Login</button>
            </div>
            {/* <div className='px-4 py-1.5'>
                <button className='bg-red-600 w-full h-10 rounded-md text-white text-md font-medium'>Get Guest User Credentials</button>
            </div> */}
        </form>
    );
};

export default Login;