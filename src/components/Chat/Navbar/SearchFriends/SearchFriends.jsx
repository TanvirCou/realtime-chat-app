import React from 'react';

const SearchFriends = ({friend, handleClick}) => {
    return (
        <div onClick={() => handleClick(friend)} className='flex items-center cursor-pointer hover:bg-gray-200 border-2 my-1 border-sky-500 mx-2 px-1 py-2 rounded-md'>
            <div>
                <img src={friend?.pic} alt="" className='w-12 rounded-[50%] object-cover]'/>
            </div>
            <div className='ml-2'>
                <p className='text-md font-medium'>{friend?.name}</p>
                <p className='text-sm font-normal'>{friend?.email}</p>
            </div>
        </div>
    );
};

export default SearchFriends;