
import { useParams } from 'react-router-dom'
import AppBar from '../../components/AppBar/AppBar';
import ToolbarButton from '../../components/Button/ToolBarButton';
import CityPosts from '../../components/CityPage/CityPosts';
import { useHttpClient } from '../../lib/BrowserHttpClient';
export default function CityPostsPage() {

    const { cityId } = useParams();

    const [loading, posts, error] = useHttpClient(`/city/posts/${cityId}`, "Get", r => r.response);
    
    const addNewPhoto = [<ToolbarButton>
        اضافه کن
    </ToolbarButton>]

    return (
        <>
            <AppBar back title="عکس ها" leftIcons={addNewPhoto} short />
            {
                !loading && <CityPosts posts={posts} />
            }
        </>

    )

}