import { Chip, Container, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useState } from 'react';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import SearchDialog from '../Dialog/SearchDialog';
import NearMeIcon from '@material-ui/icons/NearMe';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import useLocation from '../../lib/hooks/location/useLocation';
import { useHistory } from 'react-router-dom';
import { getRecentSearchHistory, setRecentSearchHistory } from '../../helper/citySearchHelper';
import CitySearchResult from './CitySearchResult';
import RecentSearch from './RecentSearch';
const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "20px"
        }
    },
    icon: {
        transform: "scaleX(-1)",
        marginLeft:5
    }, 
    customTextField: {
        "& input::placeholder": {
            fontSize: 27,
            fontWeight: 400,
            color: 'rgba(159, 156, 156, 1)'
        }
    },
    closeWord:{

    }


})
export default function WhereToGo({ open, handleWindow, handleSelectCity }) {

    const [query, setQuery] = useState("");
    const position = useLocation();
    const history = useHistory();
    const [loadingcityHomeData, currentCity, errors] = useHttpClient(`/location/current/${position.latitude}/${position.longitude}`, "Get", r => r.response);
    const [loadingSearch, searchResult, errorsSearch] = useHttpClient(`/city/${query}`, "Get");

    const classes = useStyles();
    const handleClickNearby = () => {
        localStorage.setItem("homecity", JSON.stringify({ ...currentCity, name: "نزدیک" }));
        history.push("/seewhatsaround");
    }

    const handleChangeQuery = (event) => {
        setQuery(event.target.value);
    }
    const setHomeCity = (city) => {
        localStorage.setItem("homecity", JSON.stringify(city));
        handleWindow(false);
        history.push("/seewhatsaround");
    }
    const selectSearchResult = (city) => () => {

        setRecentSearchHistory(city);
        setHomeCity(city);
    }
    const handClickRecentSearch = (city) => () => {
        setHomeCity(city)
    }

    const seaching = () => {
        const isSearching = searchResult != undefined && searchResult.length > 0;
        return isSearching;
    }
    return (
        <SearchDialog handleWindow={handleWindow} open={open}>
            <Container>
                <InputRenderer
                    classes={{ root: classes.customTextField }}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon htmlColor='rgba(133, 125, 125, 1)' />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChangeQuery}
                    autoComplete="off" placeholder="کجا می‌روید؟" Type={PropType.Text}
                    Name="currentCity" fullWidth />

                <IconButton onClick={handleClickNearby} edge='start' >
                    <NearMeIcon fontSize="small" className={classes.icon} color="primary" />
                &nbsp;
                <Typography color='textPrimary'>
                        نزدیک
                </Typography>
                </IconButton>
                {
                    !seaching() ? <RecentSearch handClickRecentSearch={handClickRecentSearch} /> :
                        <List>
                            {
                                searchResult && <CitySearchResult onSelect={selectSearchResult} citys={searchResult} />
                            }
                        </List>
                }
            </Container>
        </SearchDialog>
    );
}
