import { Avatar, ButtonBase, useTheme } from "@material-ui/core";



export default function SquareImage({src}) {
    console.log('src: ', src);
    
    
    const theme = useTheme()
    return (
        <div>
            <ButtonBase >
                <Avatar variant='square' style={{ width: theme.spacing(7), height: theme.spacing(7) }} src={src || '/yazd.jpg'} />
            </ButtonBase>
        </div>

    )
}