export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">{job.title}</h3>
        <p className="text-gray-600">{job.location} • {job.type}</p>
        <p className="text-sm mt-2">{job.description.slice(0, 100)}...</p>
      </div>
      {onEdit || onDelete ? (
        <div className="mt-3 flex gap-2">
          {onEdit && <button onClick={onEdit} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>}
          {onDelete && <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>}
        </div>
      ) : null}
    </div>
  );
}
