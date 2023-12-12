import { useContext } from 'react';
import SearchLoading from '../../Navbar/SearchLoading/SearchLoading';
import { UserContext } from '../../../context/UserProvider';
import GroupModal from '../GroupModal/GroupModal';
import { getFriendChatName } from '../../../chatLogics/chatLogics';

const Conversation = () => {
    const { user, selectedChat, setSelectedChat, chats } = useContext(UserContext);


    return (
        <div>
            <div className='flex items-center justify-between py-2 px-4'>
                <p className='text-xl font-medium'>My Chats</p>
                <GroupModal />
            </div>
            <div className='px-4'>
                {
                    (chats && user) ? (chats?.map(chat => (
                        <div key={chat._id}>
                            <div onClick={() => setSelectedChat(chat)} className={`text-lg font-semibold border my-2 py-2 px-4 ${selectedChat === chat ? "bg-sky-500 text-white" : "bg-gray-300 text-black"} rounded-md cursor-pointer`}>
                                {
                                    !chat.isGroupChat ? getFriendChatName(user, chat.users) : chat.chatName
                                }

                            </div>
                        </div>
                    ))) : <SearchLoading />
                }
            </div>
        </div>
    );
};

export default Conversation;