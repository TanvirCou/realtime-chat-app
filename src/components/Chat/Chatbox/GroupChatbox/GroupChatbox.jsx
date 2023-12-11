import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import ChatboxModal from '../ChatboxModal/ChatboxModal';
import Inbox from '../Inbox.jsx/Inbox';

const GroupChatbox = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat, chats, setChats} = useContext(UserContext);



    return (
        <div className='h-full'>
            <div className='flex items-center justify-between px-4 py-1'>
                <p className='text-2xl font-semibold'>{selectedChat.chatName}</p>
                 <ChatboxModal group fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
            </div>
            <Inbox />
        </div>
    );
};

export default GroupChatbox;