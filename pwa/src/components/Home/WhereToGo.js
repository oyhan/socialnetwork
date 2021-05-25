import { Chip, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
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
const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "20px"
        }
    },
    icon: {
        transform: "scaleX(-1)"
    },
    distance: {
        borderRadius: 0
    },
    search: {
        marginTop: 30
    }
})
export default function WhereToGo({ open, handleWindow, handleSelectCity }) {

    const [query, setQuery] = useState("");
    const position = useLocation();
    const history = useHistory();
    const [loadingcityHomeData, currentCity, errors] = useHttpClient(`/location/current/${position.latitude}/${position.longitude}`, "Get", r => r.response);
    const [loadingSearch, searchResult, errorsSearch] = useHttpClient(`/Location/Citys/${query}`, "Get");





    const classes = useStyles();
    const handleClickNearby = () => {
        localStorage.setItem("homecity", JSON.stringify({ ...currentCity, name: "نزدیک" }));
        history.push("/seewhatsaround");
    }

    const handleChangeQuery = (event) => {
        setQuery(event.target.value);
    }
    const setHomeCity = (city) => {
        localStorage.setItem("homecity", JSON.stringify({ id: city.id, name: `${city.city},${city.provice}` }));
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
    const recentSearch = () => <>
        <Typography color="textSecondary">
            جستجوهای اخیر
            </Typography>
        <Grid container className={classes.search} justify='space-between'>
            {getRecentSearchHistory().map(c =>

                <Grid style={{ margin: '15px 10px' }} onClick={handClickRecentSearch(c)} container >
                    <Typography>
                        {c.city},{c.province}
                    </Typography>
                </Grid>
            )}


            {/* <Grid item>
                <Chip label="5 کیلومتر" className={classes.distance} />
            </Grid> */}
        </Grid>
    </>
    const seaching = () => {
        const isSearching = searchResult != undefined && searchResult.length > 0;


        return isSearching;
    }
    return (
        <SearchDialog handleWindow={handleWindow} open={open}>
            <InputRenderer
                classes={{ root: classes.customTextField }}
                InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon color="disabled" />
                        </InputAdornment>
                    ),
                }}
                onChange={handleChangeQuery}
                autoComplete="off" placeholder="کجا می‌روید؟" Type={PropType.Text}
                Name="currentCity" fullWidth />

            <IconButton onClick={handleClickNearby} edge='end' >
                <NearMeIcon fontSize="small" className={classes.icon} color="primary" />
                &nbsp;
                <Typography>
                    نزدیک
                </Typography>
            </IconButton>
            {
                !seaching() ? recentSearch() :
                    <List>
                        {
                            searchResult && searchResult.map(r => {

                                return (<ListItem onClick={selectSearchResult(r)}>
                                    <ListItemText
                                        primary={r.city}
                                        secondary={r.province}
                                    />
                                </ListItem>)

                            }
                            )
                        }
                    </List>
            }

        </SearchDialog>
    );
}
