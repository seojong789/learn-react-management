import React, { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

const NewProject = ({ onAddProject, onCancel }) => {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modalRef = useRef();

  const handleSave = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // 유효성 검사
    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate.trim() === ''
    ) {
      // 에러 모달 출력
      modalRef.current.open();
      return; // 해당 코드가 있어야 밑의 onAddProject가 수행이 안돼.
    }

    onAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid vlaue for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          {/* <p>
          <label>Title</label>
          <input type="text" />
        </p> */}
          {/* 위 코드 대신 아래의 Input Component를 사용 */}
          <Input type="text" label="Title" ref={title} />
          <Input label="Description" isTextarea={true} ref={description} />
          <Input type="date" label="Due Date" ref={dueDate} />
        </div>
      </div>
    </>
  );
};

export default NewProject;
