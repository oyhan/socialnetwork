import React from 'react';
import { useRouter } from 'next/router'
import UserProfile from '../../components/Profile/UserProfile/UserProfile';
import httpClientBuilder from '../../lib/HttpClient';


export default function Profile({user}) {
    const router = useRouter();
    const { username } = router.query;

    return (
        <UserProfile  user={user} />
    )
}

export async function getServerSideProps(context) {
    const userName = context.params.username;
  var httpClient = httpClientBuilder(context);
    
    var result = await httpClient.Get(`http://localhost:12089/profile/get/${userName}`);
    

    return {
        props:{
            user : result.response
        }
    }

}