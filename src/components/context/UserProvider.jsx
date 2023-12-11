import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userData"));
        setUser(userInfo);

        if(!userInfo) {
            navigate("/");
        }
    }, [navigate])

    return (
    <UserContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;