import React, { useRef, useState, useEffect } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faFilter,
  faTimes,
  faStar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([
    "Web Development",
    "Machine Learning",
    "Graphic Design",
    "Digital Marketing",
    "Print Design",
    "Mobile Development",
    "UI Design",
    "Data Analysis"
  ]);
  
  const [availableTags, setAvailableTags] = useState([
    "Responsive",
    "E-commerce",
    "Landing Page",
    "Logo Design",
    "UI/UX",
    "WordPress",
    "SEO",
    "AI Integration",
    "ChatBot",
    "Web App",
    "Portfolio"
  ]);
  const [filters, setFilters] = useState({
    category: "", 
    tags: [],
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const minRef = useRef();
  const maxRef = useRef();
  const searchRef = useRef();

  // Fetch gigs when component mounts or filters change
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        let response;

        // Check if we're filtering by budget
        // Within your useEffect's try block:
        if (filters.minPrice || filters.maxPrice) {
          // Build query params for budget filtering
          const params = {};
          if (filters.minPrice) params.min = filters.minPrice;
          if (filters.maxPrice) params.max = filters.maxPrice;

          response = await axios.get(
            `http://localhost:3000/api/auth/gigs/budget`,
            { params }
          );
        }
        // Check if we're searching by text
        else if (filters.search) {
          response = await axios.get(
            `http://localhost:3000/api/auth/gigs/search/${filters.search}`
          );
        }
        // Check if we're filtering by tags
        else if (filters.tags.length > 0) {
          // Create a query string with all selected tags joined by a space
          const tagQuery = filters.tags.join(" ");
          response = await axios.get(
            `http://localhost:3000/api/auth/gigs/search/${encodeURIComponent(
              tagQuery
            )}`
          );
        }
        // Default fetch - just get all gigs
        else {
          response = await axios.get("http://localhost:3000/api/auth/gigs");
        }

        let fetchedGigs =
          response.data && response.data.gigs
            ? response.data.gigs
            : response.data;

        fetchedGigs = fetchedGigs.filter(gig => gig.isApproved === true);

        if (filters.category) {
          fetchedGigs = fetchedGigs.filter(
            (gig) => gig.category === filters.category
          );
        }

        // Filter by all tags if multiple tags are selected
        if (filters.tags.length > 1) {
          fetchedGigs = fetchedGigs.filter((gig) => {
            // Check if the gig has all the selected tags
            return filters.tags.every(
              (tag) => gig.tags && gig.tags.includes(tag)
            );
          });
        }

        // Sort the results based on current sort preference
        if (sort === "sales") {
          fetchedGigs.sort((a, b) => b.sales - a.sales);
        } else if (sort === "createdAt") {
          fetchedGigs.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (sort === "rating") {
          fetchedGigs.sort((a, b) => b.rating - a.rating);
        } else if (sort === "priceAsc") {
          fetchedGigs.sort((a, b) => a.price - b.price);
        } else if (sort === "priceDesc") {
          fetchedGigs.sort((a, b) => b.price - a.price);
        }

        setGigs(fetchedGigs);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch gigs:", err);
        setError("Failed to load gigs. Please try again later.");
        setLoading(false);
      }
    };

    fetchGigs();
  }, [filters, sort]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: minRef.current.value,
      maxPrice: maxRef.current.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      search: searchRef.current.value,
    }));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }));
  };

  const toggleTag = (tag) => {
    setFilters((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];

      return {
        ...prev,
        tags: newTags,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      tags: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });
    if (minRef.current) minRef.current.value = "";
    if (maxRef.current) maxRef.current.value = "";
    if (searchRef.current) searchRef.current.value = "";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-80 rounded-xl"></div>
          <div className="relative py-12 px-8 md:px-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-3"> Artists</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Explore the boundaries of art and technology with Liverr's
              artists
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="mt-8 relative flex max-w-md"
            >
              <input
                ref={searchRef}
                type="text"
                placeholder="Keyword Search ..."
                className="w-full py-3 px-5 pr-12 rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue={filters.search}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-r-lg px-5 transition duration-300"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-green-500 hover:text-green-600 text-sm font-medium flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                  Clear all
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`category-${index}`}
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                      />
                      <label
                        htmlFor={`category-${index}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-green-500 transition"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Budget</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input
                        ref={minRef}
                        type="number"
                        placeholder="Min"
                        className="w-full pl-7 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        defaultValue={filters.minPrice}
                      />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input
                        ref={maxRef}
                        type="number"
                        placeholder="Max"
                        className="w-full pl-7 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        defaultValue={filters.maxPrice}
                      />
                    </div>
                  </div>
                  <button
                    onClick={apply}
                    className="py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300 text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full transition duration-300 ${
                        filters.tags.includes(tag)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500">
                {!loading && <span>{gigs.length} services available</span>}
              </div>

              {/* Mobile Filter Button */}
              <button
                className="md:hidden flex items-center gap-2 text-gray-600 text-sm font-medium"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filters
              </button>

              {/* Sort Dropdown */}
   {/* Sort Dropdown */}
<div className="relative flex items-center gap-3 text-sm">
  <span className="text-gray-500">Sort by</span>
  <div
    className="flex items-center gap-1 cursor-pointer font-medium text-gray-700 hover:text-green-500 transition"
    onClick={() => setOpen(!open)}
  >
    <span>
      {sort === "sales"
        ? "Sales"
        : sort === "rating"
        ? "Top Rated"
        : sort === "priceAsc"
        ? "Price: Low to High"
        : sort === "priceDesc"
        ? "Price: High to Low"
        : "Newest"}
    </span>
    <FontAwesomeIcon
      icon={faChevronDown}
      className={`transition duration-300 ${
        open ? "transform rotate-180" : ""
      }`}
    />
  </div>

  {/* Dropdown Menu */}
  {open && (
    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 w-48">
      <button
        onClick={() => reSort("createdAt")}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition"
      >
        Newest
      </button>
      <button
        onClick={() => reSort("sales")}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition"
      >
        Sales
      </button>
      <button
        onClick={() => reSort("rating")}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition"
      >
        Top Rated
      </button>
      <button
        onClick={() => reSort("priceAsc")}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition"
      >
        Price: Low to High
      </button>
      <button
        onClick={() => reSort("priceDesc")}
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition"
      >
        Price: High to Low
      </button>
    </div>
  )}
</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-green-500 text-3xl mb-3"
                  />
                  <p className="text-gray-600">Loading services...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm p-8">
                <div className="text-center">
                  <div className="text-red-500 text-5xl mb-4">!</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && gigs.length === 0 && (
              <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm p-8">
                <div className="text-center">
                  <div className="text-gray-300 text-5xl mb-4">¯\_(ツ)_/¯</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            {/* Gig Cards Grid */}
            {!loading && !error && gigs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gigs.map((gig) => (
                  <GigCard key={gig._id || gig.id} item={gig} />
                ))}
              </div>
            )}

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                <div className="bg-white rounded-t-xl w-full p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>

                  {/* Mobile Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={`mobile-category-${index}`}
                            type="radio"
                            name="mobile-category"
                            checked={filters.category === category}
                            onChange={() => {
                              handleCategoryChange(category);
                              setShowFilters(false);
                            }}
                            className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                          />
                          <label
                            htmlFor={`mobile-category-${index}`}
                            className="ml-2 text-gray-700"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Budget Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Budget</h4>
                    <div className="flex gap-2 mb-3">
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full pl-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={filters.minPrice}
                          onChange={(e) => {
                            if (minRef.current)
                              minRef.current.value = e.target.value;
                          }}
                        />
                      </div>
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full pl-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={filters.maxPrice}
                          onChange={(e) => {
                            if (maxRef.current)
                              maxRef.current.value = e.target.value;
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Tags Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => toggleTag(tag)}
                          className={`text-sm px-3 py-1.5 rounded-full ${
                            filters.tags.includes(tag)
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        apply();
                        setShowFilters(false);
                      }}
                      className="flex-1 py-3 bg-green-500 text-white font-medium rounded-md"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={() => {
                        clearFilters();
                        setShowFilters(false);
                      }}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-md"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gigs;
