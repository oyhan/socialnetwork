import { Grid } from '@material-ui/core';
import MAppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ToolbarBackButton from '../Button/ToolbarBackButton';
const useStyles =(headerPic)=> makeStyles((theme) => ({
  root: {
    marginBottom: 50
  },
  rightIcon: {
    // marginRight: theme.spacing(2),
  },
  toolbar: {

  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    textAlign: 'center'
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    // color: theme.palette.secondary.light,
    border: '4px solid',
    backgroundColor: theme.palette.secondary.main,
  },
  avatorBtn: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginBottom: '-43px',
    marginLeft: '43px',
  },
  avatarTxt: {
    marginBottom: '-59px',
    marginLeft: 119,
  },
  appbar: {
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      marginLeft: '-10px',
    },
    backgroundImage: `url(${headerPic})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  rootToolbar: {
    display: 'unset'
  }
}));

export default function AppBar({ rightIcon, title, leftIcons, middleCenterElement, extera, appBarColor, back, short ,headerPic }) {

  
  const classes = useStyles(headerPic)();
  const theme = useTheme();
  const toolBarStyle = {
    minHeight: short ? "unset" : 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),

  }
  
  const rootStyle = {
    marginBottom: short ? "unset" : 50,

  }
  return (
    <div style={rootStyle}>
      <MAppBar color={appBarColor ? appBarColor : 'primary'} elevation={0} className={classes.appbar} position="static">
        <Toolbar classes={{ root: classes.rootToolbar }} style={toolBarStyle}>
          <Grid container>
            <div className={classes.rightIcon}>
              {back ?
                <ToolbarBackButton /> :
                rightIcon
              }

            </div>
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
            {
              leftIcons && leftIcons.map(icon => icon)
            }
          </Grid>

          {
            middleCenterElement && <Grid justify='center' style={{ alignSelf: 'center' }} container>
              {middleCenterElement}
            </Grid>
          }


        </Toolbar>

        {extera}

      </MAppBar>

    </div>
  );
}



{/* <>
<IconButton aria-label="search" color="inherit">
  <SearchIcon />
</IconButton>
<IconButton aria-label="display more actions" edge="end" color="inherit">
  <MoreIcon />
</IconButton>
</> */}


{/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >

            {rightIcon}
          </IconButton> */}