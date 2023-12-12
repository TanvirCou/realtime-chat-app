import { useContext, useState } from 'react';
import SideDrawer from '../SideDrawer/SideDrawer';
import Notification from '../Notification/Notification';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { UserContext } from '../../../context/UserProvider';
import axios from "axios";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    const handleSearch = async () => {
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
        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className='shadow-md w-full top-0 left-0'>
            <div className='flex items-center justify-between bg-white py-1 md:py-2 md:px-10 px-2'>
                <div>
                    <SideDrawer search={search} setSearch={setSearch} handleSearch={handleSearch} loading={loading} searchResult={searchResult} />
                </div>

                <div className='font-bold text-2xl md:text-3xl ml-8 md:ml-0 cursor-pointer items-center font-[Poppins] 
      text-gray-800'>
                    Panda-Chat
                </div>

                <ul className={`flex items-center`}>
                    <li className='mx-2 '>
                        <Notification />
                    </li>
                    <li >
                        <ProfileInfo user={user?.user} />
                    </li>
                </ul>

            </div>

        </div>
    );
};

export default Navbar;