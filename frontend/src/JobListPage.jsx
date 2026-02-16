import React from 'react'
import { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const username = localStorage.getItem("userName");
    

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:8000/jobs/');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    

  return (
    <div className="min-h-screen flex flex-col">
       
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                    {/* <a href="#" className="hover:text-blue-700">Jobs</a> */}
                    <NavLink to={'/jobs'} className="inline-flex items-center gap-2 mb-4
                                        text-sm font-medium ">
                                            Jobs
                    </NavLink>
                    <a href="#" className="hover:text-blue-700">Companies</a>
                    <a href="#" className="hover:text-blue-700">My Applications</a>
                </nav>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Hello, {username}</span>
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                        {username ? username.charAt(0).toUpperCase() : 'U'}
                    </div>
                </div>
            </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">            <div className="mb-6">
                <h2 className="text-2xl font-bold">Recommended Jobs</h2>
                <p className="mt-1 text-sm text-gray-500">Jobs based on your profile and preferences</p>
            </div>

            <div className="space-y-4">
                {/* Job Card */}
                {jobs.length == 0 ? (<p className="text-gray-500">No jobs available</p>) : jobs.map(job => (
                    <div className="rounded-lg border bg-white p-5 transition hover:shadow-md">
                        <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
                        <p className="mt-1 text-sm text-gray-700">{job.company}</p>
                        <p className="mt-1 text-xs text-gray-700">{new Date(job.posted_on).toLocaleDateString("en-US",{
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}</p>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="rounded bg-gray-100 px-2 py-1">📍 {job.location}</span>
                            <span className="rounded bg-gray-100 px-2 py-1">💰 {job.salary_range}</span>
                            <span className="rounded bg-gray-100 px-2 py-1">🕒 Full Time</span>
                        </div>
                        <br />
                        <p className="mt-1 text-xs text-gray-700">
                            {job.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                            <NavLink to={`/apply/${job.id}`} className="text-sm font-medium text-blue-700 hover:underline">View Details →</NavLink>
                        </div>
                    </div>
                ))}
                {/* End Job Card */}

            </div>
        </main>

        <footer className="border-t bg-white">
            <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
                © 2026 JobPortal.com | All rights reserved
            </div>
        </footer>
    </div>
  )
}
