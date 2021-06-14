import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import BoboChip from "../../Chip/Chip";
import ThinDivider from "../../Dividers/ThinDevider";
import Rate from "../../Rate/Rate";


const useStyles = makeStyles(theme => ({
    imagediv: {

    },
    contentDiv: {

    },
    image: {
        width: 80,
        height: 80
    },
    rate: {
        display: 'inherit'
    },
    title: {
        fontSize: 12,
        fontWeight: 600
    },
    noOfReviews: {
        fontSize: 9,
        fontWeight: 600,
    },
    inline: {
        display: 'inherit'

    },
    root: {
        marginBottom: 40,
        marginTop: 20,

    }
}))

export default function SliderItem1({ rate, placeType, name, noOfReviews, distanceString, isOpen, id, iconic, favorite }) {
    const classes = useStyles();
    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={3} className={classes.imagediv}>
                    <img className={classes.image} src="/coffeeshop2.jpg" />
                </Grid>
                <Grid item xs={9} className={classes.contentDiv}>
                    <Grid container direction='column'>
                        <Typography className={classes.title} >
                            {name}
                        </Typography>
                        <div className={classes.rate} >
                            <Rate size='small' value={rate} /> &nbsp;
                            <Typography variant='subtitle2' color='textSecondary'>
                                <span >{noOfReviews} نظر</span>
                            </Typography>
                        </div>


                        <Typography variant="caption" color="textSecondary" className={classes.inline}>
                            <BoboChip size="small" label={`${distanceString}`} />
                                &nbsp;
                                <Typography variant='subtitle2'>
                                فاصله از موقعیت کنونی
                                    </Typography>
                        </Typography>

                        <Typography variant='subtitle2' color='textSecondary'>
                            {placeType || "ایرانی،بین‌المللی"}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{ width: '100%' }} />
            {/* <ThinDivider /> */}
        </>
    )
}