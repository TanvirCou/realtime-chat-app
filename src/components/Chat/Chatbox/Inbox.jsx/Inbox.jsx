import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/UserProvider';
import axios from 'axios';
import Message from '../Message/Message';
import io from "socket.io-client";

var socket, selectedChatCompare;

const Inbox = () => {
    const { user, selectedChat, setSelectedChat, chats, setChats } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${user.access_token}`
                    },
                };
                setNewMessage("");
                const res = await axios.get(`http://localhost:3000/api/message/${selectedChat._id}`, config)
                setMessages(res.data);
                setLoading(false);

                socket.emit("join chat", selectedChat._id);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])


    const handleSendMessage = async () => {
        if (newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${user.access_token}`
                    },
                };
                setNewMessage("");
                const res = await axios.post(`http://localhost:3000/api/message/send`, {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config)
                setMessages([...messages, res.data]);

                socket.emit("new message", res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Please write something");
            return;
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    useEffect(() => {
        socket = io("http://localhost:3000/");
        socket.emit("setup", user.user);
        socket.on("connected", () => {
            setSocketConnected(true);
        });
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [])

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || (selectedChatCompare._id !== newMessageReceived.chat._id)) {
                //
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    })


    return (
        <div>
            <div className='h-[81.5vh] w-full p-2'>
                <div className='h-full w-full bg-gray-200 rounded-md flex flex-col justify-between'>
                    <div className='h-full overflow-y-scroll'>
                        {
                            loading ? <div className='flex justify-center items-center h-full'><span className="loading loading-ring loading-lg"></span></div>
                                :
                                <div>
                                    {
                                        messages.map((message, index) => <div ref={scrollRef} key={message._id}><Message index={index} message={message} messages={messages} /> </div>)
                                    }
                                </div>
                        }
                    </div>
              
                    {isTyping ? <div className='bg-white w-fit h-fit px-3 rounded-md my-1 mx-2'>
                            <span className="loading loading-dots loading-md"></span>
                        </div> : ""}
                    <div className='flex items-center'>
                        <input type="text" value={newMessage} onChange={handleTyping} placeholder="Type here" className="input input-bordered w-full" />
                        <button onClick={handleSendMessage} className='bg-sky-600 text-white px-3 ml-2 py-2.5 font-medium rounded-md'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;