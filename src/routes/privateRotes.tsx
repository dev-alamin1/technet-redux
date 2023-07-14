import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const PrivateRotes = ({children}:IProps) => {

    const {user,isLoading} =useAppSelector(state=>state.user);
    const location = useLocation();

    if(isLoading)
    {
         return <p>Loading</p>
    }

    if(!user.email)
    {
         return <Navigate to={'/login'} state={{from:location}} replace/>
    }

    return children;
}

export default PrivateRotes