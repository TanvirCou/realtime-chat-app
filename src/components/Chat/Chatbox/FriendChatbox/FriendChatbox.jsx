import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import ChatboxModal from '../ChatboxModal/ChatboxModal';
import Inbox from '../Inbox.jsx/Inbox';

const FriendChatbox = () => {
    const {user, selectedChat, setSelectedChat, chats, setChats} = useContext(UserContext);

    const getFriendChatName = (user, combineUsers) => {
        return (combineUsers[0]?._id === user.user._id) ? (combineUsers[1].name) : (combineUsers[0].name);
    }
    return (
        <div className='h-full '>
            <div className='flex items-center justify-between px-4 py-1'>
                <p className='text-2xl font-semibold'>{getFriendChatName(user, selectedChat.users)}</p>
                <ChatboxModal />
            </div>
            <Inbox />
        </div>
    );
};

export default FriendChatbox;