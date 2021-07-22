import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useTheme } from "@material-ui/core";

export default function ScrollResizeHeader(props) {
  const { scrollYProgress } = useViewportScroll();
  const theme = useTheme();

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.02, 0.1],
    ["0%", "0%", "-57%"]
  );
  
  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        width:'100%',
        // backgroundImage: headerY.current === "-57%" ? "" : `url(/home/header/bg.jpg)`,
        backgroundImage:`url(/home/header/bg.jpg)`,
        height: 190,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        display: 'grid',
        flexDirection: 'column',
        paddingBottom: theme.spacing(2),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        y: headerY.current
      }}
    >
        {props.children}
    </motion.header>
  );
}

