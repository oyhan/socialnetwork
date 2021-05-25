import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx'
const useStyles = makeStyles((theme) => ({
    btn: {
      color : theme.palette.common.white,
    },
}))

export default function ToolbarButton({children,...props}){
    const classes = useStyles();
    return (
        <Button  {...props} className={clsx(classes.btn,props.className)} >
            {children}
        </Button>
    )

}