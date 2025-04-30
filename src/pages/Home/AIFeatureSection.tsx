import React, { useState } from "react";
import { motion } from "framer-motion";
import Feature from "../../components/FeatureCard";
import { TFunction } from "i18next";
import { RefObject } from "@fullcalendar/core/preact.js";
import VisualSearchModal from "../../components/VisualSearchModal";

interface Props {
  t: TFunction<"translation", undefined>;
  navigate: (path: string) => void;
  featuresRef: RefObject<HTMLDivElement>;
}

const AIFeatureSection: React.FC<Props> = ({ t, navigate, featuresRef }) => {
  const [isVisualSearchModalOpen, setIsVisualSearchModalOpen] = useState(false);

  return (
    <>
      {" "}
      <div ref={featuresRef} className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            whileInView={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            {t("Our AI-Powered Travel Tools")}
          </motion.h2>
          <div className="w-24 h-1 rounded-full bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "Discover how our intelligent travel assistant can help you plan the perfect Vietnamese adventure"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            }
            title={t("AI Travel Assistant")}
            description={t(
              "Chat with our AI to get personalized recommendations, answer questions about Vietnamese culture, and solve any travel concerns."
            )}
            action={t("Chat Now")}
            onClick={() => navigate("/chat")}
          />
          <Feature
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            }
            title={t("AI Itinerary Planner")}
            description={t(
              "Input your preferences, travel dates, and interests to receive a custom Vietnam itinerary optimized for your unique travel style."
            )}
            action={t("Plan Itinerary")}
            onClick={() => navigate("/planner")}
          />
          <Feature
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            title={t("Visual Discovery")}
            description={t(
              "Upload an image or describe a place, and our AI will identify Vietnamese destinations that match your vision."
            )}
            action={t("Try Visual Search")}
            onClick={() => setIsVisualSearchModalOpen(true)}
          />
        </div>
      </div>

      <VisualSearchModal
        isOpen={isVisualSearchModalOpen}
        onClose={() => setIsVisualSearchModalOpen(false)}
      />
    </>
  );
};

export default AIFeatureSection;
