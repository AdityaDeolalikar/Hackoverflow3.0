import { motion } from 'framer-motion';
import { useRef } from 'react';

const KeyFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
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

  const featureRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      title: "Microclimate Engineering",
      description: "Use shade trees to regulate temperature, enhance water retention, and improve seedling survival.",
      image: "/images/reforestation.jpg",
      video: "/videos/video1.mp4",
      color: "green",
    },
    {
      title: "Integrated Water Management",
      description: "Smart irrigation systems optimize water use based on real-time soil and weather data.",
      image: "/images/agriculture.jpg",
      video: "/videos/video3.mp4",
      color: "amber",
    },
    {
      title: "AI-Driven Tree Selection",
      description: "Analyze environmental data to identify optimal tree species for planting.",
      image: "/images/agriculture.jpg",
      video: "/videos/video4.mp4",
      color: "purple",
    },
    {
      title: "Monitoring and Reporting",
      description: "Track tree growth, health, and ecosystem recovery with automated insights.",
      image: "/images/agriculture.jpg",
      video: "/videos/video5.mp4",
      color: "blue",
    },
    {
      title: "Community Engagement", 
      description: "Empower locals with educational resources and participatory activities for restoration.",
      image: "/images/agriculture.jpg",
      video: "/videos/video6.mp4",
      color: "orange",
    },
    {
      title: "Data Analytics",
      description: "Continuously refine strategies using growth, biodiversity, and ecosystem service data.",
      image: "/images/agriculture.jpg",
      video: "/videos/video2.mp4",
      color: "indigo",
    }
  ];

  return (
    <div className="py-20 px-2 md:px-8 bg-white" ref={containerRef}>
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
        className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-gray-700 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        Intelligent Tools for Sustainable Solutions
      </motion.h2>

      <div className="max-w-[90rem] mx-auto space-y-8">
        {features.map((feature) => (
          <motion.div 
            key={feature.title}
            className="w-full h-48 md:h-56 lg:h-64 relative rounded-xl overflow-hidden border border-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureRowVariants}
          >
            {/* Background Video */}
            <div className="w-full h-full absolute inset-0">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src={feature.video}
              />
              
              {/* Fallback background image when video fails to load */}
              {feature.image && (
                <div 
                  className="w-full h-full absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: `url(${feature.image})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.opacity = '1';
                  }}
                >
                </div>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}-600/80 to-${feature.color}-900/80`}></div>

            {/* Content */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              variants={featureItemVariants}
            >
              <div className="w-full md:w-3/4 lg:w-2/3 p-6 md:p-8 lg:p-10 text-white text-center">
                <div className="mb-4 h-1 w-16 bg-white mx-auto"></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-100 mb-6">
                  {feature.description}
                </p>

              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
