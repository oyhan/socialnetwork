import { withStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import RateIcon from './RateIcon';
const StyledRating = withStyles(theme => ({
  iconFilled: {
    color: theme.palette.secondary.main,
  },
  iconHover: {
    color: theme.palette.secondary.dark,
  },
  sizeSmall :{
    "& span" :{
      margin : -1
    }
  }
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