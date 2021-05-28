import { CircularProgress, Container, Divider, Grid, Typography } from "@material-ui/core";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import SquareImage from "../Image/SquareImage";
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import usePlacePageStyles from "./PlacePage.css";



const PlacePhotos = ({ placeId }) => {
    const classes = usePlacePageStyles();
    const [loading, data, error] = useHttpClient(`/place/photos/${placeId}`, "Get", r => r.response)


    return (
        <>
            {
                loading ? <CircularProgress /> : <Container className={classes.row}>
                    <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                        <Typography component='h4'>
                            عکس ها
            </Typography>
                        <Link to="/:placeName/photos/:placeId" >

                            <Typography color='primary'>
                                همه را ببین
                        </Typography>
                        </Link>
                    </Grid>
                    <HorizontalSlider title="عکس‌ها" Component={SquareImage} items={data.map(p => ({ src: `${p.path}` }))} />
                </Container>
            }

            <Divider />

        </>
    )
}
export default PlacePhotos;