import { CircularProgress, Container, IconButton, InputAdornment, makeStyles } from "@material-ui/core";
import { Cancel, Search } from "@material-ui/icons";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useEffect, useState } from 'react';
import { setRecentSearchHistory } from "../../helper/citySearchHelper";
import { PropType } from "../../infrastructure/proptypes";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import InputRenderer from "../../lib/InputRenderer";
import SearchDialog from "../Dialog/SearchDialog";
import RestaurantSearchItem from "../Search/RestaurantSearchItem";
import UserSearchItem from "../Search/UserSearchItem";
import CitySearchResult from "./CitySearchResult";
import RecentSearch from "./RecentSearch";
import useSearchBobo from "./SearchBoboHook";
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: 27,
            fontWeight: 400,
            color: 'rgba(159, 156, 156, 1)'
        }
    },
    customTextField2: {
        "& input::placeholder": {
            fontSize: 19,
            fontWeight: 400,
            color: 'rgba(159, 156, 156, 1)'
        }
    },
})
export default function SearchBobo(props) {
    const classes = useStyles();
    const [term, setTerm] = useState("");
    const [cityQuery, setCityQuery] = useState("");
    const [loadingSearch, cityResult, errorsSearch] = useHttpClient(`/city/${cityQuery}`, "Get");
    const [searchingCity, setSearchingCity] = useState(false);
    const [searchInCity, setSearchInCity] = useState();
    const [loading, data, error] = useSearchBobo(term, searchInCity);
    const [destination, setDestination] = useState();

    const handleChange = (event) => {
        setSearchingCity(false);
        setTerm(event.target.value);
    }
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

    useEffect(() => {


        setDestination(destination)


    }, [searchInCity])

    return (
        <>
            <SearchDialog {...props} >
                <Container>


                    <InputRenderer
                        autoFocus
                        classes={{ root: classes.customTextField }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search htmlColor='rgba(133, 125, 125, 1)' />
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
                                    <LocationOnIcon htmlColor='rgba(133, 125, 125, 1)' />
                                </InputAdornment>
                            ),
                            // endAdornment: (
                            //     <InputAdornment position="end">
                            //         <IconButton
                            //             aria-label="Toggle password visibility"
                            //             onClick={handleRemoveSearchIn}
                            //         >
                            //             <CloseIcon />
                            //         </IconButton>
                            //     </InputAdornment>
                            // ),
                        }}
                        value={destination}
                        onChange={handleChangeDest}
                        autocomplete="off" placeholder="مقصد را وارد کنید" Type={PropType.Text}
                        Name="" fullWidth />
                    {

                        loading || loadingSearch ? <CircularProgress /> :
                            searchingCity ? cityResult && <CitySearchResult onSelect={selectDestination} citys={cityResult} /> : data && data.length > 0 ?
                                data.map((r, i) => {
                                    if (isUser(r)) {
                                        return <UserSearchItem {...r} key={i} />
                                    }
                                    return <RestaurantSearchItem place={r} key={i} />
                                }) :
                                <RecentSearch handClickRecentSearch={selectDestination} />
                    }


                </Container>
            </SearchDialog>



        </>
    )
}

