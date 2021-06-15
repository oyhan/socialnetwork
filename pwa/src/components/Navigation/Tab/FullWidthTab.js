import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    position:'sticky',
    top:150,
    
    // width: 500,
  },
  sticky : {
    position :'sticky',
    // top : 150
  }
  //   tabRoot : {
  //       width : 
  //   }
}));

export default function FullWidthTabs({ tabs, tabsContent }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" color="default"> */}
      <Tabs
        //   classes= {{root:classes.tabRoot}}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
        aria-label="full width tabs example"
        classes={
          {
            root : classes.sticky
          }
        }
      >
        {
          tabs && tabs.map((tab, i) =>
            <Tab  label={tab} key={i} {...a11yProps(i)} />

          )
        }

      </Tabs>
      {/* </AppBar> */}
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        {
          tabsContent && tabsContent.map((content, i) =>
            <TabPanel value={value} key={i} index={i} dir={theme.direction}>
              {content}
            </TabPanel>
          )
        }
      {/* </SwipeableViews> */}
    </div>
  );
}
