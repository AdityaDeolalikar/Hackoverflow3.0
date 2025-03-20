import { motion } from 'framer-motion';
import { useRef } from 'react';

const KeyFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const featuresContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const featureCardVariantsLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const featureCardVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="py-20 px-4 md:px-8 bg-white" ref={containerRef}>
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        Key Features
      </motion.h1>
      <motion.h2 
        className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-gray-700 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        Intelligent Tools for Sustainable Solutions
      </motion.h2>
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={featuresContainerVariants}
      >
        
        {/* AI-Powered Reforestation */}
        <motion.div 
          className="p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          variants={featureCardVariantsLeft}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
            <svg 
              className="w-8 h-8 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">
            AI-Powered Reforestation
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Hyper-Local Tree Selection:</span>
                <span className="text-gray-600"> Optimal species based on your location.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Dynamic Planting Patterns:</span>
                <span className="text-gray-600"> Maximizing carbon capture.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Predictive Carbon Modeling:</span>
                <span className="text-gray-600"> Long-term sustainability.</span>
              </div>
            </li>
          </ul>
        </motion.div>
        
        {/* Smart Water Management */}
        <motion.div 
          className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          variants={featureCardVariantsRight}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
            <svg 
              className="w-8 h-8 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">
            Smart Water Management
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Real-Time Soil Monitoring:</span>
                <span className="text-gray-600"> Precise irrigation.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Automated Irrigation Schedules:</span>
                <span className="text-gray-600"> Water conservation.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Rainwater Harvesting:</span>
                <span className="text-gray-600"> Sustainable water use.</span>
              </div>
            </li>
          </ul>
        </motion.div>
        
        {/* Agricultural Support */}
        <motion.div 
          className="p-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          variants={featureCardVariantsLeft}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
            <svg 
              className="w-8 h-8 text-amber-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">
            Agricultural Support
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">AI Crop Suitability:</span>
                <span className="text-gray-600"> Optimal crop recommendations.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Crop Rotation Guidance:</span>
                <span className="text-gray-600"> Sustainable farming.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Community Engagement:</span>
                <span className="text-gray-600"> Knowledge sharing.</span>
              </div>
            </li>
          </ul>
        </motion.div>
        
        {/* Data & Analytics */}
        <motion.div 
          className="p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          variants={featureCardVariantsRight}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
            <svg 
              className="w-8 h-8 text-purple-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">
            Data & Analytics
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">GIS Mapping:</span>
                <span className="text-gray-600"> Visual resource management.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Automated Dashboards:</span>
                <span className="text-gray-600"> Real-time insights.</span>
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Open API:</span>
                <span className="text-gray-600"> Data sharing and collaboration.</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
