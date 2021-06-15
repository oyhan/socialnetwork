import { Avatar, ButtonBase, useTheme } from "@material-ui/core";



export default function SquareImage({src}) {
    
    
    
    const theme = useTheme()
    return (
        <div>
            <ButtonBase >
                <Avatar variant='square' style={{ width: theme.spacing(13), height: theme.spacing(13) }} src={src || '/yazd.jpg'} />
            </ButtonBase>
        </div>

    )
}