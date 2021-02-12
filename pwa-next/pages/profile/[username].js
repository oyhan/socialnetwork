import React from 'react';
import { useRouter } from 'next/router'
import UserProfile from '../../components/Profile/UserProfile/UserProfile';


export default function Profile() {
    const router = useRouter();
    const { username } = router.query;

    return (
        <UserProfile username={username} />
    )
}