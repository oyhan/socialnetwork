import { CircularProgress, Divider } from "@material-ui/core";
import { Container } from "next/app";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import SquareImage from "../Image/SquareImage";
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import usePlacePageStyles from "./PlacePage.css";



const PlacePhotos = ({ placeId }) => {
    const classes = usePlacePageStyles();
    const [loading, data, error] = useHttpClient(`/place/photos/${placeId}`, "Get", r => r.response)
    console.log('data: ', data);

    return (
        <>
            {
                loading ? <CircularProgress /> : <Container className={classes.row}>
                    <HorizontalSlider title="عکس‌ها" Component={SquareImage} items={data.map(p => ({ src: `${p.path}` }))} />
                </Container>
            }

            <Divider />

        </>
    )
}
export default PlacePhotos;