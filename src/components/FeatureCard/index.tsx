import { motion } from "framer-motion";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: string;
  onClick?: () => void;
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  action,
  onClick,
}) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-primary-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="h-16"></div> {/* Space for the button */}
      {action && (
        <button
          onClick={onClick}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-300 transition-colors duration-300 absolute bottom-6 left-6"
        >
          {action}
        </button>
      )}
    </motion.div>
  );
};

export default Feature;
