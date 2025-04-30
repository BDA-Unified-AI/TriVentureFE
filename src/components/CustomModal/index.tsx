import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Destination {
  name: string;
  image: string;
  description: string;
  tag: string;
}
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Destination | null;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, data }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          exit={{ opacity: 0.8, scale: 1.1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
          >
            <div className="relative">
              <img
                src={data?.image}
                alt={data?.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-0 left-0 font-bold text-3xl text-left p-2">
                <div className="text-white">{data?.name}</div>
              </div>
              <div className="p-2">{data?.description}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
