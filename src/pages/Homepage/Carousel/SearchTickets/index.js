import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomPopper from "./popper";

import theatersApi from "../../../../api/theatersApi";
import useStyles from "./styles";
import formatDate from "../../../../util/formatDate";
import { HIDDEN_SEARCHTICKET } from "../../../../constants/config";

export default function SearchStickets() {
  const { movieList: movieRender, errorMovieList } = useSelector(
    (state) => state.movieReducer
  );
  const history = useHistory();
  const down992px = useMediaQuery(HIDDEN_SEARCHTICKET);
  const [data, setData] = useState({
    // handleSelectPhim
    setPhim: "",
    rapRender: [],
    cumRapChieuData: [],
    startRequest: false,
    errorCallApi: "",

    // handleSelectRap
    setRap: "",
    ngayChieuRender: [],
    lichChieuPhimData: [],

    // handleSelectNgayXem
    setNgayXem: "",
    suatChieuRender: [],
    lichChieuPhimDataSelected: [],

    // handleSelectSuatChieu
    setSuatChieu: "",
    maLichChieu: "",

    // handleOpen
    openCtr: { phim: false, rap: false, ngayXem: false, suatChieu: false },
    // element:
    rootElementPopup: null,
  });
  const [topPopup, setTopPopup] = useState(false);
  const classes = useStyles({
    down992px,
    openPhim: data.openCtr.phim || data.setPhim?.maPhim,
  });
  const [currentPhimPopup, setcurrentPhimPopup] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!data.openCtr.phim) {
      return undefined;
    }
    setTimeout(() => {
      const placementPopup = document.querySelector(
        'div[role="presentation"].MuiAutocomplete-popper'
      );
      if (placementPopup?.getAttribute("x-placement") === "bottom" && mounted) {
        setTopPopup(false);
      } else if (
        placementPopup?.getAttribute("x-placement") === "top" &&
        mounted
      ) {
        setTopPopup(true);
      }
      //?????nh v??? popper
      setData((data) => ({
        ...data,
        rootElementPopup: placementPopup,
      }));
    }, 50);
    return () => {
      mounted = false;
    };
  }, [data.openCtr.phim]);

  const handleOpenPhim = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, phim: true },
    }));
  };
  const handleOpenRap = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: true } }));
  };
  const handleOpenNgayXem = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ngayXem: true },
    }));
  };
  const handleOpenSuatChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, suatChieu: true },
    }));
  };
  const handleClosePhim = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, phim: false } }));
  };
  const handleCloseRap = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: false } }));
  };
  const handleCloseNgayXem = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ngayXem: false },
    }));
  };
  const handleCloseSuatChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, suatChieu: false },
    }));
  };

  // input: maPhim
  // output: setPhim(maPhim), rapRender(maPhim)[tenCumRap], cumRapChieuData(maPhim)[{lichChieuPhim}],
  const handleSelectPhim = (phim) => {
    if (!phim) {
      return undefined;
    }
    setData((data) => ({
      ...data,
      setPhim: phim,
      startRequest: true,
      openCtr: { ...data.openCtr, rap: true },
      // reset
      rapRender: [],
      cumRapChieuData: [],
      setRap: "",
      ngayChieuRender: [],
      lichChieuPhimData: [],
      setNgayXem: "",
      suatChieuRender: [],
      lichChieuPhimDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));
    theatersApi
      .getThongTinLichChieuPhim(phim.maPhim)
      .then((result) => {
        setData((data) => ({ ...data, startRequest: false }));
        const cumRapChieuData = result.data.heThongRapChieu.reduce(
          (colect, item) => {
            return [...colect, ...item.cumRapChieu];
          },
          []
        );
        const rapRender = cumRapChieuData.map((item) => item.tenCumRap);
        setData((data) => ({
          ...data,
          rapRender,
          cumRapChieuData,
        }));
      })
      .catch(function (error) {
        if (error.response) {
          setData((data) => ({ ...data, errorCallApi: error.response.data }));
        } else if (error.request) {
          setData((data) => ({ ...data, errorCallApi: error.message }));
        }
      });
  };
  // input: tenCumRap, cumRapChieuData
  // output: setRap(tenCumRap), ngayChieuRender(tenCumRap,cumRapChieuData)[ngayChieu], lichChieuPhimData(tenCumRap,cumRapChieuData)[{ngayChieuGioChieu: "2019-01-01T10:10:00"}]
  const handleSelectRap = (e) => {
    setData((data) => ({
      ...data,
      setRap: e.target.value,
      openCtr: { ...data.openCtr, ngayXem: true },
      // reset
      ngayChieuRender: [],
      lichChieuPhimData: [],
      setNgayXem: "",
      suatChieuRender: [],
      lichChieuPhimDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));
    const indexSelect = data.cumRapChieuData.findIndex(
      (item) => item.tenCumRap === e.target.value
    );
    const lichChieuPhimData = data.cumRapChieuData[indexSelect].lichChieuPhim;
    const ngayChieuRender = lichChieuPhimData.map((item) => {
      return item.ngayChieuGioChieu.slice(0, 10);
    });
    const ngayChieuRenderRemoveDuplicates = [...new Set(ngayChieuRender)]; // 
    setData((data) => ({
      ...data,
      ngayChieuRender: ngayChieuRenderRemoveDuplicates,
      lichChieuPhimData,
    }));
  };

  const handleSelectNgayXem = (e) => {
    setData((data) => ({
      ...data,
      setNgayXem: e.target.value,
      openCtr: { ...data.openCtr, suatChieu: true },
      // reset
      suatChieuRender: [],
      lichChieuPhimDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));

    const lichChieuPhimDataSelected = data.lichChieuPhimData.filter((item) => {
      if (item.ngayChieuGioChieu.slice(0, 10) === e.target.value) {
        return true;
      }
      return false;
    });
    const suatChieuRender = lichChieuPhimDataSelected.map((item) => {
      return item.ngayChieuGioChieu.slice(11, 16);
    });
    setData((data) => ({
      ...data,
      suatChieuRender,
      lichChieuPhimDataSelected,
    }));
  };

  // input: suatChieu
  // output: setSuatChieu(suatChieu), maLichChieu(suatChieu)[maLichChieu]
  const handleSelectSuatChieu = (e) => {
    setData((data) => ({
      ...data,
      setSuatChieu: e.target.value,
      // reset
      maLichChieu: "",
    }));
    const indexMaLichChieuSelect = data.lichChieuPhimDataSelected.findIndex(
      (item) => item.ngayChieuGioChieu.slice(11, 16) === e.target.value
    );
    const maLichChieu =
      data.lichChieuPhimDataSelected[indexMaLichChieuSelect].maLichChieu;
    setData((data) => ({ ...data, maLichChieu }));
  };

  const setNewPhim = (maPhim) => {
    setcurrentPhimPopup(maPhim);
  };
  const menuProps = {
    // props v?? class c???a menu
    classes: { paper: classes.menu },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: topPopup ? "top" : "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: topPopup ? "bottom" : "top",
      horizontal: "left",
    },
  };

  if (errorMovieList) {
    return <p>{errorMovieList}</p>;
  }

  return (
    <div className={classes.search} id="searchTickets">
      <FormControl focused={false} className={classes.itemFirst}>
        <Autocomplete
          options={movieRender}
          getOptionLabel={(option) => option.tenPhim}
          style={{ width: 300 }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="T??m phim..."
                variant="standard"
                className={classes.textField}
              />
            );
          }}
          renderOption={(phim) => (
            <CustomPopper
              key={phim.tenPhim}
              phim={phim}
              setNewPhim={setNewPhim}
              currentPhimPopup={currentPhimPopup}
              rootElementPopup={data.rootElementPopup}
            />
          )}
          popupIcon={<ExpandMoreIcon />}
          value={data.setPhim ? data.setPhim : null}
          onChange={(event, phim) => {
            handleSelectPhim(phim);
          }}
          classes={{
            popupIndicator: classes.popupIndicator,
            option: classes.menu__item,
            listbox: classes.listbox,
            paper: classes.paper,
            noOptions: classes.noOptions,
          }}
          open={data.openCtr.phim} // control open
          onClose={handleClosePhim}
          onOpen={handleOpenPhim}
          blurOnSelect
          noOptionsText="Kh??ng t??m th???y"
        />
      </FormControl>

      <FormControl
        className={`${classes["search__item--next"]} ${classes.search__item}`}
        focused={false}
      >
        <Select
          open={data.openCtr.rap}
          onClose={handleCloseRap}
          onOpen={handleOpenRap}
          onChange={handleSelectRap}
          value={data.setRap} // tenCumRap
          renderValue={(value) => `${value ? value : "R???p"}`}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          MenuProps={menuProps}
        >
          <MenuItem
            value=""
            style={{ display: data.rapRender.length > 0 ? "none" : "block" }}
            classes={{ root: classes.menu__item }}
          >
            {data.setPhim
              ? `${
                  data.startRequest
                    ? data.errorCallApi
                      ? data.errorCallApi
                      : "??ang t??m r???p"
                    : "Ch??a c?? l???ch chi???u, vui l??ng ch???n phim kh??c"
                }`
              : "Vui l??ng ch???n phim"}
          </MenuItem>
          {data.rapRender.map((item) => (
            <MenuItem
              value={item}
              key={item}
              classes={{
                root: classes.menu__item,
                selected: classes["menu__item--selected"],
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className={`${classes["search__item--next"]} ${classes.search__item}`}
        focused={false}
      >
        <Select
          open={data.openCtr.ngayXem}
          onClose={handleCloseNgayXem}
          onOpen={handleOpenNgayXem}
          onChange={handleSelectNgayXem}
          value={data.setNgayXem} // ngayChieu
          renderValue={(value) => `${value ? value : "Ng??y xem"}`}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          MenuProps={menuProps}
        >
          <MenuItem
            value=""
            style={{
              display: data.ngayChieuRender.length > 0 ? "none" : "block",
            }}
            classes={{ root: classes.menu__item }}
          >
            Vui l??ng ch???n phim v?? r???p
          </MenuItem>
          {data.ngayChieuRender.map((ngayChieu) => (
            <MenuItem
              value={ngayChieu}
              key={ngayChieu}
              classes={{
                root: classes.menu__item,
                selected: classes["menu__item--selected"],
              }}
            >
              <div>{formatDate(ngayChieu).dayToday}</div>
              <div>{formatDate(ngayChieu).dateShort}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className={`${classes["search__item--next"]} ${classes.search__item}`}
        focused={false}
      >
        <Select
          open={data.openCtr.suatChieu}
          onClose={handleCloseSuatChieu}
          onOpen={handleOpenSuatChieu}
          onChange={handleSelectSuatChieu}
          value={data.setSuatChieu} // suatChieu
          renderValue={(value) => `${value ? value : "Su???t chi???u"}`}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          MenuProps={menuProps}
        >
          <MenuItem
            value=""
            style={{
              display: data.suatChieuRender.length > 0 ? "none" : "block",
            }}
            classes={{ root: classes.menu__item }}
          >
            Vui l??ng ch???n phim, r???p v?? ng??y xem
          </MenuItem>
          {data.suatChieuRender.map((suatChieu) => (
            <MenuItem
              value={suatChieu}
              key={suatChieu}
              classes={{
                root: classes.menu__item,
                selected: classes["menu__item--selected"],
              }}
            >
              {suatChieu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes["search__item--next"]}>
        <Button
          disabled={!data.maLichChieu} //kh??ng c?? data => disabled set true
          classes={{
            root: classes.btn,
            disabled: classes.btnDisabled,
          }}
          onClick={() =>
            history.push(
              `/datve/${data.maLichChieu}`,
              `/datve/${data.maLichChieu}`
            )
          }
        >
          mua v?? ngay
        </Button>
      </FormControl>
    </div>
  );
}

SearchStickets.propTypes = {
  smDown: PropTypes.bool,
};
