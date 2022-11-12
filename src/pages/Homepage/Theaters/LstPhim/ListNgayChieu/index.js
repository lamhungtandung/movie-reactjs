import React, { Fragment } from 'react'

import formatDate from '../../../../../util/formatDate'
import BtnGoToCheckOut from '../../../../../components/BtnGoToCheckOut';
import useStyles from './style'

export default function LstGioChieu({ lstLichChieuTheoPhim }) {
  const classes = useStyles()
  const mangChiChuaNgay = lstLichChieuTheoPhim.map(item => {  
    return item.ngayChieuGioChieu.slice(0, 10);
  })
  const MangNgayKhongTrungLap = [...new Set(mangChiChuaNgay)]

  const filterByDay = (date) => {
    const gioChieuRenDer = lstLichChieuTheoPhim.filter(item => {
      if (item.ngayChieuGioChieu.slice(0, 10) === date) {
        return true
      }
      return false
    })
    return gioChieuRenDer;
  }

  return (
    <div className={classes.lstNgayChieu}>
      {MangNgayKhongTrungLap.map(date => (
        <Fragment key={date}>
          <p className={classes.ngayChieu}>{formatDate(date).dateFull}</p> 
          <div className={classes.groupTime}>
            {filterByDay(date).map(lichChieuTheoPhim => (
              <Fragment key={lichChieuTheoPhim.maLichChieu}>
                <BtnGoToCheckOut lichChieuTheoPhim={lichChieuTheoPhim} />
              </Fragment>
            ))}
          </div>

        </Fragment>
      ))
      }
    </div >
  )
}
