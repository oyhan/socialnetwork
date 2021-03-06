import { useTheme, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Rating from '../Rating';
import RateIcon from './RateIcon';
import RateIconEmpty from './RateIconEmpty';
const StyledRating = withStyles(theme => ({
  // iconFilled: {
  //   color: theme.palette.secondary.main,
  // },
  // iconHover: {
  //   color: theme.palette.secondary.dark,
  // },
  // sizeSmall :{
  //   "& span" :{
  //     margin : -1
  //   }
  // }

  icon: {
    margin: 0
  }
}))(Rating);

export default function Rate({ value, size, fontSize, onchange, input, ...other }) {

  const [privateValue, setValue] = useState(value);
  const theme = useTheme();

  return (
    <StyledRating

      value={privateValue}
      precision={input ? 1 : 0.1}
      size={size || 'medium'}
      readOnly={!input}
      classes={{
        icon: "margin:5px"
      }}
      // classes={{
      //     iconFilled: "color: yellow;"
      // }}

      iconHovered={<RateIcon customSize={fontSize} fontSize={size || 'medium'} htmlColor={theme.palette.secondary.dark} />}
      iconFilled={<RateIcon customSize={fontSize} fontSize={size || 'medium'} color='primary' />}
      iconNormal={<RateIconEmpty customSize={fontSize} fontSize={size || 'medium'} color='primary' />}
      onChange={newValue => {

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