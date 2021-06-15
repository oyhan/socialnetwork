import { Box, Grid, LinearProgress, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    bar: {
        height: theme.spacing(1.2),
        backgroundColor: theme.palette.background.default
    },
    root: {
        margin: '1px 0'
    },
    barRow: {
        alignSelf: 'center'
    },
    bar2: {
        height: theme.spacing(2.7),
        backgroundColor: theme.palette.background.default,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        borderStyle: 'solid',
        marginBottom: 10

    }
}))
export default function ReviewBarChartItem({ count, total, title, size, ...props }) {

    const classes = useStyle();
    const value = count === 0 ? 0 : count * 100 / total;

    return (
        <Grid container className={classes.root}>
            <Grid item xs={size == 'large' ? 3 : 2}><Typography variant={size == 'large' ? '' : 'subtitle2'} color='textSecondary'>{title}</Typography></Grid>
            <Grid item xs={8} className={classes.barRow}>
                {
                    size === 'large' ? <LinearProgress {...props} classes={{ root: classes.bar2 }} variant="determinate" value={value} /> :
                        <LinearProgress {...props} classes={{ root: classes.bar }} variant="determinate" value={value} />
                }
            </Grid>
            <Grid item xs={1}>
                {
                    size === 'large' ? <Box m='0 15px'>
                        {count}
                    </Box> :
                        <Box m='0 5px'>
                            {count}
                        </Box>
                }

            </Grid>
        </Grid>

    )
}