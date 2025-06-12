import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import toast from 'react-hot-toast';

export default function ToDoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const actions = ['delete all', 'mark all as completed'];
  const addTask = () => {
    if (task.trim()) {
      toast.success("Task Added")
      setTodos([...todos, { id: Date.now(), text: task.trim(), done: false }]);
      setTask('');
    } else {
      toast.error("Please add some text");
    }
  };

  const deleteTask = (id) => { setTodos(todos.filter(t => t.id !== id)); toast.success('Task deleted!'); }
  // const toggleTask = (id) => {setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));toast.success("Task Done");}
  const toggleTask = (id) => {
    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(updatedTodos);

    const toggledTask = todos.find(t => t.id === id);
    toast.success(toggledTask.done ? 'Marked as incomplete' : 'Marked as completed');
  };
  const filteredTodos = todos.filter(t => filter === 'all' ? true : filter === 'active' ? !t.done : t.done);

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#24243e] via-[#302b63] to-[#0f0c29] p-4">
      {/* Floating circles */}
      <div className="absolute -top-10 left-20 w-64 h-64 rounded-full bg-purple-600/20 blur-lg animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-600/20 blur-lg animate-float-delay"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-600/20 blur-lg animate-float-delay-2"></div>

      <div className="relative w-full max-w-3xl  bg-black/30 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-20">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            To-Do List
          </h2>

          <TodoInput task={task} setTask={setTask} addTask={addTask} />

          {/* Filter */}
          <div className="flex justify-center gap-4 mb-6 text-white flex-wrap">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl cursor-pointer ${filter === f ? 'bg-cyan-500/80' : 'bg-gray-700/40 hover:bg-gray-600/60'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            {actions.map(action => (
              <button
                key={action}
                onClick={() => {
                  if (action === 'delete all') {
                    setTodos([]);
                    toast.success("All Task Deleted!")
                  } else if (action === 'mark all as completed') {
                    setTodos(prev => prev.map(t => ({ ...t, done: true })));
                    toast.success("All Task Marked as completed!")
                  }
                }}
                className="px-4 py-2 cursor-pointer rounded-xl bg-gray-700/40 hover:bg-red-600/80 text-white"
              >
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </button>
            ))}
          </div>

          {/* List */}
          <ul className="space-y-3 h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent custom-scrollbar">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-gray-300">No tasks to display</p>
            ) : (
              filteredTodos.map((t, ind) => (
                <TodoItem key={t.id} todo={t} no={ind + 1} toggleTask={toggleTask} deleteTask={deleteTask} />
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Animations */}
      <style jsx="true" global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(5deg); }
          100% { transform: translateY(-20px) rotate(0deg); }
        }
        .animate-float {
  animation: float 4s ease-in-out infinite alternate;
}

.animate-float-delay {
  animation: float 5s ease-in-out infinite alternate;
  animation-delay: 2s;
}

.animate-float-delay-2 {
  animation: float 6s ease-in-out infinite alternate;
  animation-delay: 4s;
}
      `}</style>
    </div>
  );
}