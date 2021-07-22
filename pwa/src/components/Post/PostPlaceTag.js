import { Grid, makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
const useStyle = makeStyles({
    root: {
        // width: 88,
        padding : '2px 6px',
        display: 'inline-flex',
        height: 28,
        color: 'rgba(86, 79, 79, 1)',
        border: '1px solid rgba(196, 196, 196, 1)',
        marginTop: -15,
        marginBottom: -4
    },
    closeBtn: {
        // marginTop: 2,
        marginRight: 2,
        marginLeft:7,
    }
})
export default function PostPlaceTag({ name  , onClose}) {
    const classes = useStyle();
    return (
        <div  className={classes.root}>
                <span className='s15'>
                    {name}
                </span>
            <div item onClick={onClose} className={classes.closeBtn}>
                <CloseIcon fontSize='small' />
            </div>
        </div>
    )
}