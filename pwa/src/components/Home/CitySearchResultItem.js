import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    search: {
        marginTop: 30
    },
    distance: {
        borderRadius: 0,
        marginTop: 13,

    },
    label: {
        padding: '0 4px',
        color: 'gray',
        fontSize: 12
    },
    chipRoot: {
        height: 24
    },
    locationIcon: {
        marginTop: 6
    }
})
export default function CitySearchResultItem({item, handClickRecentSearch }) {
    
    const classes = useStyles();
    return (
        <Grid container justify='space-between' style={{ margin: '15px 10px' }} onClick={handClickRecentSearch(item)} container >
            <Grid item xs={1}>
                <LocationOnIcon fontSize='small' className={classes.locationIcon} color='primary' />
            </Grid>
            <Grid item xs={8}>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography variant='h6' className="">
                            {item.city}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>
                            Iran,{item.province}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}>
                <Chip label={item.distanceToUser} classes={{ label: classes.label, root: classes.chipRoot }} className={classes.distance} />
            </Grid>
        </Grid>
    )
}