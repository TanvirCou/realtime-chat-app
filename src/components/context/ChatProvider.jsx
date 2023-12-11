import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userData"));
        setUser(userInfo);

        if(!userInfo) {
            navigate("/");
        }
    }, [navigate])

    return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
    );
};

export default ChatProvider;