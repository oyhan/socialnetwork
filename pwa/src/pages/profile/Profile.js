import React from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from '../../components/Profile/UserProfile/UserProfile';
import { useHttpClient } from '../../infrastructure/HttpClient';

export default function Profile() {
    const router = useHistory();
    const { userName } = router.query;
    const [loading , user , error] = useHttpClient(`/profile/get/${userName}`,r=>r.response);

    return (
        <UserProfile user={user} />
    )
}

