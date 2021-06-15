import { Grid, makeStyles } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useHttpClient } from "../../lib/BrowserHttpClient";
import AppBar from "../AppBar/AppBar";
import clsx from 'clsx'
const useStyle = makeStyles(theme => ({
    photo: {
        width: (window.visualViewport.width-30) /3,
        height: (window.visualViewport.width-30) /3,
    },
    item: {
        margin: theme.spacing(.2)
    }
}))

export default function PlaceSeeAllPhotos() {
    const { placeId } = useParams();
    const [loading, data, error] = useHttpClient(`/place/photos/${placeId}/0/1000`, "Get", r => r.response)

    const classes = useStyle();
    return (
        <>
            <AppBar back title="عکس ها" short />

            <Grid container>
                {
                    data && data.map((p, i) => {

                        return (
                            // <Grid className={classes.item} key={i} item>
                                <img className={clsx(classes.photo,classes.item)} src={p.path} />
                            // </Grid>
                        )

                    })
                }
            </Grid>
        </>
    )

}