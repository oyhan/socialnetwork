import { Divider, Grid, makeStyles, Typography } from "@material-ui/core"
import SearchInput from "../../Input/SearchInput";
import ToolbarButton from "../../Button/ToolBarButton";
import { BrowserHttpClient } from "../../../lib/BrowserHttpClient";

const useStyle = makeStyles((theme) => ({
    header: {
        backgroundColor: "#802143",
        width: "100%",
        height: "60px"
    },
    body: {
        height: "100%",
        width: "100%",
        marginTop: '-17px',
        backgroundColor: 'white',
        borderTopRightRadius: "15px",
        borderTopLeftRadius: "15px"
    },
    searchInput: {
        backgroundColor: "#EAEAD8 !important",
        borderRadius: "11px",
        marginTop: "13px"
    },
    searchIcon: {
        padding: "0px !important",
        marginLeft: "6px",
    },
    svg: {
        width: "1.25em !important",
        height: "1.25em !important",
    },
    input: {
        marginLeft: "-10px"
    },
    cansel: {
        textAlign: "center",
        alignSelf: "center",
        marginTop: "10px"
    },
    canselText: {
        fontSize: "19px",
        color: "#802143"
    }
}));
export default function SearchCity({ handleSelectedCity }) {
    const [city, setCity] = useState([]);
    const onChnage = (event) => {
        BrowserHttpClient.Get("/Location/Citys/" + event.target.value)
            .then(result => {
                setCity(result);
            })
            .catch(error => {

            })
    }
    const classes = useStyle();
    return (
        <div style={{ height: "85vh" }}>
            <div className={classes.header}></div>
            <div className={classes.body}>
                <Grid container>
                    <Grid item xs={9} sm={9} style={{ paddingRight: "20px" }}>
                        <SearchInput
                            placeholder="زادگاه/شهر کنونی"
                            containerClassName={classes.searchInput}
                            searchIconClassName={classes.searchIcon}
                            svgClassName={classes.svg}
                            inputClassName={classes.input}
                            onChnage={onChnage}
                        ></SearchInput>
                    </Grid>
                    <Grid item xs={3} sm={3} className={classes.cansel}>
                        <ToolbarButton>
                            <Typography className={classes.canselText}>انصراف</Typography>
                        </ToolbarButton>
                    </Grid>
                </Grid>
                <Divider style={{ margin: "5px 11px 5px 11px", paddingTop: "2px" }} />
            </div>
        </div>
    )
}