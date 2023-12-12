import { useRef, useState } from 'react';
import axios from "axios";

const SignUp = () => {
    const [passShow, setPassShow] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();
    const [file, setFile] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (passRef.current.value !== confirmPassRef.current.value) {
            confirmPassRef.current.setCustomValidity("Password don't match!");
        } else {
            const data = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passRef.current.value,
                pic: file
            }
            try {
                await axios.post("http://localhost:3000/api/user/signUp", data);
                alert("Registration complete.Please login to your account");
                window.location.reload();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const fileDetails = (pics) => {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "ddcn60bx4");
        fetch("https://api.cloudinary.com/v1_1/ddcn60bx4/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setFile(data.url.toString());
                console.log(data.url.toString());
            })
            .catch((err) => {
                alert(err);

            });

    }

    return (
        <form onSubmit={handleSignUp}>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Name</p>
                <input type="text" name="" ref={nameRef} required placeholder='Enter your name' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Email Address</p>
                <input type="email" name="" ref={emailRef} required placeholder='Enter your email' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Password</p>
                <div className='relative flex justify-end items-center'>
                    <input type={!passShow ? `password` : `text`} name="" ref={passRef} required minLength="6" placeholder='Enter your password' className='flex justify-center w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500 ' />
                    <button onClick={() => setPassShow(!passShow)} className='bg-gray-300 text-sm font-medium p-1 rounded-md absolute mx-1'>{!passShow ? "Show" : "Hide"}</button>
                </div>
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Confirm Password</p>
                <div className='relative flex justify-end items-center'>
                    <input type={!confirmPassShow ? `password` : `text`} name="" ref={confirmPassRef} required placeholder='Enter your password again' className='flex justify-center w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500 ' />
                    <button onClick={() => setConfirmPassShow(!confirmPassShow)} className='bg-gray-300 text-sm font-medium p-1 rounded-md absolute mx-1' >{!confirmPassShow ? "Show" : "Hide"}</button>
                </div>
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Upload your Picture</p>
                <input type="file" onChange={(e) => fileDetails(e.target.files[0])} className='w-full h-10 border-2 py-[3px] border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-sky-500' />
            </div>
            <div className='px-4 py-1.5'>
                <button className='bg-sky-600 hover:bg-sky-700 w-full h-10 rounded-md text-white text-md font-medium'>Sign up</button>
            </div>
        </form>
    );
};

export default SignUp;