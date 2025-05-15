import { useEffect, useState } from "react";
import VisaCard from "./VisaCard";
import { Spinner, Alert, Button } from "flowbite-react";
import { FaArrowRight, FaSyncAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const LatestVisas = ({ limit = 6 }) => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatestVisas = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://visa-master-server.vercel.app/visas?limit=${limit}&sort=-createdAt`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch latest visas");
      }

      const data = await response.json();
      setVisas(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestVisas();
  }, [limit]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Latest Visa Opportunities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the newest visa options available
            </p>
          </div>
          <Link to="/all-visas">
            <Button gradientDuoTone="purpleToBlue">
              View All Visas
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size="xl" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center py-12">
            <Alert color="failure" className="mb-4 max-w-md">
              {error}
            </Alert>
            <Button onClick={fetchLatestVisas} color="light">
              <FaSyncAlt className="mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Visa Cards Grid */}
        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visas.length > 0 ? (
              visas.map((visa) => (
                <VisaCard
                  key={visa._id}
                  visa={visa}
                  className="hover:scale-[1.02] transition-transform duration-200"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No visas available at the moment
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestVisas;
