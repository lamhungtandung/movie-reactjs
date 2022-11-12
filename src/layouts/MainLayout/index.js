import React from "react";

import ScrollToTop from "react-scroll-up";
import { makeStyles } from "@material-ui/core";

import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  top: {
    marginTop: 64,
    [theme.breakpoints.down("xs")]: {
      marginTop: 56,
    },
  },
  styleScrollToTop: {
    position: "fixed",
    bottom: 30,
    right: 10,
    transitionTimingFunction: "linear",
    width: 50,
    transform: "rotate(180deg)",
    zIndex: 5000,
  },
}));
export default function MainLayout(props) {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.top}></div>
      {props.children}
      <Footer />
      <ScrollToTop showUnder={160}>
        <img
          src="https://www.saokim.com.vn/blog/wp-content/uploads/2021/07/Ma%CC%82%CC%83u-thie%CC%82%CC%81t-ke%CC%82%CC%81-Logo-One-Stop-Films.jpeg"
          alt="totop"
          className={classes.styleScrollToTop}
        />
      </ScrollToTop>
    </div>
  );
}
