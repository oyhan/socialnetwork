import { CircularProgress, Container, Divider, Grid, Typography } from "@material-ui/core";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import SquareImage from "../Image/SquareImage";
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import usePlacePageStyles from "./PlacePage.css";
import { Link } from 'react-router-dom';


const PlacePhotos = ({ placeId, place ,photos ,loadingPhotos }) => {
    const classes = usePlacePageStyles();


    return (
        <>
            {
                loadingPhotos ? <CircularProgress /> :
                    <div className={classes.row}>
                        <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                            <Typography component='h4'>
                                عکس ها
            </Typography>
                            <Link to={`/${place.name}/photos/${placeId}`} >

                                <Typography color='primary'>
                                    همه را ببین
                        </Typography>
                            </Link>
                        </Grid>
                        <HorizontalSlider title="عکس‌ها" Component={SquareImage} items={photos.map(p => ({ src: `${p.path}` }))} />
                    </div>
            }

            <Divider className={classes.endingBlock}/>

        </>
    )
}
export default PlacePhotos;