import React from 'react';
import { useRouter } from 'next/router'
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

    var result = await httpClient.Get(`http://localhost:12089/profile/get/${userName}`);
    console.log('result: ', result);
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