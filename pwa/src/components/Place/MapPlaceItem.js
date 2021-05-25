import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '73%'
    },
    content: {
        flex: '1 0 auto',
        width: '100%'
    },
    cover: {
        width: 100,
        height: 100
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    inline: {
        margin: '10px 0 7px 0',
        display: 'flex',
        justifyContent: 'space-between'
    },
}));

function RestaurantPicture() {
    return <div></div>
}

export default function MapPlaceItem() {
    const classes = useStyles();


    return (<>
        <Card elevation={0} className={classes.root}>
            <CardMedia
                className={classes.cover}
                image="/coffeeshop2.jpg"
                title="علاقه‌مندی"
            />
            <div className={classes.details}>

                <CardContent className={classes.content}>
                    <div className={classes.inline}>
                        <Typography component="h6" variant="h6">
                            {name}
                        </Typography>
                        <span>
                            <IconButton size='small' onClick={handlFave} aria-label="add to favorites">
                                {
                                    faved ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />
                                }
                            </IconButton>
                        </span>
                    </div>
                    <Typography className={classes.inline}>
                        <Rate size='small' value={rate} />
                        <Typography variant='caption' className={classes.ratesCount} color='disabled'>
                            <span>{noOfReviews} نظر</span>
                            <span>{isOpen ? "باز است" : "بسته است"}</span>

                        </Typography>
                    </Typography>

                    <Typography variant="caption" className={classes.inline} color="textSecondary">
                        <BoboChip size="small" label={`${distanceString}`} />
                        <Typography variant='caption'>
                            فاصله از موقعیت کنونی
                        </Typography>
                    </Typography>
                    <Typography variant='caption'>
                        {placeType}
                    </Typography>
                </CardContent>

            </div>

        </Card>
    </>)


}