import React from "react";
import { useUser } from './../Auth/useUser';


export default function AccountInfo(){

    const user = useUser();

    return (
        <>
            Account Info
            {user.email}
            {user.firstName}

        </>
    )
}