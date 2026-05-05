import { useEffect, useState } from "react";

export default function Filters({ onFilter }) {
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        project: "",
        assignee: "",
        status: "",
        type: "",
    });

    const handleChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onFilter(updated);
    };

    const clearFilters = () => {
        const empty = {
            search: "",
            project: "",
            assignee: "",
            status: "",
            type: "",
        };
        setFilters(empty);
        onFilter(empty);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 500);

        return () => clearTimeout(timer);
    }, [filters.search]);

    useEffect(() => {
        onFilter({ ...filters, search: debouncedSearch });
    }, [debouncedSearch, filters.status]);

    return (
        <div className="bg-white p-4 rounded shadow flex gap-3 flex-wrap">

            <input
                type="text"
                placeholder="Search tasks..."
                className="border p-2 rounded w-48"
                value={filters.search}
                onChange={(e) => handleChange("search", e.target.value)}
            />

            <select
                className="border p-2 rounded"
                value={filters.project}
                onChange={(e) => handleChange("project", e.target.value)}
            >
                <option value="">All Projects</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Food App">Food App</option>
            </select>

            <select
                className="border p-2 rounded"
                value={filters.assignee}
                onChange={(e) => handleChange("assignee", e.target.value)}
            >
                <option value="">All Assignees</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Bob Johnson">Bob Johnson</option>
            </select>

            <select
                className="border p-2 rounded"
                value={filters.status}
                onChange={(e) => handleChange("status", e.target.value)}
            >
                <option value="">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <select
                className="border p-2 rounded"
                value={filters.type}
                onChange={(e) => handleChange("type", e.target.value)}
            >
                <option value="">All Types</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
            </select>

            <button
                onClick={clearFilters}
                className="bg-gray-200 px-3 rounded"
            >
                Clear Filters
            </button>
        </div>
    );
}