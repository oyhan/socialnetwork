import { makeStyles } from '@material-ui/core';
import React from 'react';
import ZoomSlider from 'react-instagram-zoom-slider';
import ImageEditor from '../ImageEditor/ImageEditor';

const useStyle = makeStyles({
    image: {
        objectFit: 'contain',
            width: '100%',
            height: 335,
    },
    root: {
        direction: "rtl"
    }
})

export default function PostSlider({ medias }) {
    const classes = useStyle();
    const slides = medias.map(m =>
        <img layout='fill' src={`${m.url}`} draggable="false"  className={classes.image} />
   )

    return (
        <div className={classes.root}>
            <ZoomSlider

                slides={slides}
                maxScale={0.5}
                slideOverlay={
                    <button
                        type="button"
                        onClick={() => alert('Added to favourites!')}
                        style={{
                            position: 'absolute',
                            width: 40,
                            top: 10,
                            left: 10,
                            padding: 0,
                            appearance: 'none',
                            border: 'none',
                            background: 'none',
                        }}
                    >
                        {/* <img
                alt="Heart icon"
                src="data:image/svg+xml;base64,PHN2ZwpmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCnhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKdmlld0JveD0iMCAwIDUwIDUwIgo+CjxwYXRoIGQ9Ik0gMjUgNDQuMjk2ODc1IEwgMjQuMzYzMjgxIDQzLjc2OTUzMSBDIDIzLjM2MzI4MSA0Mi45NDE0MDYgMjIuMDE5NTMxIDQyLjAyNzM0NCAyMC40Njg3NSA0MC45Njg3NSBDIDE0LjMwODU5NCAzNi43NjU2MjUgNSAzMC40MTQwNjMgNSAyMC4yODUxNTYgQyA1IDE0LjA2MjUgMTAuMDk3NjU2IDkgMTYuMzYzMjgxIDkgQyAxOS43MTQ4NDQgOSAyMi44NTE1NjMgMTAuNDU3MDMxIDI1IDEyLjk1NzAzMSBDIDI3LjE0ODQzOCAxMC40NTcwMzEgMzAuMjg5MDYzIDkgMzMuNjM2NzE5IDkgQyAzOS45MDIzNDQgOSA0NSAxNC4wNjI1IDQ1IDIwLjI4NTE1NiBDIDQ1IDMwLjQxNDA2MyAzNS42OTE0MDYgMzYuNzY1NjI1IDI5LjUzMTI1IDQwLjk2ODc1IEMgMjcuOTc2NTYzIDQyLjAyNzM0NCAyNi42MzY3MTkgNDIuOTQxNDA2IDI1LjYzNjcxOSA0My43Njk1MzEgWiIgLz4KPC9zdmc+Cg=="
            /> */}
                    </button>
                }
                slideIndicatorTimeout={null}
                activeDotColor="#ff9800"
                dotColor="#4b4b4b"
            />
        </div>


    )
}