import React from "react";
import { Card } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton: React.FC<{ count?: number }> = ({ count = 2 }) => {
  return (
    <div className="container mx-auto p-5 flex flex-col-reverse items-center">
      {[...Array(count)].map((_, index) => (
        <Card
          key={index}
          className="w-full max-w-2xl mx-auto rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white mb-5 overflow-hidden border border-gray-100"
          bodyStyle={{ padding: "24px" }}
        >
          {/* Header Section */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-start space-x-3 flex-1">
              <Skeleton height={40} width={40} circle={true} />
              <div className="flex flex-col min-w-0">
                <Skeleton height={20} width={150} />
                <div className="flex items-center space-x-2 mt-0.5">
                  <Skeleton height={16} width={100} />
                  <Skeleton height={16} width={80} />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="my-4">
            <Skeleton height={20} width="100%" count={3} />
          </div>

          {/* Images Section */}
          <div className="my-4">
            <div className="grid grid-cols-3 gap-2">
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-100 my-3"></div>

          {/* Actions Section */}
          <div className="flex items-center justify-between pt-1">
            <Skeleton height={40} width={120} />
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            <Skeleton height={40} width={120} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostSkeleton;
