import React from 'react'

import useApiThoiLuongDanhGia from '../../util/useApiThoiLuongDanhGia';

export default function ThoiLuongDanhGia(props) {
  const { thoiLuong, danhGia } = useApiThoiLuongDanhGia(props.maPhim)
  const style = {
    fontSize: 12,
    color: "#9b9b9b",
  }
  return (
    <>
      <span style={{ style }}>
        {`${thoiLuong ?? "120"} phút - Điểm: ${danhGia}`}
      </span>
    </>
  )
}
