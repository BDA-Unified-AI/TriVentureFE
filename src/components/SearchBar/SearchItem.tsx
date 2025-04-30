import React from "react";
import { DestinationSearchResult } from "../../apis/dest";
import { FaMapLocationDot } from "react-icons/fa6";

const SearchItem: React.FC<DestinationSearchResult> = (item) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
          {item.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-gray-700 font-medium">{item.name}</div>
            {item.map_url && (
              <a
                className="text-sm text-blue-500 hover:to-blue-900"
                href={item.map_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapLocationDot />
              </a>
            )}
          </div>
          {item.distance_km && (
            <span className="text-gray-400">{item.distance_km}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchItem;
