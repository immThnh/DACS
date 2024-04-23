import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slideshow.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import background from "../../assets/images/Banner_01_2.png";
const PromoSlideshow = () => {
    const slides = [
        {
            img: background,
            title: "Khoa hoc 1 dang giam gia",
            description: "Loasdaaaaaaaaaaaaaaa",
            buttonText: "MUA NGAY",
        },
        {
            img: background,
            title: "Khoa hoc 2 dang giam gia",
            description: "saaddddddddddddddddddddddddddd",
            buttonText: "MUA NGAY",
        },
        // More slides...
    ];

    return (
        <div className="max-w-[1536px] mx-auto">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return (
                            '<span class="' +
                            className +
                            ' SwiperBulletcustom"></span>'
                        );
                    },
                }}
                navigation={true}
                className="relative rounded-xl"
                style={{ height: "300px" }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex items-center justify-between bg-pink-300"
                    >
                        <div className=" flex z-10 p-10 text-left text-white">
                            <div className="w-1/2 ml-10">
                                <h2 className="text-4xl font-bold">
                                    {slide.title}
                                </h2>
                                <p className="my-4">{slide.description}</p>
                                <button className="px-6 py-3 mt-4 text-white bg-purple-500 rounded-full font-medium shadow-lg">
                                    {slide.buttonText}
                                </button>
                            </div>
                            <div className="w-1/2 ">
                                <img
                                    src={slide.img}
                                    alt="Slide image"
                                    style={{ width: "400px", height: "200px" }}
                                    className="object-contain h-full m-auto pb-5"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PromoSlideshow;
