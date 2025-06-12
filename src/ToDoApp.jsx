import { useState, useEffect } from 'react';

export default function ToDoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task.trim(), done: false }]);
      setTask('');
    }
  };

  const deleteTask = (id) => setTodos(todos.filter(t => t.id !== id));
  const toggleTask = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const filteredTodos = todos.filter(t => filter === 'all' ? true : filter === 'active' ? !t.done : t.done);

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#24243e] via-[#302b63] to-[#0f0c29] p-4">
      {/* Floating circles */}
      <div className="absolute -top-10 left-20 w-64 h-64 rounded-full bg-purple-600/20 blur-lg animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-600/20 blur-lg animate-float-delay"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-600/20 blur-lg animate-float-delay-2"></div>

      <div className="relative w-full max-w-2xl bg-white/50 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-20">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            My To-Do List
          </h2>

          {/* Add task */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter new task"
              className="flex-1 px-4 py-3 bg-white/5 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-xl text-white font-semibold hover:from-cyan-600 hover:to-purple-700 transition"
            >
              Add
            </button>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-4 mb-6 text-white">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl ${
                  filter === f ? 'bg-cyan-500/80' : 'bg-gray-700/40 hover:bg-gray-600/60'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* List */}
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-gray-300">No tasks to display</p>
            ) : (
              filteredTodos.map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#2e3341] text-white shadow-md"
                >
                  <span
                    onClick={() => toggleTask(t.id)}
                    className={`flex-1 cursor-pointer ${t.done ? 'line-through text-gray-400' : ''}`}
                  >
                    {t.text}
                  </span>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-400 hover:text-red-500 ml-4 font-semibold"
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Animations */}
      <style jsx="true" global>{`
        @keyframes float {
          0% { transform: translateY(-50px) rotate(0deg); }
          50% { transform: translateY(0px) rotate(5deg); }
          100% { transform: translateY(50px) rotate(0deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 10s ease-in-out infinite 2s; }
        .animate-float-delay-2 { animation: float 12s ease-in-out infinite 4s; }
      `}</style>
    </div>
  );
}
