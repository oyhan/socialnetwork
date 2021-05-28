import { CircularProgress, Container, Grid, IconButton, InputAdornment, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputRenderer from "../../lib/InputRenderer";
import { PropType } from "../../lib/proptypes";
import RecentSearch from "../Home/RecentSearch";
import RestaurantSearchItem from "../Search/RestaurantSearchItem";
import UserSearchItem from "../Search/UserSearchItem";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CitySearchResult from "../Home/CitySearchResult";
import { useEffect, useState } from "react";
import { setRecentSearchHistory } from "../../helper/citySearchHelper";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ReviewNewDialog from "./Review/ReviewNewDialog";
const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "20px"
        }
    },
    arrowUpward: {
        transform: 'rotate(45deg)',
        fontSize: 53,
        margin: '30px 0'

    }
})
export default function SearchForPlace() {
    const history = useHistory();
    const classes = useStyles();
    const [term, setTerm] = useState("");
    const [cityQuery, setCityQuery] = useState("");
    const [loadingSearch, cityResult, errorsSearch] = useHttpClient(`/city/${cityQuery}`, "Get");
    const [searchingCity, setSearchingCity] = useState(false);
    const [searchInCity, setSearchInCity] = useState();
    const [loading, data, error] = useHttpClient(`/place/search/${term}/${searchInCity}`, "Get", r => r.response)
    const [destination, setDestination] = useState();
    const [review, setReview] = useState({ open: false });
    const handleChangeDest = (event) => {
        setCityQuery(event.target.value);
        setDestination(event.target.value);
        setSearchingCity(true);
    }

    const selectDestination = (city) => () => {
        setRecentSearchHistory(city);
        setSearchingCity(false);
        setDestination(city.name);
        setSearchInCity(city.id);
    }
    const isUser = (item) => {
        return Object.keys(item).includes("isFollowing")
    }

    const handleRemoveSearchIn = () => {
        setSearchInCity(undefined);
        setSearchingCity(false);
        setDestination("");
    }

    const handleChange = (event) => {
        setSearchingCity(false);
        setTerm(event.target.value);
    }
    useEffect(() => {
        console.log('searchInCity: ', searchInCity);

        setDestination(destination)


    }, [searchInCity])

    const handleClose = () => {
        history.goBack();
    }
    const closeReviewPage = ()=>{
        history.goBack();
    }
    const handleNewReview = (place) => () => {
        setReview({ open: true, placeName: place.name, placeId: place.id })
    }

    return (
        <>
            <Toolbar className={classes.toolBar}>
                <IconButton edge="start" color="primary" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Container>
                <InputRenderer
                    classes={{ root: classes.customTextField }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="disabled" />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    autocomplete="off" placeholder="جستجوی بوبو" Type={PropType.Text}
                    Name="" fullWidth />

                <InputRenderer
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon color="disabled" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={handleRemoveSearchIn}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    value={destination}
                    onChange={handleChangeDest}
                    autocomplete="off" placeholder="مقصد را وارد کنید" Type={PropType.Text}
                    Name="" fullWidth />

                <Grid container justify='center' alignItems='center' direction='column' >
                    <Grid item >
                        <CallMadeIcon color='primary' className={classes.arrowUpward} />
                    </Grid>
                    <Grid item >
                        <Typography color='textSecondary'>
                            مکان مورد نظر را برای نوشتن نظر را جستجو کنید
                        </Typography>
                    </Grid>
                </Grid>
                {

                    loading || loadingSearch ? <CircularProgress /> :
                        searchingCity ? cityResult && <CitySearchResult onSelect={selectDestination} citys={cityResult} /> : data && data.length > 0 &&
                            data.map((r, i) => {
                                return <RestaurantSearchItem place={r} handleClick={handleNewReview} key={i} />
                            })
                }
                <ReviewNewDialog open={review.open} handleWindow={closeReviewPage} placeName={review.placeName} placeId={review.placeId} />
            </Container>

        </>
    )
}