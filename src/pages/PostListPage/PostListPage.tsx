import PostList from "../../components/Post/PostList.tsx";
import PostLayout from "../../components/Post/PostLayout";

const PostListPage = () => {
  return (
    <PostLayout>
      <div className="flex flex-col gap-6">
        <PostList />
      </div>
    </PostLayout>
  );
};

export default PostListPage;
