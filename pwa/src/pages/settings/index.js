import { List, ListItem, ListItemText } from "@material-ui/core";
import AppBar from "../../components/AppBar/AppBar";
import { removeCredentials } from "../../helper/cookieHelper";
import UserManager from "../../lib/userManager";


export default function SettingsPage() {
    const handleExit = ()=>{
        UserManager.Save("");
        removeCredentials();
        window.location.href="/start";
    }
    return (
        <>
            <AppBar short title="تنظیمات" back />
            <List>
                <ListItem onClick={handleExit} style={{background :'#ece8e8'}} button>
                    <ListItemText  style={{textAlign:'center'}} primary="خروج" />
                </ListItem>
            </List>

        </>
    )
}