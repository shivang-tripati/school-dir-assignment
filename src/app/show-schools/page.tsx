"use client";

import SchoolCard from "@/app/components/SchoolCard";
import Navigation from "@/app/components/Navigation";
import { School } from "@/types";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterState, setFilterState] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/schools");
        if (response.ok) {
          const data = await response.json();
          setSchools(data);
          setFilteredSchools(data);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = schools;

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (school) =>
          school.name.toLowerCase().includes(term) ||
          school.city.toLowerCase().includes(term) ||
          school.state.toLowerCase().includes(term) ||
          school.address.toLowerCase().includes(term)
      );
    }

    // Apply state filter
    if (filterState !== "all") {
      result = result.filter((school) => school.state === filterState);
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "city":
          return a.city.localeCompare(b.city);
        case "state":
          return a.state.localeCompare(b.state);
        default:
          return 0;
      }
    });

    setFilteredSchools(result);
  }, [schools, searchTerm, sortBy, filterState]);

  // Get unique states for filter dropdown
  const uniqueStates = Array.from(
    new Set(schools.map((school) => school.state))
  ).sort();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically by the useEffect
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect School</h1>
          <p className="text-xl mb-8">
            Discover the best educational institutions in our network
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by school name, city, or state..."
                className="w-full px-6 py-4 border border-gray-200  rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Filters and Results Count */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredSchools.length} Schools Found
            </h2>
            <p className="text-gray-600">
              {searchTerm && `Search results for "${searchTerm}"`}
              {!searchTerm && "Browse our network of educational institutions"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by: Name</option>
              <option value="city">Sort by: City</option>
              <option value="state">Sort by: State</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="all">All States</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏫</div>
            <p className="text-gray-500 text-lg mb-4">
              {schools.length === 0
                ? "No schools found yet."
                : "No schools match your search criteria."}
            </p>
            <p className="text-gray-400">
              {schools.length === 0
                ? "Be the first to add a school to our directory!"
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>

            {/* Load More Button (for future pagination) */}
            {/* <div className="text-center">
              <button className="bg-white border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Load More Schools
              </button>
            </div> */}
          </>
        )}
      </main>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Use Our Website?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">
                Find the Best School
              </h3>
              <p className="text-gray-600">
                Our website provides information about schools in your area
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Compare Schools</h3>
              <p className="text-gray-600">
                Easily compare schools based on location, name, city, and state
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Add Your School</h3>
              <p className="text-gray-600">
                Help us improve our directory by adding your school
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
