import React from 'react';
import PostCard from '../../components/Post/PostCard';
import PostLayout from '../../components/Post/PostLayout';
import { Post } from '../../components/Post/types';

interface PostPageProps {
  posts: Post[];
}

const PostPage: React.FC<PostPageProps> = ({ posts }) => {
  return (
    <PostLayout>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PostLayout>
  );
};

export default PostPage; 