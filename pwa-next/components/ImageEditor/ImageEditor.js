import React from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css'



// /* width: 100%; */
// /* height: 350px; */
// aspect-ratio: 3/4;
// background: url(http://localhost:12089/wwwroot/user/rahiqi/pictures/a076f6fb-2680-4b69-b1fe-a9c4c3aff169_f36e9cc….jpg);
// background-size: cover;
// background-position: center;
// background-repeat: no-repeat;

export default function ImageEditor({ image, aspectRatio,children }) {



    return (
        <div>
            <AspectRatio ratio="4/3" style={{ maxWidth: '400px' }}>
               {children}
            </AspectRatio>
        </div>
    )


}


