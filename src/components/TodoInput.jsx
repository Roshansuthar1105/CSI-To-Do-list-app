export default function TodoInput({ task, setTask, addTask }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter new task"
        className="flex-1 px-4 py-3 bg-black/20 border border-gray-700/50 rounded-xl text-white placeholder-gray-200 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
      />
      <button
        onClick={addTask}
        className="cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-1 rounded-xl text-white font-semibold hover:from-cyan-600 hover:to-purple-700 transition"
      >
        Add
      </button>
    </div>
  );
}
