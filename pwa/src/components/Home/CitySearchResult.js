import { ListItem, ListItemText } from "@material-ui/core"


export default function CitySearchResult({ citys, onSelect }) {
    return (
        citys.map(r => {

            return (<ListItem button onClick={onSelect(r)}>
                <ListItemText
                    primary={r.city}
                    secondary={r.province}
                />
            </ListItem>)
        }
        ))
}