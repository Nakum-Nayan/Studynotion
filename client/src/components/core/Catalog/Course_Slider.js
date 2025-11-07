import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import 'swiper/css/navigation';
import {Autoplay,Navigation } from "swiper/modules"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={Courses.length > 3}
          modules={[Autoplay,Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}  
          autoplay={{
            delay:2500,
            disableOnInteraction:false
          }}
          navigation={true}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">Course Is Not Found</p>
      )}
    </>
  )
}

export default Course_Slider
