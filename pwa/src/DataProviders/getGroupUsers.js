import React, { useEffect, useState } from 'react'
import { HttpClient } from '../infrastructure/HttpClient';
import { camundaUrl } from '../infrastructure/Urls';


export default function useGroupUsers(groupName){

    var [users,setUsers] = useState([]);

    useEffect(()=>{

        HttpClient.Get(`${camundaUrl}/engine-rest/user?memberOfGroup=${groupName}`)
        .then(response=> {
            setUsers(response);
        })

    },[groupName])

    return users;
}