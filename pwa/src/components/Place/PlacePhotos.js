import { Box, CircularProgress, Container, Divider, Grid, Typography } from "@material-ui/core";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import SquareImage from "../Image/SquareImage";
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import usePlacePageStyles from "./PlacePage.css";
import { Link } from 'react-router-dom';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import AddPhotoIconCustom from "../Icons/AddPhotoIconCustom";
import { useRef, useState } from "react";
import PostNewDialog from "../Post/PostNew";
import { ResizeFiles } from "../../lib/hooks/ImageCompress/useWebp";

const PlacePhotos = ({ placeId, place, photos, loadingPhotos }) => {
    const classes = usePlacePageStyles();
    const [newPost, setNewPost] = useState(false);
    const [newPhoto, setPhotos] = useState([]);
    const ref = useRef();

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
        <Box m='0 10px'>
            {
                loadingPhotos ? <CircularProgress /> :
                    <div className={classes.row}>
                        <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                            <Typography className='s17' component='h4'>
                                عکس ها
            </Typography>
                            <Link to={`/${place.name}/photos/${placeId}`} >

                                <Typography className='s13' color='primary'>
                                    همه را ببین
                        </Typography>
                            </Link>
                        </Grid>
                        <HorizontalSlider title="عکس‌ها" Component={SquareImage} items={photos.map(p => ({ src: `${p.path}` }))} />


                        <Box m='10px'>
                            <Grid container onClick={() => ref.current.click()} >
                                <CameraAltOutlinedIcon color='primary' /> &nbsp;&nbsp;
                                <Typography style={{ lineHeight: '23px' }} color='primary' className='s13'>اضافه کردن عکس</Typography>
                            </Grid>
                        </Box>
                    </div>
            }
            <PostNewDialog open={newPost} placeId={placeId} handleWindow={setNewPost} photos={newPhoto} />

            <input accept="image/*" ref={ref} type='file' style={{ display: 'none' }} onChange={inputlClickHandler} id="postinput" />
            <Divider className={classes.endingBlock} />

        </Box>
    )
}
export default PlacePhotos;