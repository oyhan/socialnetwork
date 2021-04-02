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

    const [loading, data, error] = useHttpClient(`http://localhost:12089/place/rate/${placeId}`, "Get", r => r.response);

    const { excellent, veryGood, normal, weak, horrible } = data || {};

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
                                <ReviewBarChartItem total={noOfReviews} title="عالی" count={excellent} />
                                <ReviewBarChartItem total={noOfReviews} title="خیلی خوب" count={veryGood} />
                                <ReviewBarChartItem total={noOfReviews} title="معمولی" count={normal} />
                                <ReviewBarChartItem total={noOfReviews} title="ضعیف" count={weak} />
                                <ReviewBarChartItem total={noOfReviews} title="وحشتناک" count={horrible} />
                            </>
                    }

                </Grid>
                <Grid container>
                    <SearchInput />
                </Grid>
                <Grid className={classes.row}>
                    {
                        reviews && reviews.map((r, i) =>
                            <div className={classes.row}>
                                <ReviewItem {...r} key={i} />
                            </div>
                        )
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
            </Container>
            <ReviewNewDialog placeId={placeId} handleWindow={openDialog} place={restaurantDetail}  open={openNewReviewDialog} />
        </>
    )
}