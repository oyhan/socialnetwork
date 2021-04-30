import { Chip, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash/throttle';
import React, { useEffect, useState } from 'react';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { normalizenumber } from '../../lib/normalizations';
const useStyles = makeStyles(() => (
    {
        root: {
            display: 'flex'
        },
        green: {
            color: 'green'
        },
        yellow: {
            color: 'yellow'
        },
        white: {
            color: 'white'
        },
        white: {
            color: 'white',
        },

    }
))




export default function AutoCompleteInput({ onSelected, queryUrl, inputcomponent, resultSelector, defaultValue, ...other }) {



    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const classes = useStyles();



    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                setLoading(true);
                const input = normalizenumber(request);
                BrowserHttpClient.Get(String(queryUrl).replace("{query}", input)).then(result => {

                    result = resultSelector ? resultSelector(result) : result;
                    callback(result);
                    setLoading(false);
                }
                ).catch(error => {
                })
            }, 100),
        [],
    );

    useEffect(() => {
        let active = true;
        if (inputValue == '') return;
        fetch(inputValue, setOptions);

        return () => {
            active = false;
        }
    }, [inputValue])
    const onchange = (event, newValue) => {
        onSelected(newValue);
    }
    return (
        <>

            <Autocomplete
                defaultValue={defaultValue}
                autoComplete
                className={classes.root}
                onInputChange={(event, newInputValue) => {

                    setInputValue(newInputValue);
                }}
                getOptionLabel={(item) => item.province ? `${item.province},${item.city}` : item}
                renderInput={(params) => <inputcomponent.type {...inputcomponent.props} {...params} />}
                // renderInput={(params) => <TextField fullWidth {...params} label="پلاک خودرو کد خودرو یا کد راننده..." variant="outlined" fullWidth />}
                filterOptions={(x) => x}
                options={options}
                autoComplete

                loading={loading}
                includeInputInList
                filterSelectedOptions
                onChange={onchange}
                renderOption={(option) => {
                    return (
                        // <Grid container alignItems="center">
                        //     <Grid item xs>
                        <Chip
                            color='primary'
                            label={`${option.province},${option.city}`}
                        // classes={
                        //     {
                        //         icon: getVehicleColorStyle(option.color)
                        //     }
                        // }
                        />
                        // </Grid>
                        // </Grid>
                    );
                }}
                {...other}
            />
        </>

    )
}

