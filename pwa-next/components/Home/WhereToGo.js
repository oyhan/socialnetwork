import { InputAdornment } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import SearchDialog from '../Dialog/SearchDialog';


export default function WhereToGo({ open, handleWindow }) {

    const dialogContent = <InputRenderer
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <LocationOnIcon color="disabled" />
                </InputAdornment>
            ),
        }}
        autocomplete="off" placeholder="کجا می‌روید؟" Type={PropType.Text}
        Name="currentCity" fullWidth />;

    return (
        <SearchDialog content={dialogContent} handleWindow={handleWindow} open={open}/>
    );
}
