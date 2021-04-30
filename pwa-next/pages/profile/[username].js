import { useRouter } from 'next/router';
import React from 'react';
import UserProfile from '../../components/Profile/UserProfile/UserProfile';
import httpClientBuilder from '../../lib/HttpClient';


export default function Profile({ user }) {
    const router = useRouter();
    const { userName } = router.query;

    return (
        <UserProfile user={user} />
    )
}

export async function getServerSideProps(context) {
    const userName = context.params.userName;
    var httpClient = httpClientBuilder(context);

    var result = await httpClient.Get(`/profile/get/${userName}`);
    
    if (result.response.isOwner) {
        return {
            redirect: {
                destination: '/mybobo',
                permanent: false,
            }
        }
    }
    return {
        props: {
            user: result.response
        }
    }

}