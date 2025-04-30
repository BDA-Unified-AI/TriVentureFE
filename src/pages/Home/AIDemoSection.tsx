import React from "react";
import { motion } from "framer-motion";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";

interface Props {
  t: TFunction<"translation", undefined>;
  navigate: (path: string) => void;
}

const AIDemoSection: React.FC<Props> = ({ t, navigate }) => {
  return (
    <>
      <div className="bg-gradient-to-r from-primary- to-primary-300 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-primary-600 rounded-xl">
            <div className="md:w-1/2">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    TriVenture AI
                  </h3>
                </div>
                <div className="mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg mb-3 max-w-xs">
                    {t(
                      "I'd like to explore Vietnam for 10 days. I enjoy cultural experiences and beautiful landscapes, but I'm not very into crowded tourist spots."
                    )}
                  </div>
                  <div className="bg-primary-600 p-3 rounded-lg mb-3 ml-auto max-w-xs text-white">
                    {t(
                      "Based on your preferences, I'd recommend a journey through Northern Vietnam, including Hanoi, Ninh Binh, and Sapa. Would you prefer starting in Hanoi or Ho Chi Minh City?"
                    )}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg mb-3 max-w-xs">
                    {t(
                      "Hanoi sounds good! I'd love to see some natural landscapes too."
                    )}
                  </div>
                  <div className="bg-primary-600 p-3 rounded-lg ml-auto max-w-xs text-white">
                    {t(
                      "Perfect! I'll include Ha Long Bay and Tam Coc in your itinerary. These offer stunning limestone formations and peaceful boat rides through rice fields."
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <Link
                    to="/schedule"
                    className="rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-xl"
                  >
                    Lập Kế Hoạch Chuyến Đi
                  </Link>
                  <Link
                    to="/chat"
                    className="rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-800 hover:shadow-xl"
                  >
                    Khám Phá Công Cụ AI Của Chúng Tôi
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
                  {t("Experience Our AI in Action")}
                </h2>
                <p className="text-lg mb-6">
                  {t(
                    "Our intelligent travel assistant understands your preferences and provides personalized recommendations for your Vietnamese adventure."
                  )}
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    t("Get instant answers to your travel questions"),
                    t("Receive personalized itinerary suggestions"),
                    t("Discover hidden gems based on your interests"),
                    t("Learn about local customs and cultural insights"),
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="px-6 py-3 bg-white text-primary-500 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
                    onClick={() => navigate("/planner")}
                  >
                    {t("Create Your Itinerary")}
                  </button>
                  <button
                    className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300 font-semibold"
                    onClick={() => navigate("/visual-search")}
                  >
                    {t("Try Visual Search")}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIDemoSection;
