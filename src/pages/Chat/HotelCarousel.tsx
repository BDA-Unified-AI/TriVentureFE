import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { searchHotels } from "../../apis/hotels";

interface HotelItem {
  name: string;
  location: string;
  price: number;
}
interface HotelCarouselProps {
  type: string;
  handleSend: (message: string) => void;
}

const HotelCarousel: React.FC<HotelCarouselProps> = ({ type, handleSend }) => {
  const [hotelData, setHotelData] = useState<HotelItem[]>([]);
  const fetchHotels = async (type: string) => {
    const { status, data } = await searchHotels(type, 5);
    if (status === 200) {
      setHotelData(data as HotelItem[]);
    }
  };
  useEffect(() => {
    fetchHotels(type);
  }, []);
  return (
    <div className="block">
      {hotelData.length === 0 && <div>Loading...</div>}
      <Carousel arrows infinite={false} className="pb-2">
        {hotelData.map((hotel, index) => (
          <div key={index}>
            <img
              src="https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o="
              alt="hotel"
              className="object-cover h-full w-full rounded-md"
            />
            <div className="p-2 bg-white text-center">
              <h1 className="text-primary-50 font-semibold">{hotel.name}</h1>
            </div>
            <div className="flex justify-center gap-2 p-2">
              <button
                className="bg-primary-50 text-white p-2 rounded-md"
                onClick={() => handleSend(`Book hotel ${hotel.name}`)}
              >
                Book Now
              </button>
              <button className="bg-primary-50 text-white p-2 rounded-md">
                More Info
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HotelCarousel;
