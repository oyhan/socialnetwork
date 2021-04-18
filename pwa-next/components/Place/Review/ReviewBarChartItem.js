import { Box, Grid, LinearProgress, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    bar: {
        height: theme.spacing(1),
        backgroundColor : theme.palette.background.paper
    },
    root : {
        margin :'1px 0'
    },
    barRow: {
        alignSelf :'center'
    }
}))
export default function ReviewBarChartItem({ count,total, title, ...props }) {
    console.log('total: ', total);
    const classes = useStyle();
    const value = count===0? 0 : count * 100 /total;
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={3}>{title}</Grid>
            <Grid item xs={8} className={classes.barRow}>
                <LinearProgress {...props} classes={{ root: classes.bar }} variant="determinate" value={value} />
            </Grid>
            <Grid item xs={1}>
                <Box m='0 5px'>
                    {count}
                </Box>
            </Grid>
        </Grid>

    )
}