export default function Header({ onCreate }) {
    return (
        <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">Task Management Dashboard</h1>

            <button
                onClick={onCreate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                + Create Task
            </button>
        </div>
    );
}