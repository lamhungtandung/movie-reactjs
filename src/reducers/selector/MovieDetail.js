import { createSelector } from 'reselect'
import formatDate from '../../util/formatDate';

const selectMobileData = createSelector(
  state => state.movieDetailReducer,
  movieDetailReducer => {
    // check lịch chieu
    const isEmptyData = movieDetailReducer.movieDetailShowtimes.heThongRapChieu?.length === 0
    const heThongRapChieu = movieDetailReducer.movieDetailShowtimes.heThongRapChieu
  //tao va xu li
    const arrayAllLichChieuPhimAddProp = heThongRapChieu?.reduce(
      (colect1, heThongRapChieuItem) => {
        return [...colect1,
        ...heThongRapChieuItem.cumRapChieu?.reduce((colect2, cumRapChieuItem) => {
          return [...colect2,
          ...cumRapChieuItem.lichChieuPhim?.reduce((colect3, lichChieuPhimItem) => {
            return [...colect3, {
              ...lichChieuPhimItem,
              tenHeThongRap: heThongRapChieuItem.tenHeThongRap,
              tenCumRap: cumRapChieuItem.tenCumRap,
              logo: heThongRapChieuItem.logo
            }]
          }, [])
          ]
        }, [])
        ]
      }, [])
    //loc mang
    const arrayDay = [...new Set(arrayAllLichChieuPhimAddProp?.map(
      item => item.ngayChieuGioChieu?.slice(0, 10)
    ))].sort()

    const arrHeThongRapChieuFilter = arrayDay.map((date) => {

      const arrLichChieuPhim = arrayAllLichChieuPhimAddProp.filter(
        item => item.ngayChieuGioChieu.slice(0, 10) === date)

      const arrayHeThongRapRemoveDup = arrLichChieuPhim?.filter(
        (itemIncrease, indexIncrease, arr) =>
          indexIncrease === arr.findIndex((t) => t.tenHeThongRap === itemIncrease.tenHeThongRap)
      )
      const arrayHeThongRapItem = arrayHeThongRapRemoveDup.map(heThongRapItem => {
        const arrayLichChieuPhimFilterByHeThongRap = arrLichChieuPhim?.filter(
          (item) => item.tenHeThongRap === heThongRapItem.tenHeThongRap)
        const arrCumRapRemove = arrayLichChieuPhimFilterByHeThongRap?.filter(
          (itemIncrease, indexIncrease, arr) =>
            indexIncrease === arr.findIndex((t) => t.tenCumRap === itemIncrease.tenCumRap))

        const cumRapChieu = arrCumRapRemove.map(cumRapChieu => {
          const lichChieuPhim = arrayLichChieuPhimFilterByHeThongRap.filter(
            lichChieuPhim => lichChieuPhim.tenCumRap === cumRapChieu.tenCumRap
          )
          return {
            tenCumRap: cumRapChieu.tenCumRap,
            maLichChieu: cumRapChieu.maLichChieu,
            lichChieuPhim
          }
        })
        return { tenHeThongRap: heThongRapItem.tenHeThongRap, logo: heThongRapItem.logo, cumRapChieu }
      })

      return { date, heThongRap: arrayHeThongRapItem }
    })
    return { arrHeThongRapChieuFilter, isEmptyData }
  }
)

const selectDesktopData = (currentSelectedHeThongRapChieu) => {
  const arrAllLichChieu = currentSelectedHeThongRapChieu.cumRapChieu.reduce((colect, item) => {
    return [...colect,
    ...item.lichChieuPhim.map(lichChieu => ({
      ...lichChieu, tenCumRap: item.tenCumRap
    }))
    ]
  }, [])

  //array ngay
  const arrayAllDay = arrAllLichChieu.map(item => {
    return item.ngayChieuGioChieu.slice(0, 10);
  })
  const arrDay = [...(new Set(arrayAllDay))].sort() 

  const arrAllCumRapFilter = arrDay.map((day) => {

    // tạo mảng chứa 
    const arrLichChieuFilter = arrAllLichChieu.filter(item => {
      if (item.ngayChieuGioChieu.slice(0, 10) === day) {
        return true
      }
      return false
    })

    // xu li trùng lặp
    const arrayCumRapChieuRemoveDup = arrLichChieuFilter?.filter((itemIncrease, indexIncrease, arr) => {
      const indexFirstFounded = arr.findIndex((t) => (
        t.tenCumRap === itemIncrease.tenCumRap
      ))
      return indexIncrease === indexFirstFounded
    })

    // tạo mảng
    const arrCumRap = arrayCumRapChieuRemoveDup.map(cumRapChieu => {
      const tenCumRap = cumRapChieu.tenCumRap
      const maLichChieu = cumRapChieu.maLichChieu
      const lichChieuPhim = arrLichChieuFilter.filter(lichChieuPhim => lichChieuPhim.tenCumRap === tenCumRap)
      return { tenCumRap, maLichChieu, lichChieuPhim }
    })

    return arrCumRap
  })
  return { arrDay, arrAllCumRapFilter}
}

const selectCommentByMaPhimAndCommentTest = createSelector(
  (state, maPhim) => state.movieDetailReducer.commentList.filter(item => item.dataTest || (item.maPhim === maPhim)),
  commentListFiltered => {
    const commentList = commentListFiltered.sort((a, b) => formatDate(b.createdAt).getTime - formatDate(a.createdAt).getTime)
    return { commentList }
  }
)

export { selectMobileData, selectDesktopData, selectCommentByMaPhimAndCommentTest }


