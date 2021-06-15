import { Avatar, Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { appMoment } from "../../../lib/appmoment";
import Rate from "../../Rate/Rate";

const useStyle = makeStyles(theme => ({
    avatar: {
        marginRight: 10
    },
    root: {
        margin: '10px 0',
        "& > div": {
            margin: '5px 0'
        }
    }
}))
export default function ReviewItemFull(review) {
    const { writerUserName, rate, description,
        dateWrittenString, dateWritten, writer, title, userAvatar, noOfReviews, writerCity, } = review;

    const avatarUrl = userAvatar;
    const classes = useStyle();
    return (
        <Grid container className={classes.root} >

            <Grid item>
                <Typography className="titr">

                    "{title}"

                </Typography>
            </Grid>
            <Grid container >
                <Rate size='large' value={rate} />
                <Typography variant='caption' color='disabled' >
                    <Box fontWeight='fontWeightLight' m='0 5px'>{appMoment(dateWritten).fromNow()}</Box>
                </Typography>
            </Grid>
            <Grid item >
                <Grid container direction='column'>

                    <Grid item   >
                        <Grid container >
                            <Avatar className={classes.avatar} src={avatarUrl} size='small' />
                            <Grid item >
                                <Grid container> <Typography color='textSecondary' variant='caption' component='pre'> {writer} ({writerUserName}) ({noOfReviews} نظر)</Typography></Grid>
                                <Grid container><Typography color='textSecondary' variant='caption' component='pre'> {writerCity}</Typography> </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>

            </Grid>
            <Grid container>
                <Grid item>
                    <Typography variant='caption' component='pre'>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}