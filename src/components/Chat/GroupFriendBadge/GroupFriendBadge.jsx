import React from 'react';

const GroupFriendBadge = ({friend, handleDelete}) => {
    return (
    
            <div className='flex items-center bg-sky-500 text-white mx-1 px-2 rounded-md w-fit'>
            <p>{friend.name}</p>
            <div onClick={() => handleDelete(friend)} className='flex items-center cursor-pointer ml-1'>
            <ion-icon name="close-sharp"></ion-icon>
            </div>
        </div>
    
    );
};

export default GroupFriendBadge;