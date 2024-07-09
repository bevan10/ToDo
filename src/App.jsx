import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';

const local = () => {
  if (localStorage.getItem('List')) {
    return JSON.parse(localStorage.getItem('List'));
  } else {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState(local());
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    if (editingIndex === null) {
      setTasks([...tasks, { text: newTask, completed: false }]);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { text: newTask, completed: tasks[editingIndex].completed };
      setTasks(updatedTasks);
      setEditingIndex(null);
    }
    setNewTask('');
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const shiftTask = (index, direction) => {
    if (index < 0 || index >= tasks.length) return;
    const newTasks = [...tasks];

    if (direction === 'up' && index > 0) {
      [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
    } else if (direction === 'down' && index < newTasks.length - 1) {
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    }

    setTasks(newTasks);
  };

  useEffect(() => {
    localStorage.setItem('List', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className="h-screen min-w-full w-auto bg-black flex justify-center">
        <div className="min-w-[50%] max-w-[60vh] h-full bg-neutral-900">
          <div className="w-full h-auto p-3 text-white font-extrabold text-3xl text-center">
            TO-DO List
          </div>

          <div className="flex justify-center mb-2">
            <input
              className="h-8 w-1/2 m-2 rounded-sm"
              type="text"
              value={newTask}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addTask();
              }}
            />

            <button
              className="h-8 m-2 w-12 p-1 border-none bg-green-400 rounded-sm font-semibold"
              onClick={addTask}
            >
              {editingIndex === null ? 'ADD' : 'SAVE'}
            </button>
          </div>

          {/* <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            shiftTask={shiftTask}
            editTask={editTask}
            toggleComplete={toggleComplete}
          /> */}

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

          
        </div>    
      </div>
    </>
  );
}

export default App;
