import { useEffect, useState } from "react";
import { BrowserHttpClient } from "../../lib/BrowserHttpClient";


export default function usePostLike(userLiked, initialLikes, id) {
    
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(userLiked);
    
    const toggleLike = () => {
        if (!liked) {
            BrowserHttpClient.Post(`/like/${id}`).then(() => {
                
            }).finally(()=>{
                setLikes(likes=>likes+1);
            })
        } else {
            BrowserHttpClient.Post(`/unlike/${id}`).then(() => {
                // setLikes(likes=>likes-1);
            }).finally(()=>{
                setLikes(likes=>likes-1);
            })
        }
        setLiked(!liked);
    }


    return [likes, liked, toggleLike];

}