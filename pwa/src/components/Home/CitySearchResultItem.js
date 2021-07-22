import { Chip, Grid, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
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
    },
    root : {
        minWidth : 23
    },
})
export default function CitySearchResultItem({ item, handClickRecentSearch, variant }) {
    

    const classes = useStyles();
    return (

        variant ?
            <ListItem button onClick={handClickRecentSearch(item)}>
                <ListItemAvatar classes={{ root: classes.root }}>
                    <LocationOnIcon fontSize='small' color='primary' />
                </ListItemAvatar>
                <ListItemText
                    classes={{ primary: 'titr15', secondary: 's10' }}
                    primary={item.name}
                    secondary={`Iran,${item.province}`}
                />
            </ListItem>
            
            :
            <Grid container justify='space-between' style={{ margin: '15px 10px' }} onClick={handClickRecentSearch(item)} container >
                <Grid item xs={1}>
                    <LocationOnIcon fontSize='small' className={classes.locationIcon} color='primary' />
                </Grid>
                <Grid item xs={8}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography variant='h6' className="">
                                {item.city || item.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='caption'>
                                Iran,{item.province}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    item.distanceToUser &&
                    <Grid item xs={3}>
                        <Chip label={item.distanceToUser} classes={{ label: classes.label, root: classes.chipRoot }} className={classes.distance} />
                    </Grid>
                }

            </Grid>
    )


}