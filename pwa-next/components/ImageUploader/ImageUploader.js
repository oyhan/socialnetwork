import React from 'react';
import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { PhotoCamera } from '@material-ui/icons';

const pica = require('pica')();
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0',

    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    thumbBox: {
        margin: '0 27px',
        ' & img': {
            borderRadius: '50%'
        }
    },
    thumbnailContainer: {

        display: 'flex'
    }
}))

function resizeWithPica(image, newWidth) {
    var offScreenCanvas = document.createElement("canvas")
    offScreenCanvas.width = newWidth;
    offScreenCanvas.height = image.height * newWidth / image.width;

    return pica.resize(image, offScreenCanvas, {
        quality: 3,
        transferable: true
    }).then(() => {
        return offScreenCanvas.toDataURL();
    })

}

export default function ImageUploader({ name, index, filesLimit, nothumbnail, receiveFiles, defaultImage, ...props }) {
    

    const [thumbs, setThumbs] = React.useState([]);
    const classes = useStyle();
    const rand = Math.round(Math.random() * 10000);

    const createThumbnails = (event) => {
        var image = new Image();
        const files = [...event.target.files];
        var thum = [];

        image.src = window.URL.createObjectURL(event.target.files[0]);
        

        image.onload = function () {
            const f = event.target.files[0];
            resizeWithPica(image, 200).then((result) => {

                thum.push({
                    filename: f.name,
                    value: result.split(',')[1].toString(),
                    mimetype: f.type,
                    src: result
                });
                setThumbs(thum);
                receiveFiles && receiveFiles(f);
            })


        }
    }


    return (

        <div key={index} className={classes.root}>

            <input accept="image/*" key={index} onChange={createThumbnails} style={{ display: 'none' }} id={`input-file-${rand}`} type="file" />
            <div
                className={classes.wrapper}
            >
                {
                    !nothumbnail && thumbs.length > 0 ? thumbs.map((t, key) =>
                        <Tooltip
                            id="tooltip-top-start"
                            title={`${t.size} کیلوبایت`}
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                            key={key}
                        >
                            <div className={classes.thumbBox}>
                                <img src={t.src}
                                    width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                    height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                    className="thumbnail"
                                    alt={t.name} />
                            </div>
                        </Tooltip>) :

                        defaultImage ?
                    //     <Tooltip
                    //     id="tooltip-top-start"
                    //     placement="top"
                    //     classes={{ tooltip: classes.tooltip }}
                    // >
                    //     <div className={classes.thumbBox}>
                    //         <img src={defaultImage}
                    //             width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                    //             height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                    //             className="thumbnail"
                               
                    //              />
                    //     </div>
                    // </Tooltip>

                            <div className={classes.thumbBox} >
                                <Fab key={index}
                                    aria-label="save"
                                    color="primary"
                                    component='label'
                                    htmlFor={`input-file-${rand}`}

                                >
                                    <img src={defaultImage}

                                        width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                        height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                        className="thumbnail"
                                    />

                                </Fab>

                            </div> 
                            :
                            <Tooltip
                                id="tooltip-top-start"
                                title="اضافه کردن تصویر"
                                placement="top"
                            >
                                <Fab key={index}
                                    aria-label="save"
                                    color="primary"
                                    component='label'
                                    htmlFor={`input-file-${rand}`}

                                >
                                    <PhotoCamera />

                                </Fab>
                            </Tooltip>

                }


            </div>
            {/* <div className={classes.thumbnailContainer}> {
                !nothumbnail && thumbs.map((t, key) =>
                    <Tooltip
                        id="tooltip-top-start"
                        title={`${t.size} کیلوبایت`}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        key={key}
                    >
                        <div className={classes.thumbBox}>
                            <img src={t.src}
                                width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                className="thumbnail"
                                alt={t.name} />
                        </div>
                    </Tooltip>

                )


            }
            </div> */}

        </div>
    )
}


