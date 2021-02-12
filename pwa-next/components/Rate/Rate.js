import React from 'react';
import Rating from '@material-ui/lab/Rating';
import RateIcon from './RateIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import { withStyles } from '@material-ui/core';
const StyledRating = withStyles(theme=>({
    iconFilled: {
      color: theme.palette.secondary.main,
    },
    iconHover: {
      color:  theme.palette.secondary.dark,
    },

  }))(Rating);
  
export default function Rate({ value }) {
    return (
        <StyledRating
            name="hover-feedback"
            value={value}
            precision={0.5}
            disabled
           
            // classes={{
            //     iconFilled: "color: yellow;"
            // }}
            icon={<RateIcon fontSize="inherit" />}
        // onChange={(event, newValue) => {
        //     setValue(newValue);
        // }}
        // onChangeActive={(event, newHover) => {
        //     setHover(newHover);
        // }}
        />
    )
}