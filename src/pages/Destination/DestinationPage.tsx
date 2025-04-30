import Destination from "./index";
import PostHotel from "../../components/Hotel/PostHotel";
// import PostFood from "../../components/Food/PostFood";
import SearchBar from "../../components/SearchBar";
const DestinationPage = () => {
  return (
    <>
      <SearchBar />
      <Destination />
      {/* <PostFood /> */}
      <PostHotel />
    </>
  );
};

export default DestinationPage;
