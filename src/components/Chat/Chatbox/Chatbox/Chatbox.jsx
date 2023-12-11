import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import FriendChatbox from '../FriendChatbox/FriendChatbox';
import GroupChatbox from '../GroupChatbox/GroupChatbox';

const Chatbox = ({fetchAgain, setFetchAgain}) => {

    const {selectedChat, chats} = useContext(UserContext);

    return (
        <div className='h-full'>
            {
                selectedChat ? 
                <>
                    {!selectedChat.isGroupChat ? <FriendChatbox /> : <GroupChatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
                </> :
                <div className='text-gray-500 text-2xl font-medium flex justify-center h-full items-center'>
                    <p>Click a user to start conversation</p>
                </div>
            }

        </div>
    );
};

export default Chatbox;