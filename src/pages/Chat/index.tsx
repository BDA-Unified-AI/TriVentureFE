import ChatContent from "./ChatContent2";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "antd";
import ScheduleBoard from "../../components/Calendar/ScheduleBoard";
import useAppState from "../../components/Context/state";
import Planner from "../Planner";

const Chat = () => {
  const intent = useAppState((state) => state.intent);

  return (
    <Layout className="h-screen bg-slate-100">
      {/* Main Content */}
      <Layout className="relative bg-white">
        {/* Mobile Navigation */}
        <div className="fixed left-1/2 md:left-1/4 top-4 transform -translate-x-1/2 flex justify-between items-center w-1/2 md:w-1/6 p-1 rounded-xl overflow-hidden gap-1 z-10 bg-white shadow-md md:hidden">
          <AnimatePresence>
            {["Chat", "Search", "Planning"].map((item, index) => (
              <motion.div
                key={item}
                className={`text-sm py-2 px-4 rounded-lg grow flex justify-center cursor-pointer ${
                  index === 0
                    ? "bg-blue-500 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Chat Content */}
        <div className="flex-1 h-full ml-[72px]">
          <div className="md:grid md:grid-cols-2 h-full overflow-hidden">
            <div className="col-span-1 bg-white h-full relative z-10 pt-16 md:pt-4">
              <div className="h-full overflow-y-auto px-4">
                <ChatContent sessionId={"6d16c975e8b74d979d6d680e6ff536eb"} />
              </div>
            </div>
            <div className="hidden md:block col-span-1 max-h-svh overflow-y-auto bg-slate-50 border-l border-slate-200">
              {intent === "scheduling" && <ScheduleBoard />}
              {!intent && <Planner />}
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default Chat;
