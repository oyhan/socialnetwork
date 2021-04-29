import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputRenderer from '../../lib/InputRenderer';
import { Container, Grid, InputAdornment } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
