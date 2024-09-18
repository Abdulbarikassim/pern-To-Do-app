import React, { useState } from "react";

function EditTodos({ todo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(todo.description);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const body = { description: inputValue };
      const response = await fetch(
        `http://localhost:8000/todo/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Your Input</h2>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter something"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Close
              </button>
              <button
                onClick={(e) => saveChanges(e)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodos;
