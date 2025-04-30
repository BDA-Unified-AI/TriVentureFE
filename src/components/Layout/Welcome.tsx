import { motion } from "framer-motion";

interface WelcomeProps {
  userInfo: { name: string } | null;
}

const Welcome: React.FC<WelcomeProps> = ({ userInfo }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-right mb-6 mr-4"
    >
      <div className="text-2xl font-semibold text-gray-600 mb-2 mt-3">
        🌟 Welcome!
      </div>
      <div
        className={`text-3xl font-extrabold bg-clip-text ${
          userInfo
            ? "text-transparent bg-gradient-to-r from-green-400 to-teal-400"
            : "text-purple-500"
        }`}
      >
        {userInfo?.name || "Guest"}
      </div>
    </motion.div>
  );
};

export default Welcome;
