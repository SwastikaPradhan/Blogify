import { Button } from "./ui/button";
import { ArrowRight, Coffee, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PiHandbagFill } from "react-icons/pi";

const Scale = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  whileInView: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
  viewport: { once: true },
};

const Hero = () => {
  return (
    <section className=" w-full py-2 md:py-24 lg:py-32 xl:py-38 relative select-none flex flex-col gap-20"
    >
      
      <div className="absolute top-6 left-6 flex items-center text-white text-2xl font-bold tracking-wide">
      <PiHandbagFill className="mr-2" /> Blogify
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center space-y-8"
      >
        <Link to="/signup" target="_blank">
          
        </Link>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-gray-200  text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto ">
          Unleash the Power of AI for Your Blog!
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
          Create engaging blog posts with the power of artificial intelligence. Transform your ideas into well-crafted articles in minutes.

          </p>
        </motion.div>
        <motion.div
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button
            className="w-full text-lg py-6 bg-white text-black hover:bg-gray-200 transition-colors group"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            <motion.div
              className="mr-2 h-5 w-5"
              initial={{ y: 0 }}
              whileHover={{ y: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap className="h-5 w-5 " />
            </motion.div>
            Sign Up Now – It’s Free!
          </Button>
          <p className="text-sm text-center text-gray-300">
           Let AI bring your ideas to life in minutes.
          </p>
        </motion.div>
        
      </motion.div>
      
      
    </section>
  );
};

export default Hero;
