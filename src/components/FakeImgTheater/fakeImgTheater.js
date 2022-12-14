import React from 'react'

import { dataFakeImgTheater, returnRandomItem } from '../../constants/theaterData';

export default function FakeImgTheater({ nameTheater, imgStyle }) {
  let imgTheater

  const itemData = dataFakeImgTheater?.find(item => item.nameTheater === nameTheater)
  if (!itemData?.nameTheater) { 
    let img = returnRandomItem()
    dataFakeImgTheater.push({ nameTheater, img })
    imgTheater = img
  } else {
    imgTheater = itemData.img
  }

  return (
    <img className={imgStyle} src={imgTheater} alt="theater" />
  )
}
