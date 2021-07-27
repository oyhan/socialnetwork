import { Box, CircularProgress, ButtonBase, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import AppBar from "../../components/AppBar/AppBar";
import ToolbarButton from "../../components/Button/ToolBarButton";
import { BrowserHttpClient, useHttpClient } from "../../lib/BrowserHttpClient";
import { useParams } from 'react-router-dom';
import RoomIcon from '@material-ui/icons/Room';
import Rate from "../../components/Rate/Rate";
import useLocation from "../../lib/hooks/location/useLocation";
import ReviewBarChartItem from '../../components/Place/Review/ReviewBarChartItem'
import clsx from 'clsx'
import CheckIcon from '@material-ui/icons/Check';
import ReviewItemFull from "../../components/Place/Review/ReviewItemFull";
import SearchInput from "../../components/Input/SearchInput";
import { useEffect, useState } from "react";
import ReviewNewDialog from "../../components/Place/Review/ReviewNewDialog";
import CreateIcon from '@material-ui/icons/Create';
import WriteNewReviewIcon from "../../components/Icons/WriteNewReviewIcon";

const useStyle = makeStyles(theme => ({
    reviewBtn: {
        marginLeft: '-34px',
    },
    row: {
        margin: '5px 0',
        width: '100%',
    },
    row2: {
        padding: '0 10px'

    },
    ratingBox: {
        padding: '0 10px',
        borderColor: 'rgba(196, 196, 196, 1)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderTop: `29px solid ${theme.palette.primary.main} !important`,
    },
    rateHeader: {
        marginTop: '-26px',
        color: 'white',

    },
    searchBox: {
        background: 'rgba(229, 225, 183, 0.6)',
        margin: '19px 0 -3px 0',
        padding: 14,
        "& p": {
            textIndent: 10
        }
    },
    roomIcon: {
        fontSize: '1.1rem'
    }
}))

export default function AllReviews() {
    const { placeId } = useParams();
    const userPosition = useLocation();
    const [loadingRate, data, error] = useHttpClient(`/place/rate/${placeId}`, "Get", r => r.response);

    const { excellent, veryGood, normal, weak, horrible } = data || {};
    const total = excellent + veryGood + normal + weak + horrible;

    const classes = useStyle();
    const [loading, placeDetail,] = useHttpClient(`/restaurant/${placeId}/${userPosition.latitude}/${userPosition.longitude}`, "Get", r => r.response);

    const { name, noOfReviews, cuisine, distanceToUser, website, telephone, rate, isOpenNow, services, favorite, reviews,
        address, location } = placeDetail || {};

    const [openNewReviewDialog, openDialog] = useState(false);


    const handleNewReview = () => {
        openDialog(true);
    }
    const icons = [
        <ToolbarButton onClick={handleNewReview} className={classes.reviewBtn}  >
            نظرت را بنویس
        </ToolbarButton>
    ]


    const [reviewsSearched, setReviewsSearched] = useState([]);
    const [reviewSearchText, setSearchText] = useState("%20");

    const onSearchSubmit = (e) => {
        e?.preventDefault();
        BrowserHttpClient.Get(`/review/search/${placeId}/${reviewSearchText}`)
            .then(result => {
                if (result && result.successFull) {
                    setReviewsSearched(result.response);
                    return;
                }
                setReviewsSearched([]);
            })
    }

    useEffect(() => {
        onSearchSubmit();
        return () => {

        }
    }, [])


    return (
        <>
            <AppBar paddingTop={23} height={77} title="نظرات" short back leftIcons={icons} />

            <Box m='20px 0' >
                <Grid container className={classes.row2} justify='space-between'>
                    <Grid item>
                        <Grid container direction='column' >
                            <Typography variant='h6' className="titr23700" >
                                <Box fontWeight='fontWeightBold'>
                                    {name}

                                </Box>
                            </Typography>
                            <Box m='5px 0'>
                                <Grid container>
                                    {
                                        rate != undefined && <Rate value={rate} />
                                    }
                              &nbsp;
                    <Typography color='textSecondary' >
                                        {noOfReviews} نظر
                    </Typography>
                                </Grid>
                            </Box>
                            <Typography variant='caption'>{cuisine}</Typography>

                        </Grid>
                    </Grid>

                    <Grid item style={{ alignSelf: 'center', marginTop: 49 }}>
                        <Grid container direction='column' alignItems='center'>
                            <Grid container >
                                <RoomIcon className={classes.roomIcon} />
                                <Box color='##645A5A'>
                                    <Typography className='s11' component='div' variant='caption'>
                                        {distanceToUser}
                                    </Typography>
                                </Box>

                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.row2}>
                    <Box color='#6B6565'>
                        <Typography className='s15' variant='body2' >
                            {cuisine}ایرانی،بین المللی،خاورمیانه
                </Typography>
                    </Box>
                </Grid>
            </Box>

            <Box padding='0 10px'  >
                <Grid container className={clsx(classes.row, classes.ratingBox)}>
                    <Grid container className={classes.rateHeader}>
                        <Typography className='s20'>
                            همه نظرات
                           </Typography>&nbsp;
                           <Typography className='s20'>
                            ({noOfReviews})
                           </Typography>
                    </Grid>

                    {
                        loadingRate ? <CircularProgress /> :
                            <Box padding='0 15px' width="100%">

                                <Box marginLeft='-23px' marginTop='20px' marginBottom='20px'>
                                    <Grid container  >
                                        <CheckIcon color='primary' fontSize='small' />&nbsp;
                                    <Typography color='primary'>
                                            همه نظرات
                                </Typography>

                                    </Grid>
                                </Box>

                                <ReviewBarChartItem size='large' total={total} title="عالی" count={excellent} />
                                <ReviewBarChartItem size='large' total={total} title="خیلی خوب" count={veryGood} />
                                <ReviewBarChartItem size='large' total={total} title="معمولی" count={normal} />
                                <ReviewBarChartItem size='large' total={total} title="ضعیف" count={weak} />
                                <ReviewBarChartItem size='large' total={total} title="وحشتناک" count={horrible} />
                            </Box>
                    }

                </Grid>
            </Box>

            <Box className={classes.searchBox}>
                <Grid container>
                    <Typography className='s19' >
                        نظر مشتریان:
                    </Typography>
                </Grid>
                <Grid container className={classes.row}>
                    <form style={{ width: '100%' }} onSubmit={onSearchSubmit}>
                        <SearchInput second onClick={onSearchSubmit} onChange={(event) => {
                            setSearchText(event.target.value === "" ? "%20" : event.target.value)

                        }} />
                    </form>
                </Grid>
            </Box>
            <Box>
                <div className={classes.row}>
                    {
                        reviewsSearched.length === 0 ?
                            <Typography color='textSecondary' variant='caption'>چیزی پیدا نشد...</Typography> :
                            reviewsSearched.map((r, i) =>
                                <div className={classes.row}>
                                    <ReviewItemFull {...r} key={i} />
                                    <Divider />
                                </div>)


                    }
                </div>
            </Box>

            <Container>
                <Box m='10px 0'>
                    <Grid container className={classes.row}>
                        <Grid item xs={10} className={classes.alignCenter}>
                            <Grid container>
                                <ButtonBase onClick={handleNewReview}>
                                    <WriteNewReviewIcon color='primary' />
                                    <Typography variant='caption' color='primary'><Box margin='0 10px'>نظرتان را بنویسید</Box></Typography>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Divider />

            <ReviewNewDialog placeId={placeId} handleWindow={openDialog} placeName={name} open={openNewReviewDialog} />

        </>
    )


}