/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userData"));
        setUser(userInfo);
    }, [])

    return (
    <UserContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats, notifications, setNotifications}}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;