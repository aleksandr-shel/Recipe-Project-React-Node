import {Route, Navigate} from 'react-router-dom';
import { useUser } from './useUser';

export const PrivateRoute = props =>{
    const user = useUser();


    if (!user) return <Navigate to="/login"/>

    return <Route {...props}/>
}