import React, { useEffect, useState } from "react";
import axios from "axios";
import JobSearchBar from "../components/JobSearchBar";

const HomePage = () => {
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200 && Array.isArray(response.data.data)) {
          setJobs(response.data.data); // Update state with fetched jobs
          setError(null);
        } else {
          setJobs([]);
          setError("No jobs found");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Heading */}

      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
        Welcome to JobPortal
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Find your dream job or hire top talent
      </p>

      {/* Search Bar */}
      <JobSearchBar />

      {/* Job List Section */}
      <div className="mt-6">
        {loading && (
          <p className="text-center text-blue-500 font-medium">
            Loading jobs...
          </p>
        )}

        {error && !loading && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {!loading && jobs.length === 0 && !error && (
          <p className="text-center text-gray-500">
            No jobs found for the given criteria.
          </p>
        )}

        <ul className="space-y-4 mt-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition duration-200 cursor-pointer"
            >
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {job.title}
                </h3>
                <button className="bg-blue-600 p-2 text-white rounded-2xl">Apply</button>
              </div>
              <p className="mt-1 text-gray-700">
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Experience Required:</span>{" "}
                {job.experience} years
              </p>
              <p className="mt-2 text-gray-600">{job.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
