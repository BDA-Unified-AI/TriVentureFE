import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

const bannerImages = [
  "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-quang-cao-du-lich-ky-nghi_113659754.jpg",
  "https://toursingmal.com/wp-content/uploads/2020/02/quy-nhon-phu-yen.png",
  "https://www.travelplusvn.com/public/uploads/upload_kcfinder/files/BannerCondao1-01.png",
];

const Banner = () => {
  return (
    <div className="w-full h-1/6 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 50000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="h-1/6"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index} className="">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="object-fill w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
