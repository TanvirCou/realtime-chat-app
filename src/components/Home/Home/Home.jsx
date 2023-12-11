import { useEffect, useState } from "react";
import "../../../App.css";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [active, setActive] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userData"));

        if(userInfo) {
            navigate("/chat");
        }
    }, [navigate]);
    
    return (
        <div className="bgImg">
            <div className="absolute w-full flex flex-col items-center top-8">
                <div className="bg-white w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 py-3 font-[Poppins] font-bold text-3xl text-center rounded mb-2">
                    <p>Panda-Chat</p>
                </div>
                <div className="bg-white w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 py-4 rounded-md">
                    <div className="w-full flex p-2">
                        <p onClick={() => setActive(true)} className={`w-1/2 text-center text-lg font-semibold rounded-3xl py-2 cursor-pointer ${active ? "bg-sky-400" : "bg-white"}`}>Login</p>
                        <p onClick={() => setActive(false)} className={`w-1/2 text-center text-lg font-semibold rounded-3xl py-2 cursor-pointer ${!active ? "bg-sky-400" : "bg-white"}`}>SignUp</p>
                    </div>
                    <div className="">
                        {active ?<Login /> : <SignUp />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;