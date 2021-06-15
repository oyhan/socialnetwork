
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import AppBar from '../../components/AppBar/AppBar';
import ToolbarButton from '../../components/Button/ToolBarButton';
import CityPosts from '../../components/CityPage/CityPosts';
import PostNewDialog from '../../components/Post/PostNew';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import { ResizeFiles } from '../../lib/hooks/ImageCompress/useWebp';
export default function CityPostsPage() {

    const { cityId } = useParams();
    const ref = useRef();
    const [loading, posts, error] = useHttpClient(`/city/posts/${cityId}`, "Get", r => r.response);
    const [newPost, setNewPost] = useState(false);
    const [photos, setPhotos] = useState([]);
    const addNewPhoto = [<ToolbarButton onClick={() => ref.current.click()}>
        اضافه کن
    </ToolbarButton>]

    const inputlClickHandler = (event) => {
        const file = event.target.files[0];
        if (file.size / 1024 > 300) {
            ResizeFiles([file], 0.5).then(resizedFiles => {
                setPhotos(resizedFiles);
                setNewPost(true);
            })
        } else {
            setPhotos([file]);
            setNewPost(true);
        }
    }
    return (
        <>
            <input accept="image/*" ref={ref} type='file' style={{ display: 'none' }} onChange={inputlClickHandler} id="postinput" />
            <AppBar back title="عکس ها" leftIcons={addNewPhoto} short />
            {
                !loading && <CityPosts posts={posts} />
            }
            <PostNewDialog open={newPost} cityId={cityId} handleWindow={setNewPost} photos={photos} />

        </>

    )

}