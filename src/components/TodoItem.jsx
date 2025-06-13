import { useEffect, useRef, useState } from "react"

export default function TodoItem({ no, todo, toggleTask, deleteTask, editTask }) {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(todo.text);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(todo.id,task);
      editTask(todo.id,task);
      setEdit(!edit);
    }
  };
  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);
  const inputRef=useRef(null);
  return (
    <div className="flex flex-row" >
      {edit ? <div className="flex gap-3 mb-6 w-full"> <input
        type="text"
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Update task "
        className="flex-1 px-4 py-3 bg-black/20 rounded-xl text-white placeholder-gray-200 focus:ring-0 ring-0 outline-none "
      />
      <button
        onClick={()=>{editTask(todo.id,task);setEdit(!edit)}}
        className="cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-1 rounded-xl text-white font-semibold hover:from-cyan-600 hover:to-purple-700 transition"
      >
        Add
      </button>
      </div> : <>
        <span className={`w-1 rounded-bl-lg rounded-tl-lg ${todo.done ? "bg-green-400" : "bg-red-400"} `} ></span>
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
          <button
            onClick={() => setEdit(!edit)}
            className="text-red-400 hover:text-red-500 ml-4 font-semibold rounded-full bg-white/20 w-8 h-8 cursor-pointer hover:bg-white/10 backdrop-blur-lg "
          >
            ✏️
          </button>
        </li>
      </>
      }
    </div>
  );
}
