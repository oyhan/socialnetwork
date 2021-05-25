import React from 'react';
import { useHistory , useParams} from 'react-router-dom';
import UserProfile from '../../components/Profile/UserProfile/UserProfile';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import {Redirect} from 'react-router-dom';
export default function Profile() {
    const router = useHistory();
    const { userName } = useParams();
    

    const [loading , user , error] = useHttpClient(`/profile/get/${userName}`,"Get",r=>r.response);

    return (
        !loading && user.isOwner ? <Redirect to="/mybobo" /> : !loading && <UserProfile user={user} />
    )
}

