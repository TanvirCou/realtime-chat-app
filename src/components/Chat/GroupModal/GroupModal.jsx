import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import axios from 'axios';
import SearchFriends from '../Navbar/SearchFriends/SearchFriends';
import GroupFriendBadge from '../GroupFriendBadge/GroupFriendBadge';

const GroupModal = () => {
    const groupModalRef = useRef();
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user, chats, setChats} = useContext(UserContext);

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

    const handleClick = (friend) => {
        if(selectedUsers.includes(friend)) {
            alert("This id is already added");
            return;
        } else {
            setSelectedUsers([friend, ...selectedUsers]);
        }
    };

    const handleDelete = (friend) => {
        setSelectedUsers(selectedUsers.filter(u => u._id !== friend._id));
    }

    const handleSubmit = async() => {
        try {

            const config = {
                headers: {
                    authorization: `Bearer ${user.access_token}`
                },
            };
            const res = await axios.post(`http://localhost:3000/api/chat/createGroupChat`, {
                name: groupChatName,
                usersId: JSON.stringify(selectedUsers.map(u => u._id))
            } , config)
            setChats([res.data, ...chats]);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={()=>groupModalRef.current.showModal()} className='flex items-center text-md font-medium bg-gray-300 py-1 px-2 rounded-md'>
                    New Group Chat
                    <div className='flex items-center text-2xl'>
                    <ion-icon name="add-sharp"></ion-icon>
                    </div>
                </button>
                <dialog ref={groupModalRef} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-semibold text-2xl text-center py-3">Create Group Chat</h3>
                        <div className='px-4 py-3'>
                        <input type="text" required placeholder="Chat name" className="input input-bordered w-full" onChange={(e) => setGroupChatName(e.target.value)}/>
                        </div>
                        <div className='px-4 py-3'>
                        <input type="search" required placeholder="Search Users" className="input input-bordered w-full" onChange={(e) => handleSearch(e.target.value)}/>
                        </div>

                        <div className='px-4 py-1 flex  flex-wrap'>
                        {
                           selectedUsers && selectedUsers.map(u => <GroupFriendBadge key={u._id} friend={u} handleDelete={handleDelete}/>)
                        }
                        </div>

                        <div className='px-3'>
                        {loading ? <div className='text-center mt-1'><span className="loading loading-ring loading-lg"></span></div>
                        : searchResult?.slice(0,3).map(friend => <SearchFriends key={friend._id} friend={friend} handleClick={handleClick} />)
                        }
                        </div>
                        <div className='px-4 py-3 text-right'>
                        <form method="dialog">
                        <button onClick={handleSubmit} className='bg-sky-600 hover:bg-sky-700 px-3 py-2 h-10 rounded-md text-white text-md font-medium'>Create group</button>
                        </form>
                        </div>

                    </div>
                    </dialog>
        </div>
    );
};

export default GroupModal;