import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    zIndex: 1000,
    height: 49,
  },
  label: {
    marginTop: '-3px',
    fontSize: 10
  }
});

export default function AppBottomNav() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const router = useHistory();
  const path = window.location.pathname;
  const onclick = (route) => () => {
    router.push(route);
  }
  const selectProfileIcon = () => {
    return path.startsWith("/mybobo") ? <PersonIcon fontSize='small' color="primary" /> : <PersonOutlineOutlinedIcon fontSize='small' />;
  }
  const selectFavoriteTabIcon = () => {
    return path.startsWith("/favorites") ? <FavoriteIcon fontSize='small' color="primary" /> : <FavoriteBorderIcon fontSize='small' />;

  }
  const selectHomeTabIcon = () => {
    return path === "/" ? <HomeIcon fontSize='small' color="primary" /> : <HomeOutlinedIcon fontSize='small' />;

  }

  useEffect(() => {
    setValue(path)

  }, [path])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        

        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction value="/" classes={{ label: classes.label }} onClick={onclick("/")} label="خانه" icon={selectHomeTabIcon()} />
      <BottomNavigationAction value="/favorites" classes={{ label: classes.label }} onClick={onclick("/favorites")} label="علاقه‌مندی‌ها" icon={selectFavoriteTabIcon()} />
      <BottomNavigationAction value="/mybobo" classes={{ label: classes.label }} onClick={onclick("/mybobo")} label="بوبوی من" icon={selectProfileIcon()} />
    </BottomNavigation>
  );
}
