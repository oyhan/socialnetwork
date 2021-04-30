import { CircularProgress, Grid, LinearProgress, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    progress: {
        alignSelf: 'center'
    }
}))

export default function Waiting({ message }) {
    const classes = useStyle();
    return (
        <Grid container justify='space-around'>
            <Grid  item className={classes.progress}>
                <CircularProgress size={25} />
            </Grid>
            <Grid item >
                <Typography variant='caption'>
                    {message || "درحال ارسال اطلاعات"}
                </Typography>
            </Grid>
        </Grid>
    )
}

{/* <Grid container justify='space-between'>
    <Grid xs={12} item className={classes.progress}>
        <LinearProgress />
    </Grid>
    {/* <Grid item >
    <Typography>
        {message || "درحال ارسال اطلاعات"}
    </Typography>
</Grid> 
</Grid> */}