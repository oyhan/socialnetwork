import SinglePost from '../../components/Post/SinglePost';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../lib/BrowserHttpClient';



export default function PostPage() {
    const { postId } = useParams();
    const [loading,post,error] = useHttpClient(`/post/getpostbyid?postId=${postId}`,"Get", r=>r.response);
    console.log('post: ', post);
    
    return (
        !loading && 
        <SinglePost {...post} />
    )

}