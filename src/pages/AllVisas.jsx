import { useEffect, useState } from "react";
import VisaCard from "../components/VisaCard";
import { Select, Spinner, Button } from "flowbite-react";
import { FaFilter, FaSearch, FaSyncAlt } from "react-icons/fa";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [sortOption, setSortOption] = useState("");

  const visaTypes = [
    "All Visa Types",
    "Tourist Visa",
    "Business Visa",
    "Student Visa",
    "Work Visa",
    "Immigrant Visa",
  ];

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "processing-asc", label: "Processing: Fastest" },
  ];

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        setLoading(true);
        let url = `https://visa-master-server.vercel.app/visas`;

        // Build query parameters
        const params = new URLSearchParams();
        if (selectedVisaType && selectedVisaType !== "All Visa Types") {
          params.append("visa_type", selectedVisaType);
        }
        if (searchTerm) {
          params.append("search", searchTerm);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch visas");
        let data = await response.json();

        // Apply sorting
        if (sortOption) {
          data = sortVisas(data, sortOption);
        }

        setVisas(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setVisas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, [selectedVisaType, searchTerm, sortOption]);

  const sortVisas = (data, option) => {
    return [...data].sort((a, b) => {
      switch (option) {
        case "price-asc":
          return parseFloat(a.fee) - parseFloat(b.fee);
        case "price-desc":
          return parseFloat(b.fee) - parseFloat(a.fee);
        case "processing-asc":
          return a.proccessing_time.localeCompare(b.proccessing_time);
        default:
          return 0;
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedVisaType("");
    setSearchTerm("");
    setSortOption("");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Explore Visa Options
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the perfect visa for your travel needs from our comprehensive
            collection
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by country..."
                className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Visa Type Filter */}
            <div>
              <label
                htmlFor="visaType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Visa Type
              </label>
              <Select
                id="visaType"
                value={selectedVisaType}
                onChange={(e) => setSelectedVisaType(e.target.value)}
                className="w-full"
              >
                {visaTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            {/* Sort Options */}
            <div>
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Sort By
              </label>
              <Select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            {/* Reset Button */}
            <Button
              color="light"
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-2"
            >
              <FaSyncAlt />
              Reset
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size="xl" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {visas.length} {visas.length === 1 ? "visa" : "visas"}
            </p>
            {selectedVisaType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {selectedVisaType}
              </span>
            )}
          </div>
        )}

        {/* Visa Cards Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            !error &&
            visas.map((visa) => <VisaCard key={visa._id} visa={visa} />)}
        </div>

        {/* Empty State */}
        {!loading && !error && visas.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 mb-4 text-gray-400 dark:text-gray-500">
              <FaFilter size="100%" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No visas found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <Button
              color="light"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-2"
            >
              <FaSyncAlt />
              Reset all filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllVisas;
