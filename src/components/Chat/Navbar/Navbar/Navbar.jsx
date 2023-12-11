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
    

    const {user} = useContext(UserContext);

    

    const handleSearch = async() => {
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
        
    }

    console.log(searchResult);

    const [open, setOpen] = useState(false);

    return (
        <div className='shadow-md w-full top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
                <div>
                    <SideDrawer search={search} setSearch={setSearch} handleSearch={handleSearch} loading={loading} searchResult={searchResult}/>
                </div>
            
                <div className='font-bold text-3xl cursor-pointer items-center font-[Poppins] 
      text-gray-800'>
                    Panda-Chat
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 ' : 'top-[-490px]'}`}>
                    <li className='md:my-0 mx-2 my-7'>
                    <Notification />
                    </li>
                    <li className=' md:my-0 my-7'>
                        <ProfileInfo user={user?.user} />
                    </li>
           
                    
                </ul>

            </div>

        </div>
    );
};

export default Navbar;