import React from 'react';

const Notification = () => {
    return (
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn bg-white shadow-none border-none px-1">
        <div className='text-xl flex items-center'>
        <ion-icon name="notifications-sharp"></ion-icon>
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
    );
};

export default Notification;