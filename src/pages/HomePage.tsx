import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CheckCircle, MapPin, DollarSign, Calendar, ArrowDown } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';


const HomePage: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
    const images = [
    "https://media.istockphoto.com/id/511119416/photo/indian-landmark-gadi-sagar-in-rajasthan.jpg?s=612x612&w=0&k=20&c=dO7TbXh3sd6_QmgcF_nYi6ynyIAvPI5STavwzCDyWTI=",
    "https://images.pexels.com/photos/3155639/pexels-photo-3155639.jpeg?auto=compress&cs=tinysrgb&w=1600", // Kerala
    "https://images.unsplash.com/photo-1564329494258-3f72215ba175?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhJTIwdG91cmlzbXxlbnwwfHwwfHx8MA%3D%3D", // Ladakh
    "https://media.istockphoto.com/id/1067678216/photo/snow-mountain-view-of-leh-ladakh-district-norther-part-of-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=XI7oArfGutM7WZ4eHgrZfsshb26Gd0j7rReZjIWnB4o=", // Jaipur
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <section className="relative h-screen flex items-center">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${images[currentImageIndex]})`
          }}
        >

        
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore India's Beauty With Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your ultimate travel companion for discovering the wonders of India - from the snowy peaks of Ladakh to the serene backwaters of Kerala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/checklist" className="btn btn-primary text-base">
                Start Planning
              </NavLink>
              <button 
                onClick={scrollToFeatures}
                className="btn btn-outline border-white text-white hover:bg-white hover:bg-opacity-10 text-base"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={scrollToFeatures}
        >
          <ArrowDown size={30} />
        </motion.div>
      </section>

      <section ref={featuresRef} className="section bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Plan Your Journey with Ease
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              RoamReady provides all the tools you need to make your Indian adventure memorable and stress-free.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="card p-6 text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={30} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Packing Checklist</h3>
              <p className="text-gray-600 dark:text-gray-400">Never forget essentials with our smart, categorized packing lists</p>
              <NavLink to="/checklist" className="inline-block mt-4 text-primary-600 dark:text-primary-400 hover:underline">
                Create Your List
              </NavLink>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card p-6 text-center">
              <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={30} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Destination Explorer</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover incredible Indian destinations with helpful filters</p>
              <NavLink to="/destinations" className="inline-block mt-4 text-secondary-600 dark:text-secondary-400 hover:underline">
                Explore Destinations
              </NavLink>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card p-6 text-center">
              <div className="bg-accent-100 dark:bg-accent-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign size={30} className="text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Currency Converter</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick and easy currency conversion for your travel budget</p>
              <NavLink to="/converter" className="inline-block mt-4 text-accent-600 dark:text-accent-400 hover:underline">
                Convert Currency
              </NavLink>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card p-6 text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar size={30} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trip Planner</h3>
              <p className="text-gray-600 dark:text-gray-400">Organize your daily activities with our interactive planner</p>
              <NavLink to="/planner" className="inline-block mt-4 text-primary-600 dark:text-primary-400 hover:underline">
                Plan Your Trip
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              What Travelers Say
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of happy travelers who have simplified their journey with RoamReady.
            </motion.p>
          </motion.div>
          
          <TestimonialCarousel />
        </div>
      </section>
      
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Begin planning your dream Indian journey today with our comprehensive travel tools.
            </p>
            <NavLink to="/checklist" className="btn bg-white text-primary-600 hover:bg-primary-50 text-base">
              Get Started Now
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;