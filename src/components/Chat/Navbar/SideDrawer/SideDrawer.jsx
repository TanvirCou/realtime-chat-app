/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from 'react';
import SearchLoading from "../SearchLoading/SearchLoading";
import SearchFriends from '../SearchFriends/SearchFriends';
import { UserContext } from '../../../context/UserProvider';
import axios from "axios";

const SideDrawer = ({ search, setSearch, handleSearch, loading, searchResult }) => {
    const drawerRef = useRef();
    const [loadingChat, setLoadingChat] = useState();
    const { user, setSelectedChat, chats, setChats } = useContext(UserContext);

    const handleClick = async (friend) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    authorization: `Bearer ${user.access_token}`
                },
            };

            const res = await axios.post(`https://chat-app-2tmy.onrender.com/api/chat/createChat`, { userId: friend._id }, config);
            if (!chats.find(c => c._id === res.data._id)) {
                setChats([res.data, ...chats]);
            }
            setLoadingChat(false);
            setSelectedChat(res.data);
            drawerRef.current.checked = false;
        } catch (err) {
            //
        }
    }

    return (
        <div className="drawer">
            <input id="my-drawer" ref={drawerRef} type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" data-tip="Search for friends" className="btn flex text-md  font-medium bg-gray-200 shadow-none border-none drawer-button tooltip tooltip-bottom">
                    <div className='md:text-xl text-lg flex items-center'>
                        <ion-icon name="search-sharp"></ion-icon>
                    </div>
                    <p className='hidden md:flex'>Search User</p>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-2 w-80 min-h-full bg-base-200 text-black">

                    <li>
                        <p className='text-lg font-medium'>Search Friends</p>
                    </li>
                    <li className='flex flex-row px-2'>
                        <div className='px-0 w-fit'>
                            <input type="search" placeholder="Search your friends" value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered input-info w-56" />
                        </div>
                        <div className='px-0 ml-2 w-fit'>
                            <button onClick={handleSearch} className="btn btn-outline  btn-info w-12">Go</button>
                        </div>
                    </li>
                    {searchResult && <li>
                        {loading ? <SearchLoading />
                            : (searchResult?.slice(0, 6).map(friend => <SearchFriends key={friend._id} friend={friend} handleClick={handleClick} />))}
                    </li>}

                </ul>
            </div>
        </div>

    );
};

export default SideDrawer;




