import { CircularProgress, Grid, LinearProgress, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    progress: {
        alignSelf: 'center'
    },
    root :{
        direction : 'rtl'
    }
    
}))

export default function Waiting({ message }) {
    const classes = useStyle();
    return (
        <Grid container className={classes.root} justify='space-evenly'>
            <Grid xs={4} item className={classes.progress}>
                <LinearProgress size={25} />
            </Grid>
            <Grid item >
                <Typography variant='caption'>
                    {message || "...درحال ارسال اطلاعات"}
                </Typography>
            </Grid>
        </Grid>
    )
}