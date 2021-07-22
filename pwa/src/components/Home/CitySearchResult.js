import { ListItem, ListItemText } from "@material-ui/core"
import CitySearchResultItem from "./CitySearchResultItem"


export default function CitySearchResult({ citys, onSelect ,variant }) {
    return (
        citys.map(r => {
            return (<CitySearchResultItem variant  item={r} handClickRecentSearch={onSelect} />)
        }
        ))
}