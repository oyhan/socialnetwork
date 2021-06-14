import { Avatar, Box, Divider, Grid, Typography } from "@material-ui/core";
import { appMoment } from "../../../lib/appmoment";
import Rate from "../../Rate/Rate";


export default function ReviewItem(review) {
    const { writerUserName, rate, description,
        dateWrittenString, dateWritten, writer, title ,userAvatar } = review;
    
    const avatarUrl =userAvatar;

    return (
        <Grid container>
            <Grid item xs={2}>
                <Avatar src={avatarUrl} size='small' />
            </Grid>

            <Grid item xs={10}>
                <Grid container direction='column'>
                    <Grid container >
                        <Rate size='small' value={rate} />
                        <Typography variant='caption' color='disabled' >
                            <Box fontWeight='fontWeightLight' m='0 5px'>{appMoment(dateWritten).fromNow()}</Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant='subtitle2'>
                            <Box fontWeight='fontWeightBold'>
                                {title}
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant='caption' component='p'>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}