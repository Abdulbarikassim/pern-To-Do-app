import React, { useEffect, useState } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

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
        <table className="table-auto w-auto bg-white border border-gray-300 text-center">
          <thead className=" text-black">
            <tr>
              <th className="border border-gray-300 px-4 py-2 ">Description</th>
              <th className="border border-gray-300 px-4 py-2 ">Edit</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr className="hover:bg-green-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {todo.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Edit</td>
                  <td className="border border-gray-300 px-4 py-2">Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTodos;
