import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { motion } from "motion/react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <Sidebar />
      <main className="ml-64 pt-24 pb-12 px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
