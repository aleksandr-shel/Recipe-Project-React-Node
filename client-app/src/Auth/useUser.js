import { useEffect, useState } from 'react';
import { useLoggedInContext} from '../Context/LoggedInContext';
import { useToken } from './useToken';


export const useUser = ()=>{
    const [token] = useToken();

    const userContext = useLoggedInContext()

    const getPayloadFromToken = token =>{
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload, 'base64'));
    }

    const [user, setUser] = useState(()=>{
        if(!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(()=>{
        if(!token){
            setUser(null);
            userContext.setLoggedIn(false)
        }else {
            setUser(getPayloadFromToken(token));
            userContext.setLoggedIn(true)
        }
    }, [token])

    return user;
}
