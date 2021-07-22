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
import "../../SearchBobo.css"
const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: 27,
            fontWeight : 400,
            color: 'rgba(159, 156, 156, 1)'
        }
    } ,
    customTextField2: {
        "& input::placeholder": {
            fontSize: 19,
            fontWeight : 400,
            color: 'rgba(159, 156, 156, 1)'
        }
    } ,
    arrowUpward: {
        transform: 'rotate(45deg)',
        fontSize: 53,
        margin: '30px 0'

    },
    arrowText:{
        fontSize:19,
        fontWeight:400,
        color:'rgba(52, 48, 48, 0.84)'
    },
    container:{
        height : '100vh'
    },
    closeBtn:{
        "& svg" :{
            fontSize : '2.0rem'
        },
        marginLeft: 'auto',
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
        <div className='customInput'>
            <Toolbar className={classes.toolBar}>
                <IconButton  color="primary" edge='end' className={classes.closeBtn} onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Container className={classes.container}>
                <InputRenderer
                    autoFocus
                    classes={{ root: classes.customTextField }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search htmlColor='rgba(133, 125, 125, 1)'  />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    autocomplete="off" placeholder="جستجوی بوبو" Type={PropType.Text}
                    Name="" fullWidth />

                <InputRenderer
                    classes={{ root: classes.customTextField2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon htmlColor='rgba(133, 125, 125, 1)'  />
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
                        <Typography className={classes.arrowText} >
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

        </div>
    )
}