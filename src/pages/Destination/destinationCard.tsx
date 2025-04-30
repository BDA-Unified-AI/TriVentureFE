import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  tag: string;
}

const DestinationCard = ({ destination }: { destination: Destination }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [truncatedDesc, setTruncatedDesc] = useState("");
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Truncate description and add ellipsis if needed
  useEffect(() => {
    const truncateDescription = () => {
      if (destination.description.length > 80) {
        setTruncatedDesc(destination.description.substring(0, 80) + "...");
      } else {
        setTruncatedDesc(destination.description);
      }
    };

    truncateDescription();
  }, [destination.description]);

  const handleNavigate = () => {
    navigate(`/destination/${destination.id}`);
  };

  return (
    <motion.div
      className="bg-white shadow-xl rounded-xl overflow-hidden w-full h-96 md:w-64 mb-8 font-roboto relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="w-full h-48 overflow-hidden">
        <motion.img
          alt={destination.name}
          src={destination.image}
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
          {destination.tag}
        </div>
      </div>
      <div className="p-5">
        <h2
          className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 overflow-hidden"
          title={destination.name}
        >
          {destination.name}
        </h2>
        <p
          ref={descriptionRef}
          className="text-gray-600 text-sm min-h-[3rem] line-clamp-2 font-roboto mb-10"
          title={destination.description}
        >
          {truncatedDesc}
        </p>
        <div className="absolute bottom-5 w-full left-0 px-5">
          <div className="border-t border-gray-200 w-full mb-3 mx-auto"></div>
          <motion.button
            onClick={handleNavigate}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-medium shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("see more")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
