import React, { useEffect, useState } from "react";
import EditTodos from "./EditTodos";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // Delete todo method.

  const deleteTodo = async (id) => {
    try {
      const deletedTodo = await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todo");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center m-8 ">
        {todos.length > 0 ? (
          <table className="table-auto w-auto bg-white border border-gray-300 text-center">
            <thead className=" text-black">
              <tr>
                <th className="border border-gray-300 px-4 py-2 ">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 ">Edit</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {todo.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      <button>
                        <EditTodos todo={todo} />
                      </button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      <button
                        className="bg-red-600 text-white rounded-md p-2"
                        onClick={() => {
                          deleteTodo(todo.todo_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className="text-bold text-2xl text-red-500">
            {" "}
            No Todo's Available
          </h1>
        )}
      </div>
    </>
  );
};

export default ListTodos;
