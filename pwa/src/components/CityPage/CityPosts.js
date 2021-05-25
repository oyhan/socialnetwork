import { Grid, makeStyles } from "@material-ui/core"
import {Link} from 'react-router-dom'
const useStyle = makeStyles(theme => ({
    photo: {
        width: 70,
        height: 70,
    },
    item: {
        margin: theme.spacing(.2)
    }
}))

export default function CityPosts({ posts }) {
    const classes = useStyle();
    return (
        <Grid container>
            {
                posts.map(p => {

                    return (
                        <Grid className={classes.item} key={p.id} item>
                            <Link to={`/post/${p.id}`}>
                                <img className={classes.photo} src={p.coverPhoto} />
                            </Link>
                        </Grid>
                    )

                })
            }
        </Grid>

    )

}