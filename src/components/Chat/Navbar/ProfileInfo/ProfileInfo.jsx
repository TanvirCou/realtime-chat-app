import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ user }) => {
    const navigate = useNavigate();
    const profileModal = useRef();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate("/");
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn bg-white shadow-none border-none px-1">
                <div className="avatar flex items-center">
                    <div className="w-8 rounded-[50%] object-cover">
                        <img src={user?.pic} />
                    </div>
                    <div className='text-2xl ml-1.5 flex items-center'>
                        <ion-icon name="caret-down-sharp"></ion-icon>
                    </div>
                </div>

            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button className="text-md font-medium" onClick={() => profileModal.current.showModal()}>My Profile</button>
                    <dialog  ref={profileModal} className="modal flex items-center justify-center">
                        <div className="modal-box flex flex-col items-center">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-3xl text-center">{user?.name}</h3>
                            <div className="w-60 py-3 flex items-center justify-center rounded-[50%] object-cover">
                                <img src={user?.pic} />
                            </div>
                            <p className="text-lg font-normal">Email: {user?.email}</p>
                        </div>
                    </dialog>
                </li>
                <li><p onClick={handleLogout} className='text-md font-medium'>Log out</p></li>
            </ul>
        </div>
    );
};

export default ProfileInfo;