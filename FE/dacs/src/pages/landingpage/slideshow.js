import React,{ memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
const PromoSlideshow = () => {
    // Sample images and titles
    const slides = [
      {
        img: '',
        title: 'Khoa hoc 1 dang giam gia',
        description: 'Loasdaaaaaaaaaaaaaaa',
        buttonText: 'MUA NGAY',
      },
      {
        img: '',
        title: 'Khoa hoc 2 dang giam gia',
        description: 'saaddddddddddddddddddddddddddd',
        buttonText: 'MUA NGAY',
      },
      
      // More slides...
    ];

    return (
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="relative my-4 rounded-xl overflow-hidden"
      >
       {slides.map((slide, index) => (
                <SwiperSlide key={index} className="flex justify-between items-center bg-black">
                    <div className="z-10 p-10 text-white">
                        <h2 className="text-4xl font-bold">{slide.title}</h2>
                        <p className="my-4">{slide.description}</p>
                        <button className="mt-4 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-lg">
                            {slide.buttonText}
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 bottom-0 w-1/2">
                        <img 
                            src={slide.img} 
                            alt={`.`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </SwiperSlide>
            ))}
      </Swiper>
    );
};

export default PromoSlideshow;
