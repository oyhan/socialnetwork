import {
    withStyles,
  } from '@material-ui/core/styles';
  import TextField from '@material-ui/core/TextField';
  
  const ValidationTextField = withStyles({
      root: {
        '& input:valid + fieldset': {
          borderColor: 'green',
          borderWidth: 2,
        },
        '& input:invalid + fieldset': {
          borderColor: 'red',
          borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
          borderLeftWidth: 6,
          padding: '4px !important', // override inline-style
        },
        '& ::placeholder': {
          // textOverflow: 'ellipsis !important',
          color: 'rgba(159, 156, 156, 0.51)',
          fontSize : 15,
          fontWeight:400
        }
        
      },
    })(TextField);
  
    export default ValidationTextField;
