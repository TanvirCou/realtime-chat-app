import { useContext, useEffect, useState } from "react";
import "../../../App.css";
import Conversation from "../Conversation/Conversation";
import Navbar from "../Navbar/Navbar/Navbar";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import Chatbox from "../Chatbox/Chatbox/Chatbox";

const Chat = () => {
    const {user, selectedChat, chats, setChats} = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const [fetchAgain, setFetchAgain] = useState(false);

    

    useEffect(() => {
        setLoggedIn(JSON.parse(localStorage.getItem("userData")));
        const fetchChats = async() => {
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${user.access_token}`
                    },
                };
                const res = await axios.get(`http://localhost:3000/api/chat/allChat`, config)
                setChats(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchChats();
    }, [fetchAgain, user]);

    return (
        <div className='bgImg'>
            <div className="">
                <div>
                    <Navbar />
                </div>
                <div className="flex justify-center">
                    <div className={`md:w-1/3 w-full ${selectedChat ? "max-md:hidden" : "max-md:flex"} h-[90vh] p-2`}>
                        <div className="w-full h-full bg-white rounded-md">
                            <Conversation chats={chats} loggedIn={loggedIn} />
                        </div>
                    </div>
                    <div className={`md:w-2/3 w-full ${selectedChat ? "max-md:flex" : "max-md:hidden"} h-[90vh] p-2`}>
                        <div className="w-full h-full bg-white rounded-md">
                          {user &&  <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;