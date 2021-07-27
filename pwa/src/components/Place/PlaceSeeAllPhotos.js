import { Grid, makeStyles } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useHttpClient } from "../../lib/BrowserHttpClient";
import AppBar from "../AppBar/AppBar";
import clsx from 'clsx'
import ToolbarButton from "../Button/ToolBarButton";
import PostNewDialog from "../Post/PostNew";
import { ResizeFiles } from "../../lib/hooks/ImageCompress/useWebp";
import { useRef, useState } from "react";
const useStyle = makeStyles(theme => ({
    photo: {
        // width: (window.visualViewport.width - 30) / 3,
        // height: (window.visualViewport.width - 30) / 3,
        width: 121,
        height: 121,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    item: {
        margin: 2
    }
}))

export default function PlaceSeeAllPhotos() {
    const { placeId } = useParams();
    const ref = useRef();

    const [newPost, setNewPost] = useState(false);
    const [photos, setPhotos] = useState([]);

    const [loading, data, error] = useHttpClient(`/place/photos/${placeId}/0/1000`, "Get", r => r.response);

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

    const addNewPhoto = [<ToolbarButton onClick={() => ref.current.click()}>
        اضافه کن
    </ToolbarButton>]

    const classes = useStyle();
    return (
        <>
            <AppBar back title="عکس ها" leftIcons={addNewPhoto} short />

            {/* <Grid container> */}
            <input accept="image/*" ref={ref} type='file' style={{ display: 'none' }} onChange={inputlClickHandler} id="postinput" />
            <Grid container >
                {
                    data && data.map((p, i) => {

                        return (
                            // <Grid className={classes.item} key={i} item>
                            <div className={clsx(classes.photo, classes.item)}
                                style={{ backgroundImage: `url(${p.path})` }} />
                            // </Grid>
                        )

                    })
                }
            </Grid>
            <PostNewDialog open={newPost} placeId={placeId} handleWindow={setNewPost} photos={photos} />


            {/* </Grid> */}
        </>
    )

}