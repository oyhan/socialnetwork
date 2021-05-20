import { Grid, makeStyles } from '@material-ui/core';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
// const createGesture = dynamic(

//     () => import('@ionic/react'), // replace '@components/map' with your component's location
//     { ssr: false } // This line is important. It's what prevents server-side render
// )
const useStyle = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
    },
    handle: {
        width: 50,
        height: 7,
        background: 'gray',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    sheet: {
        display: "inline-block",
        backgroundColor: 'yellow',
        // marginLeft: 20,
        width: '100%',
        height: '100vh',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    handleContainer: {
        display: 'flex'
    }

}))

export default function BottomSheet(props) {

    const [isOpen, setOpen] = React.useState(true);
    const controls = useAnimation();
    const classes = useStyle();
    const [bottom, setBottom] = useState(0);
    useEffect(() => {
        setBottom(window.innerHeight - 40);

    }, [])

    return (
        <div className={classes.root}>
            <motion.div
                drag="y"
                initial="visible"
                animate={controls}
                transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 400
                }}
                variants={
                    {
                        visible: { y: 500 },
                        // hidden: { y: "100%" }
                    }
                }
                dragConstraints={{ top: 30, bottom: bottom }}
                dragElastic={0.2}
                className={classes.sheet}
            >
                <Grid container justify='center'>
                    <div className={classes.handle}></div>
                </Grid>
                <Grid container>
                    {prop.children}
                </Grid>

            </motion.div>
        </div >
    );

}


//   const constraintsRef = useRef(null);
//   const classes = useStyle();
//   return (
//       <div className="example-container">
//           <motion.div className={classes.dragArea}  ref={constraintsRef} />
//           <motion.div drag="y" className={classes.sheet} dragConstraints={constraintsRef} >
//               <div>asdasd</div>
//           </motion.div>
//       </div>
//   );