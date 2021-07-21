import React, { useEffect, useState } from 'react';
import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { PhotoCamera } from '@material-ui/icons';
import useWebp, { ResizeFiles } from '../../lib/hooks/ImageCompress/useWebp';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
const pica = require('pica')();

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '4px 0',
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
    defaultImage: {

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
            borderRadius: '50%',
            border: 'white 2px solid',
            aspectRatio: 1
        }
    },
    thumbnailContainer: {
        display: 'flex'
    },
    fab: {
        background: '#fff'
    },
    inputDisplay: {
        width: 90,
        border: '5px #FFFAFA solid',
        height: 90,
        "&  svg" :{
            fontSize : '2.1rem'
        },
        boxShadow : 'unset',
        marginTop: '-26px',
        marginLeft: 4,
    }
}))
export function resizeWithPica(image, newWidth) {

    var offScreenCanvas = document.createElement("canvas")
    offScreenCanvas.width = newWidth;
    offScreenCanvas.height = image.height * newWidth / image.width;

    return pica.resize(image, offScreenCanvas, {
        quality: 3,
        transferable: true,
    }).then(() => {
        offScreenCanvas.toBlob((blob) => {


            return blob;
        }, "image/webp");

        // return dataUrl;
    })
}
export default function ImageUploader({ name, sizeLimit, noCompression, index, filesLimit, nothumbnail, receiveFiles, defaultImage, multiple, readonly, pickerComponent, ...props }) {

    const [thumbs, setThumbs] = React.useState([]);
    const [ready, setReady] = useState(false);


    const [images, setImages] = useState([]);


    const [processing, imageResized] = useWebp(images, .2)

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    const prepareThumbnails = async (imageResized) => {
        if (imageResized.length > 0) {
            receiveFiles && receiveFiles(imageResized)
            let thumbsArray = [];

            if (nothumbnail) return;

            for (const f of imageResized) {

                const resizedImage = await toBase64(f);
                thumbsArray = [...thumbsArray, {
                    filename: f.name,
                    value: resizedImage.split(',')[1].toString(),
                    mimetype: f.type,
                    src: resizedImage
                }];
            }

            setThumbs(thumbsArray);

        }
    }


    useEffect(() => {
        prepareThumbnails(imageResized)

    }, [imageResized])

    const classes = useStyle();

    const rand = Math.round(Math.random() * 10000);

    const shouldResize = (file) => {

        return sizeLimit && file[0].size / 1024 > sizeLimit

    }

    const createThumbnails = (event) => {

        const files = [...event.target.files];

        if (noCompression) {

            receiveFiles && receiveFiles(files)
            return;
        }

        if (shouldResize(files)) {
            setImages(files);
        } else {
            ResizeFiles(files, 1).then(resized => {
                prepareThumbnails(resized)
            })

        }



        // var selectedFiles = [];
        // const prepareFiles = () => {
        //     return new Promise((resolve, reject) => {
        //         let i = 0;
        //         for (const file of files) {

        //             let image = new Image();

        //             var thum = [];
        //             image.src = window.URL.createObjectURL(file);
        //             image.onload = function () {
        //                 const f = file;

        //                 resizeWithPica(image, 200).then((result) => {
        //                     thum.push({
        //                         filename: f.name,
        //                         value: result.split(',')[1].toString(),
        //                         mimetype: f.type,
        //                         src: result
        //                     });
        //                     setThumbs(thum);
        //                     fetch(result)
        //                         .then(res => res.blob())
        //                         .then(blob => {

        //                             selectedFiles = [...selectedFiles, blob];
        //                             i++;
        //                             if (i == files.length) {

        //                                 resolve(selectedFiles);
        //                             }
        //                         })
        //                 })
        //             }
        //         }
        //     }
        //     )
        // }

    }
    return (
        <div key={index} className={classes.root}>
            <input accept="image/*" key={index} multiple={multiple} onChange={createThumbnails} style={{ display: 'none' }} id={`input-file-${rand}`} type="file" />
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
                                <Fab key={index}
                                    aria-label="save"
                                    color="primary"
                                    component='label'
                                    disableRipple
                                    classes={{
                                        primary: classes.fab
                                    }}
                                    htmlFor={readonly ? "" : `input-file-${rand}`}
                                >
                                    <img src={t.src}
                                        alt={t.name}
                                        width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                        height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                        className="thumbnail"
                                    />
                                </Fab>


                            </div>
                        </Tooltip>) :
                        defaultImage ?

                            <div
                                className={classes.thumbBox} >
                                <Fab key={index}
                                    aria-label="save"
                                    color="primary"
                                    component='label'
                                    disableRipple
                                    classes={{
                                        primary: classes.fab
                                    }}
                                    htmlFor={readonly ? "" : `input-file-${rand}`}
                                >
                                    <img src={defaultImage}
                                        width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                        height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                        // className="thumbnail"
                                    />
                                </Fab>

                            </div>
                            :
                            <>
                                {
                                    pickerComponent ? <pickerComponent.type {...pickerComponent.props} htmlFor={readonly ? "" : `input-file-${rand}`} /> :
                                        <Fab key={index}
                                            aria-label="save"
                                            color="secondary"
                                            component='label'
                                            disableRipple
                                            classes={{ root: classes.inputDisplay }}
                                            htmlFor={readonly ? "" : `input-file-${rand}`}
                                        >
                                            <AddAPhotoIcon htmlColor='white' />
                                        </Fab>
                                }

                            </>
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
