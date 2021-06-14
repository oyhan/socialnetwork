import { ListItem, ListItemText } from "@material-ui/core"
import CitySearchResultItem from "./CitySearchResultItem"


export default function CitySearchResult({ citys, onSelect }) {
    return (
        citys.map(r => {
            return (<CitySearchResultItem item={r} handClickRecentSearch={onSelect} />)
        }
        ))
}