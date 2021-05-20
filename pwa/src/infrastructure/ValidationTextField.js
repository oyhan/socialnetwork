import {
    withStyles,
  } from '@material-ui/core/styles';
  import TextField from '@material-ui/core/TextField';
  const ValidationTextField = withStyles({
      root: {
        '& input' :{
          textAlign : 'center'
        },
        '& input:valid + fieldset': {
          // borderColor: 'green',
          borderWidth: 2,
          borderRadius : 35
        },
        '& input:invalid + fieldset': {
          borderColor: 'red',
          borderWidth: 2,
          borderRadius : 35
        },
        '& input:valid:focus + fieldset': { 
          // borderLeftWidth: 6,
          borderRadius : 35,
          padding: '4px !important', // override inline-style
        },
      },
     
    })(TextField);
    export default ValidationTextField;