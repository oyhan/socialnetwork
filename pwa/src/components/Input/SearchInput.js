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
  },
  inputRoot: {
    color: 'inherit',
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
  second : {
    boxShadow: '2px 4px 5px 0px #bbb7b7',
    height: 51,
    background: 'white',
  }

}));

export default function SearchInput({ onSearchSubmit, second, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div onClick={onSearchSubmit} className={classes.searchIcon}>
        <SearchIcon color='disabled' />
      </div>
      <InputBase
        fullWidth
        {...props}
        placeholder="جستجوی نظرات"
        classes={{
          root: second? classes.second : classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )

}