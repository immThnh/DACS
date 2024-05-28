import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slideshow.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import background from "../../assets/images/Banner_01_2.png";
import background2 from "../../assets/images/BannerReact.png"
const PromoSlideshow = () => {
    const slides = [
        {
            img: background,
            title: "Courses to improve UI UX design skills",
            description:
                "Practice projects with Figma, hundreds of exercises and challenges, 100% instruction by Son Dang, included flashcards, and more.",
            buttonText: "See now",
        },
        {
            img: background2,
            title: "Learn ReactJS for Free!",
            description:
                "ReactJS course from basic to advanced. The result of this course is that you can do most common projects with ReactJS.",
            buttonText: "Enroll now",
        },
    ];

    return (
        <div className="max-w-screen-xl mx-auto">
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
                        <div className="row">
                        <div className="flex z-10 p-10 text-left text-white w-full md:w-1/2 col-lg-6">
                            <div>
                                <h2 className="pl-20 text-2xl md:text-4xl font-bold">
                                    {slide.title}
                                </h2>
                                <p className="pl-20 my-4 text-sm md:text-base">
                                    {slide.description}
                                </p>
                                <button className="ml-20 px-4 py-2 mb-2 text-white bg-purple-500 rounded-full font-medium shadow-lg text-sm md:text-base">
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2 col-lg-6">
                            <img
                                src={slide.img}
                                alt="Slide image"
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
