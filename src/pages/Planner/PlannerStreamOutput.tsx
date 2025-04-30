import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  RocketOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

interface IProps {
  streamData: string;
  currentStep: number;
}

const PlannerStreamOutput: React.FC<IProps> = ({ streamData, currentStep }) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [streamData]);

  return (
    <>
      {streamData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center">
            {currentStep === 4 ? (
              <>
                <CheckCircleOutlined className="mr-2" />
                {t("planner.step.ready")}
              </>
            ) : (
              <>
                <RocketOutlined className="mr-2" spin />
                {t("planner.step.processing")}
                <LoadingOutlined className="ml-2" spin />
              </>
            )}
          </h2>
          <div
            ref={scrollRef}
            className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100 rounded-xl shadow-inner"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="prose max-w-none p-6 bg-gradient-to-br from-white to-indigo-50 rounded-lg border border-indigo-100 shadow-sm"
            >
              {streamData ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    a: ({ ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:text-indigo-700 underline transition-colors duration-200"
                      />
                    ),
                    h1: ({ ...props }) => (
                      <h1 {...props} className="text-indigo-700 font-bold" />
                    ),
                    h2: ({ ...props }) => (
                      <h2 {...props} className="text-indigo-600 font-bold" />
                    ),
                    p: ({ ...props }) => (
                      <p {...props} className="text-gray-700 leading-relaxed" />
                    ),
                    ul: ({ ...props }) => (
                      <ul {...props} className="list-disc pl-5 space-y-2" />
                    ),
                    li: ({ ...props }) => (
                      <li {...props} className="text-gray-700" />
                    ),
                  }}
                >
                  {streamData}
                </ReactMarkdown>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <RocketOutlined
                    className="text-5xl text-indigo-400 mb-4"
                    spin
                  />
                  <p className="text-indigo-500 font-medium text-lg">
                    {t("planner.step.processing.desc")}
                  </p>
                  <p className="text-gray-500 mt-2">
                    {t("planner.form.submit")} to start your adventure!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PlannerStreamOutput;
