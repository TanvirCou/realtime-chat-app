import { useContext, useEffect, useState } from "react";
import "../../../App.css";
import Conversation from "../Conversation/Conversation/Conversation";
import Navbar from "../Navbar/Navbar/Navbar";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import Chatbox from "../Chatbox/Chatbox/Chatbox";

const Chat = () => {
    const { user, selectedChat, chats, setChats } = useContext(UserContext);
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${user.access_token}`
                    },
                };
                const res = await axios.get(`https://chat-app-2tmy.onrender.com/api/chat/allChat`, config)
                setChats(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchChats();
    }, [fetchAgain, user]);

    return (
        <div className='bgImg'>
            <div className="">
                <div>
                    {user && <Navbar />}
                </div>
                <div className="flex justify-center">
                    <div className={`md:w-1/3 w-full ${selectedChat ? "max-md:hidden" : "max-md:flex"} h-[90vh] p-2`}>
                        <div className="w-full h-full bg-white rounded-md">
                            {(user && chats) ? <Conversation /> : <div className="text-2xl flex justify-center h-full items-center">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>}
                        </div>
                    </div>
                    <div className={`md:w-2/3 w-full ${selectedChat ? "max-md:flex" : "max-md:hidden"} h-[90vh] p-1 md:p-2`}>
                        <div className="w-full h-full bg-white rounded-md">
                            {user ? <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> :
                                <div className="text-2xl flex justify-center h-full items-center">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;