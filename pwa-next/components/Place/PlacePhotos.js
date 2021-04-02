import { CircularProgress, Divider } from "@material-ui/core";
import { property } from "lodash";
import { Container } from "next/app";
import { useEffect } from "react";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import SquareImage from "../Image/SquareImage";
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import usePlacePageStyles from "./PlacePage.css";



const PlacePhotos = ({ placeId }) => {
    const classes = usePlacePageStyles();
    const [loading, data, error] = useHttpClient(`http://localhost:12089/place/photos/${placeId}`, "Get", r => r.response)

    return (
        <>
            {
                loading ? <CircularProgress /> : <Container className={classes.row}>
                    <HorizontalSlider title="عکس‌ها" Component={SquareImage} items={data.map(p => ({src :`http://localhost:12089/${p.path}`}))} />
                </Container>
            }

            <Divider />

        </>
    )
}
export default PlacePhotos;