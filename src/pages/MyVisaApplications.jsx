import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {
  Button,
  TextInput,
  Spinner,
  Alert,
  Select,
  Badge,
} from "flowbite-react";
import VisaApplicationCard from "../components/VisaApplicationCard";
import { FaSearch, FaFileAlt, FaFilter } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import toast from "react-hot-toast";

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "processing", label: "Processing" },
  ];

  // Fetch visa applications
  const fetchApplications = async (query = "", status = "all") => {
    try {
      setLoading(true);
      let url = `https://visa-master-server.vercel.app/visa-applications/${user?.email}`;

      const params = new URLSearchParams();
      if (query.trim()) params.append("country_name", query.trim());
      if (status !== "all") params.append("status", status);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchApplications(searchQuery, statusFilter);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    fetchApplications();
  };

  const getApplicationCountByStatus = (status) => {
    return applications.filter((app) => app.status === status).length;
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            My Visa Applications
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track and manage all your visa applications in one place
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <TextInput
                type="text"
                placeholder="Search by country..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                icon={FaFilter}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
                className="flex-1"
              >
                <FaSearch className="mr-2" />
                Search
              </Button>
              <Button
                color="light"
                onClick={handleResetFilters}
                className="flex items-center justify-center"
              >
                <HiOutlineRefresh />
              </Button>
            </div>
          </form>
        </div>

        {/* Status Summary */}
        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">Total</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                {applications.length}
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Pending
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                {getApplicationCountByStatus("pending")}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                Approved
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                {getApplicationCountByStatus("approved")}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-200">Rejected</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-300">
                {getApplicationCountByStatus("rejected")}
              </p>
            </div>
          </div>
        )}

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
        {!loading && !error && applications.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4 text-gray-400 dark:text-gray-500">
              <FaFileAlt size={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Visa Applications Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search filters"
                : "You haven't applied for any visas yet"}
            </p>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={handleResetFilters}
              className="mx-auto"
            >
              {searchQuery || statusFilter !== "all"
                ? "Reset Filters"
                : "Browse Visas"}
            </Button>
          </div>
        )}

        {/* Applications Grid */}
        {!loading && !error && applications.length > 0 && (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {applications.map((application) => (
              <VisaApplicationCard
                key={application._id}
                application={application}
                onStatusChange={() =>
                  fetchApplications(searchQuery, statusFilter)
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyVisaApplications;
