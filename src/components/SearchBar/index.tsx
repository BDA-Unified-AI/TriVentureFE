import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { notification, Spin } from "antd";
import {
  DestinationSearchResult,
  destinationSuggestions,
} from "../../apis/dest";
import SearchItem from "./SearchItem";
import { FaMapMarkerAlt } from "react-icons/fa";
import useAppState from "../Context/state";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DestinationSearchResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [lastSearchTime, setLastSearchTime] = useState(0);
  const userInfo = useAppState((state) => state.userInfo);
  const { t } = useTranslation();
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside of search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce configuration - 1 second in milliseconds
  const DEBOUNCE_DELAY = 1000; // 1000ms = 1 second

  const placeholders = [
    t("search.placeholder.1"),
    t("search.placeholder.2"),
    t("search.placeholder.3"),
    t("search.placeholder.4"),
    t("search.placeholder.5"),
    t("search.placeholder.6"),
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if search query is empty
    if (searchQuery.trim() === "") {
      notification.warning({
        message: t("Oops!"),
        description: t("Please enter a destination to start your journey."),
        placement: "top",
      });
      return;
    }

    // Implement debounce
    const currentTime = Date.now();

    // Allow first search to proceed immediately
    if (lastSearchTime === 0) {
      setLastSearchTime(currentTime);
    } else {
      const timeSinceLastSearch = currentTime - lastSearchTime;
      if (timeSinceLastSearch < DEBOUNCE_DELAY) {
        const remainingTime = Math.ceil(
          (DEBOUNCE_DELAY - timeSinceLastSearch) / 1000
        );
        notification.info({
          message: t("Please wait"),
          description: t(
            `Please wait ${remainingTime} second${
              remainingTime > 1 ? "s" : ""
            } before searching again.`
          ),
          placement: "top",
        });
        return;
      }
      setLastSearchTime(currentTime);
    }

    setIsLoading(true);
    setIsFocused(true);

    try {
      const response = await destinationSuggestions(
        searchQuery,
        userInfo?.id || null,
        5
      );
      setSearchResults(response);

      if (response.length === 0) {
        notification.info({
          message: t("No destinations found"),
          description: t("Try another search term or explore our categories."),
          placement: "top",
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        notification.warning({
          message: t("Invalid Search"),
          description: t("Please provide a travel-related search query."),
          placement: "top",
        });
      } else {
        notification.error({
          message: t("Something went wrong"),
          description: t("We couldn't complete your search. Please try again."),
          placement: "top",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 4000); // Changed to 4 seconds for more dynamic feel

    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <div className="relative container mx-auto mt-2 md:mt-8 px-2 md:px-0">
      {/* Backdrop */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 backdrop-blur-sm transition-all duration-300"
          onClick={() => {
            setIsFocused(false);
            setSearchResults([]);
          }}
        ></motion.div>
      )}

      <div
        className={`relative z-20 transition-all duration-300 ${
          isFocused ? "scale-100 md:scale-105" : ""
        }`}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsFocused(false)}
          className="text-xl md:text-4xl text-center font-bold font-roboto mb-1 md:mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          {t("where to go")}
        </motion.h1>

        {/* Categories */}

        {/* Search Form */}
        <div className="flex justify-center px-1 md:px-0">
          <form
            onSubmit={handleSearch}
            className={`flex items-center rounded-full border p-0.5 md:p-1.5 mb-3 md:mb-4 w-full md:w-4/5 max-w-2xl transition duration-300 ${
              isFocused
                ? "ring-2 ring-blue-400 shadow-lg"
                : "shadow-md hover:shadow-lg"
            }`}
            style={{
              background: "linear-gradient(to right, #ffffff, #f8faff)",
              borderColor: isFocused ? "#3b82f6" : "#e5e7eb",
            }}
          >
            <div className="flex gap-1 md:gap-3 items-center flex-grow ml-1.5 md:ml-3">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="text-lg md:text-2xl p-1 md:p-1.5 rounded-full bg-blue-50 text-blue-500"
              >
                <CiSearch />
              </motion.div>
              <div className="relative flex-grow">
                <input
                  className="w-full focus:outline-none text-gray-700 py-1 md:py-2 text-sm md:text-base bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!isLoading) {
                        // Prevent search while loading
                        handleSearch(e);
                      }
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  placeholder=""
                  aria-label={t("Search destinations")}
                  role="searchbox"
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPlaceholder}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute left-0 top-0 pointer-events-none text-gray-600 py-1 md:py-2 text-sm md:text-base"
                  >
                    {searchQuery ? "" : placeholders[currentPlaceholder]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-2 md:px-5 py-1 md:py-2.5 shadow-md text-white rounded-full transition duration-200 font-medium text-xs md:text-base ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-1 md:gap-2">
                  <Spin size="small" />
                  <span className="hidden md:inline">{t("searching")}</span>
                </div>
              ) : (
                t("search")
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`relative z-20 mt-1 md:mt-3 p-2 md:p-5 rounded-xl transition-all duration-300 ease-in-out max-w-2xl mx-auto ${
            isFocused ? "ring-1 ring-blue-200 shadow-lg" : "shadow-md"
          }`}
          style={{
            background: "linear-gradient(to bottom, #ffffff, #f8faff)",
            borderTop: "3px solid #3b82f6",
          }}
        >
          <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
            <FaMapMarkerAlt className="text-blue-500 text-sm md:text-base" />
            <h2 className="text-sm md:text-lg font-bold text-gray-800">
              {t("Search results:")}
            </h2>
          </div>
          <ul className="divide-y divide-gray-100 max-h-[65vh] md:max-h-[50vh] overflow-auto">
            {searchResults.map((result, index) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={index}
                className="py-1.5 md:py-3 px-1 md:px-2 hover:bg-blue-50 rounded-md transition duration-200 ease-in-out cursor-pointer"
              >
                <SearchItem {...result} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
