import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Spinner, Badge, Alert } from "flowbite-react";
import {
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUserAlt,
  FaFileAlt,
  FaGlobeAmericas,
  FaArrowLeft,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import ApplyVisaModal from "../components/ApplyVisaModal";
import { Link } from "react-router-dom";

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://visa-master-server.vercel.app/visas/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch visa details");
        }
        const data = await response.json();
        setVisa(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisaDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert color="failure">{error}</Alert>
      </div>
    );
  }

  if (!visa) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert color="info">Visa not found</Alert>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          to="/all-visas"
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to all visas
        </Link>

        {/* Visa Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-64 w-full">
            <img
              src={visa.country_image}
              alt={visa.country_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {visa.country_name}
                  </h1>
                  <Badge color="indigo" className="mt-2">
                    {visa.visa_type}
                  </Badge>
                </div>
                <Button
                  gradientDuoTone="purpleToBlue"
                  onClick={() => setOpenModal(true)}
                  className="hidden md:block"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Visa Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {visa.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Requirements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaClock className="mt-1 mr-3 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Processing Time
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {visa.proccessing_time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaMoneyBillWave className="mt-1 mr-3 text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Fee
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {visa.fee}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaUserAlt className="mt-1 mr-3 text-purple-600 dark:text-purple-400" />
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Age Restriction
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {visa.age_restriction || "No restrictions"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-3 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Validity
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {visa.validity} months
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaGlobeAmericas className="mt-1 mr-3 text-red-600 dark:text-red-400" />
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Application Method
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {visa.application_method}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                <HiOutlineDocumentText className="mr-2" />
                Required Documents
              </h2>
              <ul className="space-y-2">
                {Array.isArray(visa.required_documents) ? (
                  visa.required_documents.map((doc, index) => (
                    <li key={index} className="flex items-start">
                      <FaFileAlt className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {doc}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600 dark:text-gray-300">
                    No specific documents required
                  </li>
                )}
              </ul>
            </div>

            {/* Apply Button for Mobile */}
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => setOpenModal(true)}
              className="w-full md:hidden"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplyVisaModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        visa={visa}
      />
    </main>
  );
};

export default VisaDetails;
