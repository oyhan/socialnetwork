import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getRecentSearchHistory } from "../../helper/citySearchHelper";

const useStyles = makeStyles({
    search: {
        marginTop: 30
    }
})


export default function RecentSearch({handClickRecentSearch}) {
    const classes= useStyles();
    return (
        <div className={classes.search}> 
            <Typography color="textSecondary">
                جستجوهای اخیر
            </Typography>
            <Grid container  justify='space-between'>
                {getRecentSearchHistory().map(c =>

                    <Grid style={{ margin: '15px 10px' }} onClick={handClickRecentSearch(c)} container >
                        <Typography>
                            {c.city},{c.province}
                        </Typography>
                    </Grid>
                )}

                {/* <Grid item>
                <Chip label="5 کیلومتر" className={classes.distance} />
            </Grid> */}
            </Grid>
        </div>
    )
}