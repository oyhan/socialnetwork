import { Grid, makeStyles } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { useHttpClient } from "../../lib/BrowserHttpClient";
import AppBar from "../AppBar/AppBar";
import clsx from 'clsx'
const useStyle = makeStyles(theme => ({
    photo: {
        // width: (window.visualViewport.width - 30) / 3,
        // height: (window.visualViewport.width - 30) / 3,
         width:121,
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
    const [loading, data, error] = useHttpClient(`/place/photos/${placeId}/0/1000`, "Get", r => r.response)

    const classes = useStyle();
    return (
        <>
            <AppBar back title="عکس ها" short />

            {/* <Grid container> */}
                <Grid container justify='center'>
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

            {/* </Grid> */}
        </>
    )

}