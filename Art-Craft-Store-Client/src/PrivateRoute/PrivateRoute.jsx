import React, { useContext } from 'react';
import { AuthContext } from '../AuthProviders/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const { users, loading } = useContext(AuthContext)
   
    // wthout login if user click view details it will ridirect to login page with a pathname
    const location = useLocation();
    console.log(location.pathname)

    if(loading){
        return <div className="flex items-start justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600" bis_skin_checked="1"></div>
        </div>
    }

    if(users){
        return children;
    }
    return <Navigate state={location.pathname} to='/login'>Sign In</Navigate> // set the state with location pathname & then go to login page
};

export default PrivateRoute;