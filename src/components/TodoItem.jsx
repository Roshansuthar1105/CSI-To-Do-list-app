export default function TodoItem({ todo, toggleTask, deleteTask }) {
    return (
      <li
        className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#2e3341] text-white shadow-md"
      >
        <span
          onClick={() => toggleTask(todo.id)}
          className={`flex-1 cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
        >
          {todo.text}
        </span>
        <button
          onClick={() => deleteTask(todo.id)}
          className="text-red-400 hover:text-red-500 ml-4 font-semibold"
        >
          ✕
        </button>
      </li>
    );
  }
  