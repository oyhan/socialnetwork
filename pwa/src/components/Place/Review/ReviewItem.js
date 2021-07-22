import { Avatar, Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { appMoment } from "../../../lib/appmoment";
import { toHumanReadableDateLong } from "../../../lib/dateHelper";
import Rate from "../../Rate/Rate";

const useStyle = makeStyles(theme => ({
    avatar: {
        marginRight: 10
    },
    root: {
        margin: '10px 0'
    },
    avatarReviewItem: {
        marginTop: 5,
        width: 33,
        height: 33,
    }
}))
export default function ReviewItem(review) {
    const { writerUserName, rate, description,
        dateWrittenString, dateWritten, writer, title, userAvatar } = review;
    

    const avatarUrl = userAvatar;
    const classes = useStyle();
    return (
        <Grid container className={classes.root} >
            <Grid item className={classes.avatar}  >
                <Avatar className={classes.avatarReviewItem} src={avatarUrl} size='small' />
            </Grid>

            <Grid item >
                <Grid container direction='column'>
                    <Grid container >
                        <Rate size='small' value={rate} />
                        <Typography variant='caption' color='disabled' >
                            <Box className='s10' color='#6E6464' fontWeight='fontWeightLight' m='0 5px'>{toHumanReadableDateLong(dateWritten)}</Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className="titr14700">
                            {title}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Box color='#534C4C'>
                            <Typography className='s12' variant='caption' component='pre'>
                                {description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}