import React from "react";
import { motion } from "framer-motion";

interface Props {
  t: (key: string) => string;
}

const HowItWorkSection: React.FC<Props> = ({t}) => {
  return (
    <>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              whileInView={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              {t("How TriVenture Works")}
            </motion.h2>
            <div className="w-24 h-1 rounded-full bg-primary-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: t("Tell Us Your Preferences"),
                description: t(
                  "Share your travel dates, interests, budget, and travel style."
                ),
              },
              {
                step: "2",
                title: t("Our AI Analyzes"),
                description: t(
                  "Our AI processes your preferences to find the perfect Vietnamese experiences."
                ),
              },
              {
                step: "3",
                title: t("Receive Recommendations"),
                description: t(
                  "Get personalized itineraries, accommodations, and attraction suggestions."
                ),
              },
              {
                step: "4",
                title: t("Travel with Confidence"),
                description: t(
                  "Enjoy your AI-optimized Vietnamese adventure with ongoing support."
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorkSection;
