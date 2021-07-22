import { Divider, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    divider: {
        height: 9,
        background: '#e6e0e0',
        margin: '4px 0px',
        [theme.breakpoints.down("sm")]: {
            width: ' 100vw'
        },
        width: '100%'
    }
}))

export default function AppDivider() {
    const classes = useStyle();
    return <Divider className={classes.divider} />
}