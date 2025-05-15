import {
  FaGlobe,
  FaClock,
  FaUserShield,
  FaHeadset,
  FaFileAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: <FaGlobe className="text-3xl text-blue-600" />,
      title: "Global Coverage",
      description:
        "Access visa information for countries worldwide with our comprehensive database.",
      delay: 0.1,
    },
    {
      icon: <FaClock className="text-3xl text-purple-600" />,
      title: "Fast Processing",
      description:
        "Get accurate processing time estimates to plan your travels efficiently.",
      delay: 0.2,
    },
    {
      icon: <FaUserShield className="text-3xl text-green-600" />,
      title: "Verified Information",
      description:
        "All our visa details are verified with official government sources.",
      delay: 0.3,
    },
    {
      icon: <FaHeadset className="text-3xl text-orange-600" />,
      title: "24/7 Support",
      description:
        "Our expert team is available round the clock to assist with your queries.",
      delay: 0.4,
    },
    {
      icon: <FaFileAlt className="text-3xl text-red-600" />,
      title: "Document Checklist",
      description:
        "Get personalized document requirements for your specific visa application.",
      delay: 0.5,
    },
    {
      icon: <FaMoneyBillWave className="text-3xl text-yellow-600" />,
      title: "Fee Calculator",
      description:
        "Estimate all costs associated with your visa application upfront.",
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose VisaMaster
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform offers everything you need for a seamless visa
            application experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 dark:bg-gray-700 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
