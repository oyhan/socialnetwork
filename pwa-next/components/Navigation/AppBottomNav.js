import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%', 
    bottom: 0,
    zIndex: 1000,
  },
});

export default function AppBottomNav() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const router = useRouter();
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
      <BottomNavigationAction  onClick={onclick("/")} label="خانه" icon={<HomeIcon />} />
      <BottomNavigationAction onClick={onclick("/favorites")} label="علاقه‌مندی‌ها" icon={<FavoriteBorderIcon />} />
      <BottomNavigationAction onClick={onclick("/mybobo")} label="بوبوی من" icon={<PersonOutlineOutlinedIcon />} />
    </BottomNavigation>
  );
}
