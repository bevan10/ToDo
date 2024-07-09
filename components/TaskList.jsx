import React from 'react';

function TaskList({ tasks, deleteTask, shiftTask, editTask, toggleComplete }) {
  return (
    <>
      <ul className="w-full h-auto">
        {tasks.map((task, i) => (
          <div
            key={i}
            className={`min-w-[80%] min-h-10 h-auto rounded-sm mb-2 bg-neutral-800`}
          >
            <li className="text-white flex justify-between">
              <div
                className={`flex items-center pl-2 pr-2 min-h-10 w-auto ${task.completed ? 'line-through' : ''}`}
                onClick={() => toggleComplete(i)}
              >
                {task.text}
              </div>

              <div className="flex items-center justify-center min-w-32 gap-2 h-auto pr-2 pl-2">
                <button
                  className="bg-red-600 flex items-center justify-center rounded-sm w-auto h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(i);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>

                <button
                  className="bg-blue-500 flex items-center justify-center rounded-sm w-auto h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    editTask(i);
                  }}
                >
                  <span className="material-symbols-outlined">edit_note</span>
                </button>

                <button
                  className="bg-pink-600 flex items-center justify-center rounded-sm w-auto h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    shiftTask(i, 'up');
                  }}
                >
                  <span className="material-symbols-outlined">arrow_drop_up</span>
                </button>

                <button
                  className="bg-pink-600 flex items-center justify-center rounded-sm w-auto h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    shiftTask(i, 'down');
                  }}
                >
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
