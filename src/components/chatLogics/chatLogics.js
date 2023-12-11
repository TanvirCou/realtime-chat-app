export const getFriendChatName = (user, combineUsers) => {
    return (combineUsers[0]?._id === user.user._id) ? (combineUsers[1].name) : (combineUsers[0].name);
};