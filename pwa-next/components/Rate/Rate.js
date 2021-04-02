import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import RateIcon from './RateIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import { withStyles } from '@material-ui/core';
const StyledRating = withStyles(theme => ({
  iconFilled: {
    color: theme.palette.secondary.main,
  },
  iconHover: {
    color: theme.palette.secondary.dark,
  },

}))(Rating);

export default function Rate({ value, size, onchange, input, ...other }) {
  const [privateValue, setValue] = useState(value);


  return (
    <StyledRating

      value={privateValue}
      precision={input ? 1 : 0.1}
      size={size || 'medium'}
      disabled={!input}

      // classes={{
      //     iconFilled: "color: yellow;"
      // }}
      icon={<RateIcon fontSize="inherit" />}
      onChange={(event, newValue) => {
        console.log('newValue: ', newValue);
        if (input) {
          setValue(newValue);
          onchange(newValue);
        }
      }}

    // onChangeActive={(event, newHover) => {
    //     setHover(newHover);
    // }}
    />
  )
}