import { Box, ButtonBase, CircularProgress, Container, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { useState } from "react";
import { BrowserHttpClient, useHttpClient } from "../../lib/BrowserHttpClient";
import SearchInput from "../Input/SearchInput";
import Rate from "../Rate/Rate";
import usePlacePageStyles from "./PlacePage.css";
import ReviewBarChartItem from "./Review/ReviewBarChartItem";
import ReviewItem from "./Review/ReviewItem";
import ReviewNewDialog from "./Review/ReviewNewDialog";
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function PlaceReviews({ restaurantDetail, placeId }) {
    const classes = usePlacePageStyles();

    const { reviews, name, noOfReviews, cuisine, distanceToUser, website, telephone, rate, isOpenNow, services,


        address, location } = restaurantDetail;
    console.log('rate: ', rate);

    const [reviewSearchText, setSearchText] = useState("");
    const [loading, data, error] = useHttpClient(`/place/rate/${placeId}`, "Get", r => r.response);

    const [reviewsSearched, setReviewsSearched] = useState();

    const onSearchSubmit = (e) => {
        e.preventDefault();
        BrowserHttpClient.Get(`/review/search/${placeId}/${reviewSearchText}`)
            .then(result => {
                if (result && result.successFull) {
                    setReviewsSearched(result.response);
                    return;
                }
                setReviewsSearched(undefined);
            })
    }

    const { excellent, veryGood, normal, weak, horrible } = data || {};
    const total = excellent + veryGood + normal + weak + horrible;
    const [openNewReviewDialog, openDialog] = useState(false);

    const handleNewReview = () => {
        openDialog(true);
    }

    return (
        <>
            <div className={classes.row}>
                <Grid container className={classes.caption}>
                    <Typography component='h4'>
                        نظرات
                    </Typography>

                </Grid>


                <Grid container  >

                    {
                        rate != undefined && <Rate value={rate} />
                    }
                    &nbsp;
                    <Typography color='textSecondary' >
                        {noOfReviews} نظر
                    </Typography>
                </Grid>

                <Grid container className={classes.row}>
                    <Typography variant='subtitle2'>
                        <Box fontWeight='fontWeightBold'>
                            امتیاز مشتریان
                    </Box>
                    </Typography>
                </Grid>

                <Grid container className={classes.row}>

                    {
                        loading ? <CircularProgress /> :
                            <>
                                <ReviewBarChartItem total={total} title="عالی" count={excellent} />
                                <ReviewBarChartItem total={total} title="خیلی خوب" count={veryGood} />
                                <ReviewBarChartItem total={total} title="معمولی" count={normal} />
                                <ReviewBarChartItem total={total} title="ضعیف" count={weak} />
                                <ReviewBarChartItem total={total} title="وحشتناک" count={horrible} />
                            </>
                    }

                </Grid>

                <Divider />



                <Grid container className={classes.row}>
                    <form style={{ width: '100%' }} onSubmit={onSearchSubmit}>
                        <SearchInput onClick={onSearchSubmit} onChange={(event) => {
                            setSearchText(event.target.value)
                        }} />
                    </form>
                </Grid>
                <Grid className={classes.row}>
                    {
                        reviewsSearched ?
                            reviewsSearched.length === 0 ?
                                <Typography color='textSecondary' variant='caption'>چیزی پیدا نشد...</Typography> :
                                reviewsSearched.map((r, i) =>
                                    <div className={classes.row}>
                                        <ReviewItem {...r} key={i} />
                                        <Divider />
                                    </div>)
                            :
                            reviews && reviews.map((r, i) =>
                                <div className={classes.row}>
                                    <ReviewItem {...r} key={i} />
                                    {
                                        i === reviews?.length - 1 ? "" : <Divider />
                                    }

                                </div>
                            )
                    }
                </Grid>

                <Grid container className={classes.row} >
                    <Grid item xs={11} className={classes.alignCenter}>
                        <Link to={`allreviews/${placeId}`}>
                            <Grid container>
                                <Typography variant='caption'><Box margin='0 10px'>دیدن نظرات بیشتر</Box></Typography>
                            </Grid>
                        </Link>

                    </Grid>
                    <Grid item xs={1}>
                        <Link to={`allreviews/${placeId}`}>
                            <IconButton size='small' ><ArrowBackIosIcon style={{ fontSize: '12px', marginRight: 11 }} fontSize='small' /></IconButton>
                        </Link>
                    </Grid>
                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <ButtonBase onClick={handleNewReview}>
                                <CreateIcon color='primary' />
                                <Typography variant='caption' color='primary'><Box margin='0 10px'>نظرتان را بنویسید</Box></Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider />

                <Grid justify='space-between' direction='row' spacing={0}
                    container className={classes.title} >
                    <Typography >
                        مکان های نزدیک
                    </Typography>
                </Grid>
                <Link to={{ pathname: "/nearme" }}>
                    <div className={classes.mapSymbole}>

                    </div>
                </Link>
            </div>
            <ReviewNewDialog placeId={placeId} handleWindow={openDialog} placeName={restaurantDetail.name} open={openNewReviewDialog} />
        </>
    )
}