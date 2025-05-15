import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaSadTear } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            }}
            className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-6"
          >
            404
          </motion.div>
          <FaSadTear className="absolute top-0 right-0 text-4xl text-yellow-500 transform -translate-y-1/2" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaHome className="mr-2" />
            Return to Homepage
          </Link>
        </motion.div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Need help? Contact our support team</p>
          <a
            href="mailto:support@visamaster.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@visamaster.com
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default ErrorPage;
