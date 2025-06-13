import React, { useEffect, useRef, useState } from 'react'

function EditTodo({editTask,task,setEditId}) {
  const [text, setText] = useState(task.text);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editTask(task.id,text);
      setEditId(null);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const inputRef=useRef(null);
    return (
        <div className="flex gap-3 mb-6 w-full"> <input
            type="text"
            value={text}
            ref={inputRef}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Update task "
            className="flex-1 px-4 py-3 bg-black/20 rounded-xl text-white placeholder-gray-200 focus:ring-0 ring-0 outline-none "
        />
            <button
                onClick={() => {setEditId(null); editTask(todo.id, task);}}
                className="cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-1 rounded-xl text-white font-semibold hover:from-cyan-600 hover:to-purple-700 transition"
            >
                Add
            </button>
        </div>
    )
}

export default EditTodo