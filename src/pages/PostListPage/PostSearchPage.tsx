import PostSearch from "../../components/Post/PostSearch";
import SearchBar from "../../components/SearchBar";

const PostSearchPage = () => {
  return (
    <div className="flex flex-col">
      <SearchBar />
      <PostSearch />
    </div>
  );
};

export default PostSearchPage;
