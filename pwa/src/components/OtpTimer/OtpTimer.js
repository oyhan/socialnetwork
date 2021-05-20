import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function CircularProgressWithLabel(props) {
  const value = (props.initial - props.value) * 100 / props.initial;


  return (
    <Box position="relative" color='white' display="inline-flex">
      <CircularProgress size={60} variant="determinate" value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" color='secondary' component="div" >{`${Math.round(
          props.value,
        )} ثانیه`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function OtpTimer({ callback, initial, updater }) {

  const [progress, setProgress] = React.useState(initial);
  
  var timepassed = 0

  React.useEffect(() => {

    var timer = setInterval(() => {

      setProgress((prevProgress) => (prevProgress - 1));
      timepassed++;
     updater && updater(timepassed);

      if (timepassed == initial)
        clearInterval(timer);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [initial]);

  React.useEffect(() => {
    setProgress(initial)
  }, [initial])

  return <div style={{
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center'
  }}>

    {
      progress < 1 && <Button disabled={progress > 1} onClick={callback} variant='contained'>
        ارسال مجدد
       </Button>
    }
    {
      progress >0 && <CircularProgressWithLabel value={progress} initial={initial} />
    }

  </div >
}
