import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

import Img1 from '../../Assets/image/beauty.jpg'
import Img2 from '../../Assets/image/deals.jpg'
import Img3 from '../../Assets/image/elecdeals.jpg'
import Img4 from '../../Assets/image/electrony.jpg'

SwiperCore.use([Pagination])

const Carousel = () => {
  const imgArray = [Img1, Img2, Img3, Img4]

  return (
    <CarouselContainer>
      <Swiper pagination={true} className='mySwiper'>
        {imgArray &&
          imgArray.length > 0 &&
          imgArray.map((x) => (
            <SwiperSlide>
              <img src={x} alt='' />
            </SwiperSlide>
          ))}
      </Swiper>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  ${tw`
    w-full
    max-w-6xl
    mb-6
  `}

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default Carousel
