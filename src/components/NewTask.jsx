import React, { useState } from 'react';

const NewTask = ({ onAdd }) => {
  const [enteredTask, setEnteredTask] = useState('');

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === '') {
      return; // 비어있는 문자열을 new task로 추가하지 못하도록 막음.
    }

    // 앱에서 전체 데이터를 관리하고 있기 떄문에, App으로 입력된 Task를 보내고 input 창을 비워야 함.
    onAdd(enteredTask);
    setEnteredTask('');
  };

  return (
    <div className="flex items-center gap-4">
      <input
        onChange={handleChange}
        value={enteredTask}
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
