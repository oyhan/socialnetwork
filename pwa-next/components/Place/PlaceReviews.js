import { Box, ButtonBase, CircularProgress, Container, Divider, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BrowserHttpClient, useHttpClient } from "../../lib/BrowserHttpClient";
import SearchInput from "../Input/SearchInput";
import Rate from "../Rate/Rate";
import usePlacePageStyles from "./PlacePage.css";
import ReviewBarChartItem from "./Review/ReviewBarChartItem";
import ReviewItem from "./Review/ReviewItem";
import CreateIcon from '@material-ui/icons/Create';
import Link from "next/link";
import ReviewNewDialog from "./Review/ReviewNewDialog";

export default function PlaceReviews({ restaurantDetail, placeId }) {
    const classes = usePlacePageStyles();

    const { reviews, name, noOfReviews, cuisine, distanceToUser, website, telephone, rate, isOpenNow, services,
        address, location } = restaurantDetail;

    const [reviewSearchText, setSearchText] = useState("");
    const [loading, data, error] = useHttpClient(`http://localhost:12089/place/rate/${placeId}`, "Get", r => r.response);

    const [reviewsSearched, setReviewsSearched] = useState();

    const onSearchSubmit = (e) => {
        e.preventDefault();
        BrowserHttpClient.Get(`http://localhost:12089/review/search/${placeId}/${reviewSearchText}`)
            .then(result => {
                if (result.successFull) {
                    setReviewsSearched(result.response);
                }
            })
    }

    const { excellent, veryGood, normal, weak, horrible } = data || {};
    const total =excellent + veryGood+normal+ weak+ horrible;
    const [openNewReviewDialog, openDialog] = useState(false);

    const handleNewReview = () => {
        openDialog(true);
    }

    return (
        <>
            <Container className={classes.row}>
                <Grid container className={classes.caption}>
                    <Typography variant='h6'>
                        <Box fontWeight='fontWeightBold'>
                            نظرات
                        </Box>
                    </Typography>
                </Grid>


                <Grid container  >

                    <Rate value={rate} />
                    <Typography color='disabled' >
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
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <ButtonBase onClick={handleNewReview}>
                                <CreateIcon color='primary' />
                                <Typography variant='caption' color='primary'><Box margin='0 10px'>نظرتان را بنویسید</Box></Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.row}>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput onChange={(event) => {


                            setSearchText(event.target.value)
                        }} />
                    </form>
                </Grid>
                <Grid className={classes.row}>
                    {
                        reviewsSearched ?
                            reviewsSearched.map((r, i) =>
                                <div className={classes.row}>
                                    <ReviewItem {...r} key={i} />
                                </div>)
                            :
                            reviews && reviews.map((r, i) =>
                                <div className={classes.row}>
                                    <ReviewItem {...r} key={i} />
                                </div>
                            )
                    }
                </Grid>


            </Container>
            <ReviewNewDialog placeId={placeId} handleWindow={openDialog} place={restaurantDetail} open={openNewReviewDialog} />
        </>
    )
}