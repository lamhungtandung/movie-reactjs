import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { LOGOUT } from '../../reducers/constants/Auth';
import { LOADING_BACKTO_HOME } from '../../reducers/constants/Lazy';
const TopBar = ({
  onMobileNavOpen,
  ...rest
}) => {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickLogo = () => {
    dispatch({ type: LOADING_BACKTO_HOME })
    setTimeout(() => {
      history.push("/", "")
    }, 50);
  }
  return (

    //header trên cùng
    <AppBar
      elevation={0}
      position="static"
      {...rest}
    >
      <Toolbar>
        <div onClick={handleClickLogo} style={{ cursor: "pointer" }}>
          <img src="/img/headTixLogo.png" alt="logo" style={{ height: 50 }} />
        </div>

        {/* div*/}
        <Box flexGrow={1} />

        {/*đăng xuất */}
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Đăng xuất">
            <IconButton color="inherit" onClick={() => dispatch({ type: LOGOUT })}>
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>

        {/* cái icon menu */}
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

// báo lỗi nếu kiểu dữ liệu truyền vào props không đúng hướng đi
TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;

