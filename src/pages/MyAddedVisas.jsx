import { useContext, useEffect, useState } from "react";
import VisaCard from "../components/VisaCard";
import { AuthContext } from "../provider/AuthProvider";
import { Spinner, Alert, Button } from "flowbite-react";
import { FaPlus, FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyVisas = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://visa-master-server.vercel.app/visas/${user?.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch your visas");
        }
        const data = await response.json();
        setVisas(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVisas();
  }, [user?.email]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            My Added Visas
          </h1>
          <Link to="/add-visa">
            <Button gradientDuoTone="purpleToBlue">
              <FaPlus className="mr-2" />
              Add New Visa
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
          <Alert color="failure" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Empty State */}
        {!loading && !error && visas.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaSadTear className="text-5xl text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Visas Added Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You haven't added any visas yet. Start by adding your first visa
              option.
            </p>
            <Link to="/add-visa">
              <Button gradientDuoTone="purpleToBlue">
                <FaPlus className="mr-2" />
                Add Your First Visa
              </Button>
            </Link>
          </div>
        )}

        {/* Visa Cards Grid */}
        {!loading && !error && visas.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {visas.length} {visas.length === 1 ? "visa" : "visas"}
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visas.map((visa) => (
                <VisaCard key={visa._id} visa={visa} showActions={true} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MyAddedVisas;
