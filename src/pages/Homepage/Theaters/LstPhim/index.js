import React, { memo } from 'react'
import useStyles from './style'

import ThoiLuongDanhGia from '../../../../components/ThoiLuongDanhGia/thoiLuongDanhGia'
import { customScrollbar } from '../../../../styles/materialUi'
import { underLine } from '../../../../styles/materialUi'
import LstNgayChieu from './ListNgayChieu'

function Index(props) {
  const classes = useStyles({ customScrollbar, underLine });
  return (
    <div className={classes.lstPhim} hidden={props.hidden}>
      {props.lstPhim.map(phim => (
        <div className={classes.phim} key={phim.maPhim}>
          <div className={classes.phim__info}>
            <img src={phim.hinhAnh} className={classes.phim__img} alt={phim.tenPhim} />
            <div className={classes.phim__text}>
              <p className={classes.phim__text_name}>{phim.tenPhim}</p>
              <ThoiLuongDanhGia maPhim={phim.maPhim} />
            </div>
          </div>
          <div>
            <LstNgayChieu lstLichChieuTheoPhim={phim.lstLichChieuTheoPhim} />
          </div>
        </div>
      ))}
    </div>
  )
}
export default memo(Index)