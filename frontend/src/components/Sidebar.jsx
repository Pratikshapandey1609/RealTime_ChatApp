import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, Bell, MessageSquareIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useThemeStore } from "../store/useThemeStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, link: "/" },
    { name: "Friends", icon: <Users size={22} />, link: "/friend" },
    { name: "Notifications", icon: <Bell size={22} />, link: "/notification" },
    {name : "Chats" , icon : <MessageSquareIcon size={22}/> ,link : "/chat"},
  ];

  const {authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const {theme} =  useThemeStore();
  console.log(currentPath)

  return (
    <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      animate={{ width: isOpen ? 200 : 70 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="h-screen fixed top-0 left-0 z-50 flex flex-col justify-between
        bg-base-200 backdrop-blur-md border-r border-cyan-600/30
        shadow-xl p-4"  data-theme = {theme}
    >
      {/* TOP: LOGO + MENU */}
      <div>
        {/* LOGO */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={false}
          animate={{ justifyContent: isOpen ? "flex-start" : "center" }}
        >
          <div className="p-2 rounded-full bg-base-200 shadow-lg">
            <Home className="text-white" size={24} />
          </div>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-bold text-cyan-200"
            >
              SpeakEasy
            </motion.span>
          )}
        </motion.div>

        {/* MENU ITEMS */}
        <nav className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <motion.div
                className="flex items-center gap-3 cursor-pointer 
                  text-gray-300 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/70 transition-colors">
                  {item.icon}
                </div>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="text-lg font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* USER : PROFILE */}
      <motion.div
        className="flex items-center gap-3 mt-8 cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        {/* Avatar with online/offline indicator */}
        <div className="relative">
          <img
            src= {authUser?.profilePic} 
            alt = "User Avatar"
            className="w-10 h-10 rounded-full border-2 border-cyan-500"
          />
          {/* Online/offline dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <span className="text-sm font-medium text-gray-200">
              {authUser?.fullName}
            </span>
            <span className="text-xs text-gray-400">Online</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
