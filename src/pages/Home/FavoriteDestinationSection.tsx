import React from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
interface Props {
  t: (key: string) => string;
  navigate: (path: string) => void;
  data: any[];
  isLoading: boolean;
}

const FavoriteDestinationSection: React.FC<Props> = ({
  t,
  navigate,
  data,
  isLoading,
}) => {
  const getGridClass = (index: number): string => {
    switch (index) {
      case 0:
        return "col-span-2 md:col-span-2 md:row-span-2";
      case 1:
        return "col-span-1 md:col-span-1 md:row-span-1";
      case 2:
        return "col-span-1 md:col-span-3 md:row-span-1";
      case 3:
        return "col-span-2 md:col-span-1 md:row-span-1";
      case 4:
        return "col-span-2 md:col-span-1 md:row-span-1";
      case 5:
        return "col-span-1 md:col-span-2 md:row-span-3";
      case 6:
        return " md:col-span-1 md:row-span-2";
      case 7:
        return "md:col-span-2 md:row-span-2";
      case 8:
        return "md:col-span-1 md:row-span-2";
      default:
        return "";
    }
  };
  const handleNavigate = (id: string) => {
    navigate(`/destination/${id}`);
  };
  return (
    <>
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-8">
          <motion.div
            className="text-xl md:text-2xl font-semibold md:font-bold text-primary-600 pb-2"
            whileInView={{ scale: 1.2 }}
          >
            {t("favorite destination")}
          </motion.div>
          <div className="w-24 h-1 rounded-full bg-primary-200 mx-auto mb-4"></div>
        </div>
        <div className="font-roboto text-center mb-8 max-w-2xl mx-auto text-gray-600">
          {t("text favorite destination")}
        </div>
        {isLoading ? (
          <div className="grid grid-flow-row-dense grid-cols-3 md:grid-cols-6 grid-rows-1 md:grid-rows-3 gap-1 md:gap-3 w-full h-96 md:h-[32rem]">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`${getGridClass(
                  index
                )} h-full overflow-hidden rounded-lg relative`}
              >
                <Skeleton height="100%" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-flow-row-dense grid-cols-3 md:grid-cols-6 grid-rows-1 md:grid-rows-3 gap-1 md:gap-3 w-full h-96 md:h-[32rem]">
            {data.slice(0, 9).map((data, index) => (
              <div
                key={index}
                className={`${getGridClass(
                  index
                )} h-full overflow-hidden rounded-lg relative`}
              >
                <motion.div
                  className="h-full w-full relative cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleNavigate(data.id)}
                >
                  <img
                    src={data.image}
                    className="object-cover w-full h-full"
                    alt={`Image ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-4">
                    <h3
                      className="text-gray-100 text-base md:text-xl font-sans font-bold text-center px-4 
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-shadow-xl mb-2"
                    >
                      {data.name}
                    </h3>
                    {index === 0 && (
                      <p className="text-white text-sm md:text-base opacity-90 line-clamp-3 text-center">
                        {data.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <button
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-300 transition-colors duration-300 font-semibold"
            onClick={() => navigate("/destination")}
          >
            {t("Explore All Destinations")}
          </button>
        </div>
      </div>
    </>
  );
};

export default FavoriteDestinationSection;
