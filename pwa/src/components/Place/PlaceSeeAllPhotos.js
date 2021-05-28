import { Grid, makeStyles } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useHttpClient } from "../../lib/BrowserHttpClient";
import AppBar from "../AppBar/AppBar";
const useStyle = makeStyles(theme => ({
    photo: {
        width: 70,
        height: 70,
    },
    item: {
        margin: theme.spacing(.2)
    }
}))

export default function PlaceSeeAllPhotos() {
    const { placeId } = useParams();
    const [loading, data, error] = useHttpClient(`/place/photos/${placeId}`, "Get", r => r.response)

    const classes = useStyle();
    return (
        <>
            <AppBar back title="عکس ها" short />

            <Grid container>
                {
                    data && data.map((p, i) => {

                        return (
                            <Grid className={classes.item} key={i} item>
                                <img className={classes.photo} src={p.path} />
                            </Grid>
                        )

                    })
                }
            </Grid>
        </>
    )

}