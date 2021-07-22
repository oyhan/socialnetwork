import { Box, CircularProgress, Container, Divider, Grid, Typography } from "@material-ui/core";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import SquareImage from "../Image/SquareImage";
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import usePlacePageStyles from "./PlacePage.css";
import { Link } from 'react-router-dom';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import AddPhotoIconCustom from "../Icons/AddPhotoIconCustom";

const PlacePhotos = ({ placeId, place, photos, loadingPhotos }) => {
    const classes = usePlacePageStyles();


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
                            <Grid container>
                                <CameraAltOutlinedIcon color='primary' /> &nbsp;&nbsp;
                                <Typography style={{ lineHeight: '23px' }} color='primary' className='s13'>اضافه کردن عکس</Typography>
                            </Grid>
                        </Box>
                    </div>
            }

            <Divider className={classes.endingBlock} />

        </Box>
    )
}
export default PlacePhotos;