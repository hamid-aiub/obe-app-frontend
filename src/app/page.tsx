"use client";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 w-full mt-4 pb-20 overflow-hidden py-8">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        className="max-w-5xl space-y-8 w-full z-10 text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
   

        <motion.h1 
          variants={itemVariants} 
          className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] text-balance mb-6"
        >
          Welcome to the OBE Platform
     
        </motion.h1>

      </motion.div>
    </div>
  );
}
