export default function TodoItem({ no,todo, toggleTask, deleteTask }) {
    return (
      <div className="flex flex-row" >
        <span className={`w-1 rounded-bl-lg rounded-tl-lg ${todo.done ? "bg-green-400" :"bg-red-400"} `} ></span>
      <li
        className="flex justify-between items-center px-4 py-3 rounded-sm bg-black/20 text-white shadow-md w-full"
      >
        <span
          onClick={() => toggleTask(todo.id)}
          className={`flex-1 cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
        >{no}. {' '}
          {todo.text}
        </span>
        <button
          onClick={() => deleteTask(todo.id)}
          className="text-red-400 hover:text-red-500 ml-4 font-semibold rounded-full bg-white/20 w-8 h-8 cursor-pointer hover:bg-white/10 backdrop-blur-lg "
          >
          ✕
        </button>
      </li>
      </div>
    );
  }
  