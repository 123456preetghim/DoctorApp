import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Pagination } from 'swiper';


import patientAvatar from '../../assets/images/patient-avatar.jpg';


// Install Swiper modules
SwiperCore.use([Pagination]);

const Testimonial = () => {
  return (
    <div className='mt-[30px] lg:mt-[55px]'>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="Patient Avatar" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Prakash Ghimire
                </h4>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Add more SwiperSlide components here if needed */}
      </Swiper>
    </div>
  );
};

export default Testimonial;
