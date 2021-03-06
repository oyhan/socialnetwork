import { fade, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.common.gray,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'fade(theme.palette.common.white, 0.15)',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    //   marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transform: 'rotateY(180deg)',
    "& svg": {
      fontSize: '1.7rem',
    }
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor: '#EFEFE3',
    border: '1px solid #8A7F7F'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },

  },
  second: {
    boxShadow: '2px 4px 5px 0px #bbb7b7',
    height: 51,
    background: 'white',
    "& input::placeholder": {
      color: 'rgba(159, 156, 156, 0.68)',
      fontSize: 17
    }
  }

}));

export default function SearchInput({ onSearchSubmit, second, placeholder, containerClassName, 
  searchIconClassName, svgClassName, inputClassName, inputRootClassName, onChnage, ...props }) {
  const classes = useStyles();
  const getplaceHolder = () => {
    if (placeholder)
      return placeholder;
    else
      return "جستجوی نظرات";
  }

  return (
    <div className={classes.search + " " + containerClassName}>
      <div onClick={onSearchSubmit} className={classes.searchIcon + " " + searchIconClassName}>
        {
          second ? <SearchIcon style={{ color: 'rgba(138, 127, 127, 1)' }} fontSize='large' />
            :
            <SearchIcon color='primary' className={svgClassName} />
        }

      </div>
      <InputBase
        fullWidth
        {...props}
        placeholder={getplaceHolder()}
        classes={{
          root: second ? classes.second : classes.inputRoot + " " + inputRootClassName,
          input: classes.inputInput + " " + inputClassName,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChnage}
      />
    </div>
  )

}