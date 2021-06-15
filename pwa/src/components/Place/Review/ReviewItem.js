import { Avatar, Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { appMoment } from "../../../lib/appmoment";
import Rate from "../../Rate/Rate";

const useStyle = makeStyles(theme=>({
    avatar  : {
        marginRight :  10
    },
    root : {
        margin : '10px 0'
    }
}))
export default function ReviewItem(review) {
    const { writerUserName, rate, description,
        dateWrittenString, dateWritten, writer, title ,userAvatar } = review;
    
    const avatarUrl =userAvatar;
    const classes = useStyle();
    return (
        <Grid container className={classes.root} >
            <Grid item className={classes.avatar}  >
                <Avatar src={avatarUrl} size='small' />
            </Grid>

            <Grid item >
                <Grid container direction='column'>
                    <Grid container >
                        <Rate size='small' value={rate} />
                        <Typography variant='caption' color='disabled' >
                            <Box fontWeight='fontWeightLight' m='0 5px'>{appMoment(dateWritten).fromNow()}</Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className="titr2">
                           
                                {title}
                           
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography  variant='caption' component='pre'>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}