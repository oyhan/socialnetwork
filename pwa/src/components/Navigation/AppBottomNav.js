import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { useHistory} from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%', 
    bottom: 0,
    zIndex: 1000,
    height: 49,
  },
  label :{
    marginTop: '-3px',
    fontSize:10
  }
});

export default function AppBottomNav() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const router = useHistory();
  
  const onclick = (route) => () => {
    router.push(route);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {

        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction classes={{label:classes.label}} onClick={onclick("/")} label="خانه" icon={<HomeIcon  fontSize='small'/>} />
      <BottomNavigationAction classes={{label:classes.label}} onClick={onclick("/favorites")} label="علاقه‌مندی‌ها" icon={<FavoriteBorderIcon fontSize='small'  />} />
      <BottomNavigationAction classes={{label:classes.label}} onClick={onclick("/mybobo")} label="بوبوی من" icon={<PersonOutlineOutlinedIcon  fontSize='small'/>} />
    </BottomNavigation>
  );
}
