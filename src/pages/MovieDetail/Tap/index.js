import React, { useEffect, useState } from "react";
//import thu vien
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Rating from "@material-ui/lab/Rating";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useLocation, useHistory } from "react-router-dom";
import { scroller } from "react-scroll";
import CircularProgress from "@material-ui/core/CircularProgress";

import { FAKE_AVATAR, UNKNOW_USER } from "../../../constants/config";
import useStyles from "./style";
import scroll from "../../../util/scroll";
import LichChieuDesktop from "./LichChieuDesktop";
import LichChieuMobile from "./LichChieuMobile";
import {
  getComment,
  postComment,
  likeComment,
} from "../../../reducers/actions/MovieDetail";
import { selectCommentByMaPhimAndCommentTest } from "../../../reducers/selector/MovieDetail";
import formatDate from "../../../util/formatDate";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function TabPanel(props) {
  const { isMobile, children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      <Box p={isMobile && index === 0 ? 0 : 3}>{children}</Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CenteredTabs({
  data,
  onClickBtnMuave,
  isMobile,
  onIncreaseQuantityComment,
}) {
  const param = useParams(); // m?? phim l???y t??? url tr??n tr??nh duy???t
  const { currentUser } = useSelector((state) => state.authReducer);
  const {
    loadingPostComment,
    postCommentObj,
    loadingLikeComment,
    likeCommentObj,
  } = useSelector((state) => state.movieDetailReducer);
  const { commentList } = useSelector((state) =>
    selectCommentByMaPhimAndCommentTest(state, param.maPhim)
  );
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();
  const [valueTab, setValueTab] = useState(0);
  const [croll, setCroll] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [warningtext, setwarningtext] = useState(false);
  const [commentListDisplay, setCommentListDisplay] = useState({
    comment: [],
    page: 5,
    hideBtn: false,
    idScrollTo: "",
  });
  const [dataComment, setdataComment] = useState({
    avtId: currentUser?.taiKhoan,
    username: currentUser?.hoTen,
    point: 2.5,
    post: "",
    likes: 0,
    maPhim: param.maPhim,
    dataTest: false,
    createdAt: "",
    userLikeThisComment: [],
  });
  const classes = useStyles({ hideBtn: commentListDisplay.hideBtn, isMobile });

  // ph???c v??? kh nh???p btn mua v??
  useEffect(() => {
    window.scrollTo(0, 0); // ng??n window.history.scrollRestoration = 'auto';
    setValueTab(() => 0);
    setCroll(() => onClickBtnMuave);
  }, [onClickBtnMuave]); // khi click muave th?? m???i m??? tap 0 > ?????i gi?? tr??? croll ????? scroll t???i TapMovieDetail

  useEffect(() => {
    if (onClickBtnMuave !== 0) {
      // kh??ng scroll khi m???i load
      scroll("TapMovieDetail");
    }
  }, [croll]); // khi nh???n mua ve ???? ho??n th??nh => tap 0 th?? scroll

  useEffect(() => {
    // update so nguoi cmt
    if (commentList?.length && !isMobile) {
      onIncreaseQuantityComment(commentList?.length);
    }
  }, [commentList]);

  useEffect(() => {
    // call api ????? lay data cmt m???i
    dispatch(getComment());
    if (postCommentObj) {
      // reset text comment
      setdataComment((data) => ({ ...data, post: "" }));
    }
  }, [postCommentObj, likeCommentObj]);

  useEffect(() => {
    const comment = commentList.slice(0, commentListDisplay.page);
    setCommentListDisplay((data) => ({ ...data, comment }));
  }, [commentList]);

  useEffect(() => {
    if (commentListDisplay.idScrollTo) {
      scroller.scrollTo(commentListDisplay.idScrollTo, {
        duration: 800,
        offset: -79,
        smooth: "easeInOutQuart",
      });
    }
  }, [commentListDisplay.idScrollTo]);

  const handlePostComment = () => {
    if (loadingPostComment) {
      return;
    }
    if (dataComment.post.length < 61) {
      // check comment
      setwarningtext(true);
      return;
    }
    setwarningtext(false);
    const currentISOString = new Date().toISOString();
    setOpenComment(false);
    dispatch(
      postComment({
        ...dataComment,
        createdAt: currentISOString,
        point: dataComment.point * 2,
      })
    );
  };

  const setopenMore = () => {
    let hideBtn = false;
    let addComment = commentList.length % 5;
    if (commentList.length % 5 === 0) {
      addComment = 5;
    }
    if (commentListDisplay.page + addComment === commentList.length) {
      hideBtn = true;
    }
    const idScrollTo = `idComment${
      commentList[commentListDisplay.page].createdAt
    }`;
    const page = commentListDisplay.page + 5;
    const comment = commentList.slice(0, page);
    setCommentListDisplay((data) => ({
      ...data,
      comment,
      page,
      hideBtn,
      idScrollTo,
    }));
  };

  const handleLike = (id) => {
    if (loadingLikeComment) {
      return;
    }
    if (!currentUser) {
      isLogin();
      return;
    }
    // t??ng gi???m s??? l?????ng like
    const commentUserLiked = commentList.find((item) => item.id === id);
    if (commentUserLiked.userLikeThisComment.includes(currentUser.email)) {
      // x??a user kh???i ds liked comment => tr??? s??? like
      commentUserLiked.userLikeThisComment =
        commentUserLiked.userLikeThisComment.filter((item) => {
          return item !== currentUser.email;
        });
      commentUserLiked.likes = commentUserLiked.likes - 1;
    } else {
      commentUserLiked.userLikeThisComment.push(currentUser.email);
      commentUserLiked.likes = commentUserLiked.likes + 1;
    }
    dispatch(likeComment(id, commentUserLiked));
  };

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  const handletyping = (event) => {
    if (event.target.value.length >= 61) {
      // check cmt
      setwarningtext(false);
    }
    setdataComment((data) => ({ ...data, post: event.target.value }));
  };
  const handleClose = () => {
    setOpenComment(false);
  };
  const isLogin = () => {
    if (!currentUser) {
      // check login
      Swal.fire({
        title: "B???n c???n ph???i ????ng nh???p",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "????ng nh???p",
        cancelButtonText: "Kh??ng",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/dangnhap", location.pathname);
        }
      });
    }
  };
  const handleClickComment = () => {
    if (!currentUser) {
      isLogin();
      return;
    }
    setOpenComment(true);
    setwarningtext(false);
  };

  return (
    <div className={classes.root} id="TapMovieDetail">
      <AppBar
        position="static"
        color="default"
        classes={{ root: classes.appBarRoot }}
      >
        <Tabs
          value={valueTab}
          onChange={handleChange}
          centered
          classes={{ indicator: classes.indicator }}
        >
          
          {(!location.state?.comingMovie ? true : "") && (
            <Tab
              disableRipple
              label="L???ch Chi???u"
              classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
            />
          )}
          <Tab
            disableRipple
            label="Th??ng Tin"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
          <Tab
            disableRipple
            label="????nh Gi??"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
        </Tabs>
      </AppBar>
      <Fade
        timeout={400}
        in={valueTab === (location.state?.comingMovie ? "hide" : 0)}
      >
        <TabPanel
          value={valueTab}
          index={location.state?.comingMovie ? "hide" : 0}
          isMobile={isMobile}
        >
          {isMobile ? <LichChieuMobile /> : <LichChieuDesktop data={data} />}
        </TabPanel>
      </Fade>
      <Fade
        timeout={400}
        in={valueTab === (location.state?.comingMovie ? 0 : 1)}
      >
        <TabPanel
          value={valueTab}
          index={location.state?.comingMovie ? 0 : 1}
          className={classes.noname}
        >
          <div className={`row text-white ${classes.detailMovie}`}>
            <div className="col-sm-6 col-xs-12">
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>
                  Ng??y c??ng chi???u
                </p>
                <p className={`float-left ${classes.contentInfo}`}>
                  {formatDate(data.ngayKhoiChieu?.slice(0, 10)).YyMmDd}
                </p>
              </div>
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>?????o di???n</p>
                <p className={`float-left ${classes.contentInfo}`}>
                  {" "}
                  Adam Wingard{" "}
                </p>
              </div>
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>
                  Di???n vi??n
                </p>
                <p className={`float-left ${classes.contentInfo}`}>
                  Kyle Chandler, Rebecca Hall, Eiza Gonz??lez, Millie Bobby Brown
                </p>
              </div>
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>Th??? Lo???i:</p>
                <p className={`float-left ${classes.contentInfo}`}>
                  h??nh ?????ng, gi??? t?????ng, ly k???, th???n tho???i
                </p>
              </div>
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>
                  ?????nh d???ng
                </p>
                <p className={`float-left ${classes.contentInfo}`}>
                  2D/Digital
                </p>
              </div>
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>
                  Qu???c Gia SX
                </p>
                <p className={`float-left ${classes.contentInfo}`}>M???</p>
              </div>
            </div>
            <div className="col-sm-6 col-xs-12">
              <div className="row mb-2">
                <p className={`float-left ${classes.contentTitle}`}>N???i dung</p>
              </div>
              <div className="row mb-2">
                <p>{data.moTa}</p>
              </div>
            </div>
          </div>
        </TabPanel>
      </Fade>
      <Fade
        timeout={400}
        in={valueTab === (location.state?.comingMovie ? 1 : 2)}
      >
        <TabPanel
          value={valueTab}
          index={location.state?.comingMovie ? 1 : 2}
          className={classes.noname}
        >
          <div className={classes.danhGia}>
            <div className={classes.inputRoot} onClick={handleClickComment}>
              <span className={classes.avatarReviewer}>
                <img
                  src={currentUser ? FAKE_AVATAR : UNKNOW_USER}
                  alt="avatar"
                  className={classes.avatarImg}
                />
              </span>
              <input
                className={classes.inputReviwer}
                type="text"
                placeholder="B???n ngh?? g?? v??? phim n??y?"
                readOnly="readonly"
              />

              <span className={classes.imgReviewerStar}>
                <Rating
                  value={5}
                  size={isMobile ? "small" : "medium"}
                  readOnly
                />
              </span>
            </div>
          </div>
          <div
            className="text-center mb-2 text-white"
            hidden={!loadingPostComment && !loadingLikeComment}
          >
            <CircularProgress size={20} color="inherit" />
          </div>
          {commentListDisplay?.comment?.map((item) => (
            <div
              key={`${item.createdAt}`}
              className={classes.itemDis}
              id={`idComment${item.createdAt}`}
            >
              <div className={classes.infoUser}>
                <div className={classes.left}>
                  <span className={classes.avatar}>
                    <img
                      src={`https://i.pravatar.cc/150?u=${item.avtId}`}
                      alt="avatar"
                      className={classes.avatarImg}
                    />
                  </span>
                  <span className={classes.liveUser}>
                    <p className={classes.userName}>{item.username}</p>
                    <p className={classes.timePost}>
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </span>
                </div>
                <div className={classes.right}>
                  <p className="text-success">{item.point}</p>
                  <Rating
                    value={(item.point * 5) / 10}
                    precision={0.5}
                    size={isMobile ? "small" : "medium"}
                    readOnly
                  />
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="py-3 mb-3 border-bottom">
                <p className="text-break">{item.post}</p>
              </div>
              <span
                className="d-inline-block"
                style={{ cursor: "pointer" }}
                onClick={() => handleLike(item.id)}
              >
                <span className="mr-2">
                  {((userLikeThisComment) => {
                    return (
                      <ThumbUpIcon
                        style={{
                          color: userLikeThisComment.includes(
                            currentUser?.email
                          )
                            ? "#fb4226"
                            : "#73757673",
                        }}
                      />
                    );
                  })(item.userLikeThisComment)}
                </span>
                <span style={{ color: "#737576" }}>
                  <span>{item.likes}</span> Th??ch
                </span>
              </span>
            </div>
          ))}
          <div className={classes.moreMovie}>
            <Button
              variant="outlined"
              onClick={() => setopenMore()}
              className={classes.moreMovieButton}
            >
              XEM TH??M
            </Button>
          </div>
        </TabPanel>
      </Fade>

      <Dialog
        open={openComment}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className={classes.dialog}
      >
        <MuiDialogTitle disableTypography className={classes.rootcloseButton}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <Grid container direction="column" justify="center" alignItems="center">
          <span className={classes.pointPopup}>{dataComment.point * 2}</span>
          <Rating
            name="customStar"
            size="large"
            precision={0.5}
            value={dataComment.point}
            className={classes.starPopup}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(event, newValue) => {
              setdataComment((data) => ({ ...data, point: newValue }));
            }}
          />
        </Grid>
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            onChange={(event) => handletyping(event)}
            fullWidth
            value={dataComment.post}
            variant="outlined"
            label={
              dataComment.post
                ? ""
                : "N??i cho m???i ng?????i bi???t b???n ngh?? g?? v??? phim n??y..."
            }
          />
        </DialogContent>
        <DialogActions className="justify-content-center flex-column px-4">
          {warningtext && (
            <DialogContentText className="text-danger">
              Phim khi???n b???n c???m th???y tuy???t v???i ch???? H??y chia s??? v??? ch??ng t??i! (G?? tr??n 60 k?? t???.)
            </DialogContentText>
          )}
          <Button
            onClick={handlePostComment}
            variant="contained"
            className={classes.btnDang}
          >
            ????ng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

