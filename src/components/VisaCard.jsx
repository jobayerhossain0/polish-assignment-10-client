import { Button, Badge, Tooltip } from "flowbite-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import {
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUserAlt,
  FaGlobeAmericas,
  FaFileAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const VisaCard = ({ visa, onDeleteSuccess }) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";
  const isAllVisasPage = pathname === "/all-visas";

  const {
    _id,
    country_image,
    country_name,
    visa_type,
    proccessing_time,
    required_documents = [],
    description,
    age_restriction,
    fee,
    validity,
    application_method,
  } = visa;

  const handleDeleteVisa = () => {
    if (!window.confirm("Are you sure you want to delete this visa?")) return;

    fetch(`https://visa-master-server.vercel.app/visas/id/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Visa deleted successfully");
          if (onDeleteSuccess) onDeleteSuccess(_id);
        }
      })
      .catch((err) => {
        toast.error("Could not delete the visa");
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Country Image with Badge */}
      <div className="relative">
        <img
          src={country_image}
          alt={country_name}
          className="w-full h-48 object-cover"
        />
        <Badge color="indigo" className="absolute top-2 right-2 font-semibold">
          {visa_type}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {country_name}
          </h3>
          {age_restriction && (
            <Badge color="pink" className="flex items-center">
              <FaUserAlt className="mr-1" size={12} />
              {age_restriction}
            </Badge>
          )}
        </div>

        {/* Visa Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FaClock className="mr-2 text-blue-600 dark:text-blue-400" />
            <span>Processing: {proccessing_time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FaMoneyBillWave className="mr-2 text-green-600 dark:text-green-400" />
            <span>Fee: {fee}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FaCalendarAlt className="mr-2 text-purple-600 dark:text-purple-400" />
            <span>Validity: {validity}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FaGlobeAmericas className="mr-2 text-yellow-600 dark:text-yellow-400" />
            <span>Method: {application_method}</span>
          </div>
        </div>

        {/* Required Documents (Collapsible) */}
        {required_documents.length > 0 && (
          <div className="mb-4">
            <details className="group">
              <summary className="flex items-center cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaFileAlt className="mr-2 text-gray-500 dark:text-gray-400" />
                Required Documents
                <span className="ml-auto transition-transform group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </span>
              </summary>
              <ul className="mt-2 pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {required_documents.map((doc, index) => (
                  <li key={index} className="list-disc">
                    {doc}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col space-y-2">
          <Link to={`/visa/${_id}`}>
            <Button gradientDuoTone="purpleToBlue" className="w-full">
              View Details
            </Button>
          </Link>

          {user && !isHomePage && !isAllVisasPage && (
            <div className="grid grid-cols-2 gap-2">
              <Tooltip content="Edit Visa">
                <Link to={`/update-visa/${_id}`}>
                  <Button color="light" className="w-full">
                    <FaEdit className="mr-2" />
                    Edit
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip content="Delete Visa">
                <Button
                  onClick={handleDeleteVisa}
                  color="failure"
                  className="w-full"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
