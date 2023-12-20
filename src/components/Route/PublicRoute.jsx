/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const PublicRoute = ({children}) => {
    const { user } = useContext(UserContext);

    return !user ? (children) : 
    <Navigate to='/chat'></Navigate>;
};

export default PublicRoute;