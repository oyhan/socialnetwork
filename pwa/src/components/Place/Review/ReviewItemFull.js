import { Avatar, Box, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { appMoment } from "../../../lib/appmoment";
import { toHumanReadableDateLong } from "../../../lib/dateHelper";
import Rate from "../../Rate/Rate";

const useStyle = makeStyles(theme => ({
    avatar: {
        marginRight: 5,
        width: 50,
        height: 50
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
        <Container>
            <Grid container className={classes.root} >

                <Grid item>
                    <Typography className="titr16700">

                        "{title}"

                 </Typography>
                </Grid>

                <Grid container style={{margin  : '8px 0px 15px 0px'}} >
                    <Rate fontSize={28} value={rate} />
                    <Typography variant='caption' color='disabled' >
                        <Box className='s14' color='rgba(110, 100, 100, 1)' fontWeight='fontWeightLight' m='0 10px'>{toHumanReadableDateLong(dateWritten)}</Box>
                    </Typography>
                </Grid>

                <Grid item >
                    <Grid container direction='column'>

                        <Grid item   >
                            <Grid container >
                                <Avatar className={classes.avatar} src={avatarUrl} size='small' />
                                <Grid item >
                                    <Box marginTop='2px' color='rgba(159, 156, 156, 0.89)'>
                                        <Grid container> <Typography className='s13' variant='caption' component='pre'> {writer} ({writerUserName}) ({noOfReviews} نظر)</Typography></Grid>
                                        <Grid container><Typography className='s13' variant='caption' component='pre'> {writerCity}</Typography> </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item>
                        <Box color='rgba(83, 76, 76, 1)'>
                            <Typography className='s12' component='pre'>
                                {description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    )
}