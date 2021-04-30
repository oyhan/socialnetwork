import React from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';

export default function ImageEditor({ image, aspectRatio,children }) {
    return (
        <div>
            <AspectRatio ratio="4/3" style={{ maxWidth: '400px' }}>
               {children}
            </AspectRatio>
        </div>
    )
}
