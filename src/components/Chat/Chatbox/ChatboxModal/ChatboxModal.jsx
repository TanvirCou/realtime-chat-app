import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../context/UserProvider';
import GroupFriendBadge from '../../GroupFriendBadge/GroupFriendBadge';
import SearchFriends from '../../Navbar/SearchFriends/SearchFriends';
import axios from 'axios';

const ChatboxModal = ({group, fetchAgain, setFetchAgain}) => {
    const profileModal = useRef();
    const chatNameRef = useRef();
    const {user, selectedChat, setSelectedChat, chats, setChats} = useContext(UserContext);
    
    const getFriend = (user, combineUsers) => {
        return (combineUsers[0]?._id === user.user._id) ? (combineUsers[1]) : (combineUsers[0]);
    }

    const friend = getFriend(user, selectedChat.users);

    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRename = async() => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${user.access_token}`
                },
            };
            const res = await axios.put(`http://localhost:3000/api/chat/renameGroup`, {
                chatId: selectedChat._id,
                chatName: groupChatName
            } , config)
         
            setSelectedChat(res.data);
            setFetchAgain(!fetchAgain);
        } catch(err) {
            console.log(err);
        }
        setGroupChatName("");
        chatNameRef.current.value = "";
    };

    const handleSearch = async(query) => {
        setSearch(query);
        try {
            setLoading(true);

            const config = {
                headers: {
                    authorization: `Bearer ${user.access_token}`
                },
            };
            const res = await axios.get(`http://localhost:3000/api/user?search=${search}`, config)
            setLoading(false);
            setSearchResult(res.data);
        } catch(err) {
            console.log(err);
        }
        
    };

    const handleClick = async(friend) => {
        if(selectedChat.users.find(u => u._id === friend._id)){
            alert("This user already exists in this group");
            return;
        } else {
            if(selectedChat.groupAdmin._id === user.user._id) {
                try {
                    const config = {
                        headers: {
                            authorization: `Bearer ${user.access_token}`
                        },
                    };
                    const res = await axios.put(`http://localhost:3000/api/chat/addToGroup`, {
                        chatId: selectedChat._id,
                        userId: friend._id
                    } , config)
                 
                    setSelectedChat(res.data);
                    setFetchAgain(!fetchAgain);
                } catch(err) {
                    console.log(err);
                }
            } else {
                alert("You are not admin");
            }
        }
    };

    const handleDelete = async(friend) => {
        if(selectedChat.groupAdmin._id === user.user._id) {
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${user.access_token}`
                    },
                };
                const res = await axios.put(`http://localhost:3000/api/chat/removeFromGroup`, {
                    chatId: selectedChat._id,
                    userId: friend._id
                } , config)
             
                if(friend._id === user.user._id) {
                    setSelectedChat();
                } else {
                    setSelectedChat(res.data);
                }
                setFetchAgain(!fetchAgain);
            } catch(err) {
                console.log(err);
            }
        } else {
            alert("You are not admin");
        }
    }


    return (
        <div>
            {
                group ? 
                <>
                    <div className='flex items-center text-2xl cursor-pointer' onClick={() => profileModal.current.showModal()}>
                    <ion-icon name="eye-sharp"></ion-icon>
                    </div>
                    <dialog ref={profileModal} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-semibold text-2xl text-center py-2">{selectedChat.chatName}</h3>

                        <div className='px-4 py-1 flex  flex-wrap'>
                        {
                           selectedChat && selectedChat.users.map(u => <GroupFriendBadge key={u._id} friend={u} handleDelete={handleDelete}/>)
                        }
                        </div>

                        <div className='px-4 py-3 flex'>
                        <input type="text" ref={chatNameRef} placeholder="Chat name" className="input input-bordered w-full" onChange={(e) => setGroupChatName(e.target.value)}/>
                        <button onClick={handleRename} className='bg-sky-600 text-white px-3 ml-2 font-medium rounded-md'>Update</button>
                        </div>
                        <div className='px-4 py-3'>
                        <input type="search" required placeholder="Add User to Group" className="input input-bordered w-full" onChange={(e) => handleSearch(e.target.value)}/>
                        </div>


                        <div className='px-3'>
                        {loading ? <div className='text-center mt-1'><span className="loading loading-ring loading-lg"></span></div>
                        : searchResult?.slice(0,3).map(friend => <SearchFriends key={friend._id} friend={friend} handleClick={handleClick} />)
                        }
                        </div>
                        <div className='px-4 py-3 text-right'>
                        <form method="dialog">
                        <button onClick={() => handleDelete(user.user)} className='bg-red-600 hover:bg-red-700 px-3 py-2 h-10 rounded-md text-white text-md font-medium'>Leave Group</button>
                        </form>
                        </div>

                    </div>
                    </dialog>
                </> 
                : 
                <>
                    <div className='flex items-center text-2xl cursor-pointer' onClick={() => profileModal.current.showModal()}>
                <ion-icon name="eye-sharp"></ion-icon>
                <dialog  ref={profileModal} className="modal flex items-center justify-center">
                        <div className="modal-box flex flex-col items-center">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-3xl text-center">{friend.name}</h3>
                            <div className="w-60 py-3 flex items-center justify-center rounded-[50%] object-cover">
                                <img src={friend.pic} />
                            </div>
                            <p className="text-lg font-normal">Email: {friend.email}</p>
                        </div>
                    </dialog>
            </div>
                </> 
                
            }
        </div>
    );
};

export default ChatboxModal;