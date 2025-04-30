import PostFood from "../../components/Food/PostFood";
import { motion } from "framer-motion";

const FoodPage = () => {
  return (
    <>
      <div className="px-6 py-8 md:px-8 md:py-12 text-center rounded-b-xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl text-black font-medium font-roboto"
        >
          Food and Beverage
        </motion.h1>
      </div>
      <PostFood />
    </>
  );
};

export default FoodPage;
