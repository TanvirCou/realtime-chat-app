import { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import { getFriendChatName } from '../../../chatLogics/chatLogics';

const Notification = () => {
  const { user, setSelectedChat, notifications, setNotifications } = useContext(UserContext);

  function checkAndCloseDropDown(e){
    let targetEl = e.currentTarget;
    if(targetEl && targetEl.matches(':focus')){
      setTimeout(function(){
        targetEl.blur();
      }, 0);
    }
  }
  
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" onMouseDown={(e)=>checkAndCloseDropDown(e)}  className="btn relative bg-white shadow-none border-none md:px-1 px-0">
        <div className='text-lg md:text-xl flex items-center'>
          <ion-icon name="notifications-sharp"></ion-icon>
        </div>
        {notifications.length ? <span className='absolute flex items-center justify-center top-1 ml-3  bg-red-600 rounded-[50%] text-white px-[5px] font-medium text-xs'>{notifications.length}</span> : ""}
      </div>
      <ul tabIndex={0} className="dropdown-content overflow-y-scroll webkit max-h-28 z-[1] menu p-1 shadow bg-base-100 rounded-box w-56">
        <li>
          {!notifications.length && <p className='font-medium py-1 text-sky-600'>No message received</p>}

          {notifications && notifications.map(notification =>
            <div key={notification._id} onClick={() => {
              setSelectedChat(notification.chat);
              setNotifications(notifications.filter(n => n !== notification));
            }}>
              <p className='font-medium py-1 text-sky-600'>{notification.chat.isGroupChat ? `New message in ${notification.chat.chatName}` : `New message from ${getFriendChatName(user, notification.chat.users)}`}</p>
            </div>)}
        </li>
      </ul>
    </div>
  );
};

export default Notification;