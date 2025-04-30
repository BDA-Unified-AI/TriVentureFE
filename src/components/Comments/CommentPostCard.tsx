import { Avatar, Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { timeAgo } from "../../utils/timeAgo";
import { Post } from "../Post/types";
import { Navigation, Thumbs } from "swiper/modules";

interface PostCardProps {
  post: Post;
  thumbsSwiper: any;
  setThumbsSwiper: React.Dispatch<React.SetStateAction<any>>;
}

const CommentPostCard: React.FC<PostCardProps> = ({
  post,
  thumbsSwiper,
  setThumbsSwiper,
}) => {
  return (
    <Card bordered={false} className="shadow-lg rounded-lg p-4 bg-white">
      <Meta
        avatar={<Avatar src={post.user_info?.picture} />}
        title={
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">
              {post.user_info?.name}
            </span>
            <span className="text-sm text-gray-500">
              {timeAgo(post.created_at)}
            </span>
          </div>
        }
        description={<p className="mt-2 text-gray-700">{post.content}</p>}
      />

      {post.picture && (
        <div className="mt-2">
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-lg "
          >
            {post.picture.map((pic, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center w-full h-[400px] rounded-lg">
                  <Image
                    src={pic}
                    className="max-h-[380px] object-contain rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {post.picture.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView={Math.min(post.picture.length, 5)}
              spaceBetween={10}
              watchSlidesProgress
              className="mt-2"
            >
              {post.picture.map((pic, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <Image
                    src={pic}
                    width={70}
                    height={70}
                    className="object-cover rounded-md border-2 border-transparent hover:border-blue-500 transition duration-200"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}
    </Card>
  );
};

export default CommentPostCard;
