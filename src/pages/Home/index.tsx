import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getDestination } from "../../apis/dest";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import AIDemoSection from "./AIDemoSection";
import AIFeatureSection from "./AIFeatureSection";
import HowItWorkSection from "./HowItWorkSection";
import FavoriteDestinationSection from "./FavoriteDestinationSection";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
}

const Home = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchDestinations = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getDestination(page);
      const destinations: Destination[] = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
        tag: item.tag,
      }));
      setData((prevData) => [...prevData, ...destinations]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations(1);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div
        // ref={heroRef}
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {t("Welcome to TriVenture")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t(
              "Discover Vietnam like never before with our AI-powered travel intelligence platform"
            )}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-300 transition-colors duration-300 font-semibold"
              onClick={() => navigate("/planner")}
            >
              {t("Plan Your Trip")}
            </button>
            <button
              className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
              onClick={scrollToFeatures}
            >
              {t("Explore Our AI Tools")}
            </button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <button onClick={scrollToFeatures} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto -mt-10 px-4 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-4">
          <SearchBar />
        </div>
      </div>

      <AIFeatureSection t={t} navigate={navigate} featuresRef={featuresRef} />

      <HowItWorkSection t={t} />

      <FavoriteDestinationSection
        t={t}
        navigate={navigate}
        data={data}
        isLoading={isLoading}
      />

      <AIDemoSection t={t} navigate={navigate} />

      <div className="container mx-auto py-16 px-4">
        <motion.div
          className="bg-gray-900 rounded-xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Ready to Discover Vietnam?")}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {t(
              "Let our AI-powered platform guide you through the beauty, culture, and wonders of Vietnam."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-300 transition-colors duration-300 font-semibold"
              onClick={() => navigate("/planner")}
            >
              {t("Start Planning")}
            </button>
            <button
              className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
              onClick={() => navigate("/chat")}
            >
              {t("Chat with AI Assistant")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
