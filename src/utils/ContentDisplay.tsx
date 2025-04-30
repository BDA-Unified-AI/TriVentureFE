import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContentDisplay: React.FC<{ content: string }> = ({ content }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;
  const shouldShowMore = content.length > maxLength;

  const displayText = isExpanded ? content : content.slice(0, maxLength);

  return (
    <div className="mt-2 text-sm md:text-base text-gray-700">
      <p className="whitespace-pre-wrap">
        {displayText}
        {!isExpanded && shouldShowMore && "..."}
      </p>
      {shouldShowMore && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-1"
          >
            {isExpanded ? t("show less") : t("see more")}
          </button>
        </div>
      )}
    </div>
  );
};
export default ContentDisplay;
