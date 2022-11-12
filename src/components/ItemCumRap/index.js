import React, { Fragment } from 'react'

import Address from './Address'
import FakeImgTheater from '../FakeImgTheater/fakeImgTheater'
import BtnGoToCheckOut from '../BtnGoToCheckOut'
import TenCumRap from '../TenCumRap'
import { useStyles, Accordion, AccordionSummary, AccordionDetails } from './style'

export default function ItemCumRap({ tenCumRap, maLichChieu, lichChieuPhim, diaChi, defaultExpanded }) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.cumRapItem} >
        <Accordion key={tenCumRap} square defaultExpanded={defaultExpanded ?? false}>
          <AccordionSummary>
            <FakeImgTheater nameTheater={tenCumRap} imgStyle={classes.imgTheater} />
            <div className={classes.wrapInfo} >
              <TenCumRap tenCumRap={tenCumRap} />
              <Address maLichChieu={maLichChieu} diaChiAlreadyExist={diaChi} />
            </div>
            <div style={{ clear: "both" }}></div>
          </AccordionSummary>
          <AccordionDetails >
            {lichChieuPhim.map(loop => (
              <Fragment key={loop.maLichChieu} >
                <BtnGoToCheckOut lichChieuTheoPhim={loop} />
              </Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}
