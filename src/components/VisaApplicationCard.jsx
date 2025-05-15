import {
  FaClock,
  FaMoneyBillWave,
  FaGlobe,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaPassport,
} from "react-icons/fa";
import { Badge } from "flowbite-react";

const VisaApplicationCard = ({ application }) => {
  const { visaInfo, firstName, lastName, email, fee, applied_date, status } =
    application;
  const statusColors = {
    pending: "yellow",
    approved: "green",
    rejected: "red",
    processing: "blue",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Header with status */}
      <div className="relative">
        <img
          src={visaInfo?.country_image}
          alt={visaInfo?.country_name}
          className="w-full h-40 object-cover"
        />
        <Badge
          color={statusColors[status] || "gray"}
          className="absolute top-2 right-2"
        >
          {status?.toUpperCase()}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {visaInfo?.country_name} - {visaInfo?.visa_type}
        </h3>

        {/* Application Details */}
        <div className="space-y-3">
          <div className="flex items-center">
            <FaUser className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {firstName} {lastName}
            </span>
          </div>

          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 break-all">
              {email}
            </span>
          </div>

          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              Applied on: {formatDate(applied_date)}
            </span>
          </div>
        </div>

        {/* Visa Details */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Visa Details
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <FaClock className="mr-2 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Processing
                </p>
                <p className="text-sm font-medium">
                  {visaInfo?.processing_time}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaMoneyBillWave className="mr-2 text-green-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fee</p>
                <p className="text-sm font-medium">${fee}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaGlobe className="mr-2 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Method
                </p>
                <p className="text-sm font-medium">
                  {visaInfo?.application_method}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaPassport className="mr-2 text-yellow-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                <p className="text-sm font-medium">{visaInfo?.visa_type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationCard;
