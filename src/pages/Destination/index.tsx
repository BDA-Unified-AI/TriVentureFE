import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import DestinationCard from "./destinationCard";
import { getDestination } from "../../apis/dest";
import { Pagination, Spin, Select } from "antd";
import CustomModal from "../../components/CustomModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
interface Destination {
  id: string; // Add the id property
  name: string;
  image: string;
  description: string;
  tag: string;
}

interface DestinationListProps {
  onLoad?: () => void | Promise<void>; // Make onLoad optional
}

const DestinationList: React.FC<DestinationListProps> = ({ onLoad }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Destination[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const lastCardRef = useRef<HTMLDivElement | null>(null); // Reference for the last card

  const fetchDestinations = async (page: number) => {
    if (totalPages !== null && page > totalPages) return;

    setLoading(true);
    try {
      const response = await getDestination(page);
      const destinations: Destination[] = response.data.map((item: any) => ({
        id: item.id, // Include the id property
        name: item.name,
        image: item.image,
        description: item.description,
        tag: item.tag,
      }));
      setData((prevData) => [...prevData, ...destinations]); // Append new data
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
      if (page === 1) {
        if (onLoad) {
          onLoad();
        }
      }
    }
  };

  const handleItemClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDestination(null);
  };

  // Intersection Observer callback
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const lastCard = entries[0];
      if (lastCard.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1); // Fetch the next page when the last card is in view
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchDestinations(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // Defaults to the browser viewport if not specified
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the target is visible
    });

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current); // Observe the last card
    }

    return () => {
      if (lastCardRef.current) {
        observer.unobserve(lastCardRef.current); // Clean up observer on component unmount
      }
    };
  }, [observerCallback, data]);

  return (
    <>
      <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl ">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-bold font-roboto"
        >
          {t("travel destination")}
        </motion.h1>
      </div>
      <div className="container mx-auto p-4 font-roboto">
        <Select
          defaultValue="appropriate"
          style={{ width: 120 }}
          options={[
            { value: "appropriate", label: "Phù hợp" },
            { value: "nearest", label: "Gần nhất" },
            { value: "popular", label: "Phổ biến" },
          ]}
        />
        <div className="md:flex justify-start items-center gap-4 overflow-x-scroll list-none p-5 mx-0 my-auto overflow-y-hidden flex-1 scrollbar-thin scrollbar-thumb-primary-500">
          {loading && data.length === 0
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-64 h-64">
                  <Skeleton height="100%" />
                </div>
              ))
            : data.length > 0 &&
              data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer flex justify-center mb-4 md:mb-0"
                  ref={index === data.length - 1 ? lastCardRef : null}
                >
                  <DestinationCard destination={item} />
                </motion.div>
              ))}
        </div>

        <div className="text-center mt-5">
          {loading && data.length > 0 && <Spin size="large" />}
        </div>
      </div>
      <CustomModal
        isOpen={isModalVisible}
        onClose={handleModalClose}
        data={selectedDestination}
      />

      {totalPages && (
        <Pagination
          className="visible md:invisible"
          simple
          current={page}
          total={totalPages * 10}
          onChange={(page) => setPage(page)}
        />
      )}
    </>
  );
};

export default DestinationList;
