import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';

const Message = ({message, messages, index}) => {
    const {user} = useContext(UserContext);

    const isSameSender = (messages, m, i, userId) => {
        return (
          i < messages.length - 1 &&
          (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
          messages[i].sender._id !== userId
        );
      };
      
     const isLastMessage = (messages, i, userId) => {
        return (
          i === messages.length - 1 &&
          messages[messages.length - 1].sender._id !== userId &&
          messages[messages.length - 1].sender._id
        );
      };

    const isSameSenderMargin = (messages, m, i, userId) => {
        if (
          i < messages.length - 1 &&
          messages[i + 1].sender._id === m.sender._id &&
          messages[i].sender._id !== userId
        )
          return 33;
        else if (
          (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
          (i === messages.length - 1 && messages[i].sender._id !== userId)
        )
          return 0;
        else return "auto";
      };


    return (
       
            <div className={`flex flex-col ${(message.sender._id === user.user._id) ? "items-end" : "items-start"}`}>
            <div className="flex items-end py-0.5 px-1">
                {
                    (isSameSender(messages, message, index, user.user._id) || isLastMessage(messages, index, user.user._id))  && <img src={message.sender.pic} alt="" className="w-9 h-9 rounded-[50%] object-cover"/>
                }
                <p style={{marginLeft : `${isSameSenderMargin(messages, message, index, user.user._id)}px`}} className={` text-[15px]  max-w-[350px] font-normal rounded-xl ${(message.sender._id === user.user._id) ? "bg-sky-400" :  "bg-green-400 "}  break-words h-full p-2`}>{message.content}</p>
            </div>
            {/* <div className="p-1 mb-2">
                <p className="text-sm text-gray-500 font-medium">{format(message.createdAt)}</p>
            </div> */}
        </div>
      
    );
};

export default Message;