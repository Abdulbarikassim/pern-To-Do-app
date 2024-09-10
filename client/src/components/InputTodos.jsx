import React, { useState } from "react";

const InputTodos = () => {
  const [description, setDescription] = useState("");
  //  we need to submit the form to send the data out.
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="text-center">
      f
      <h1 className=" text-3xl font-bold text-green-600 mt-5 p-12 ">
        Pern Todo
      </h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Enter you're Todo "
          className="text-center border-solid border-2 border-grey-400 rounded-lg large m-4 p-2  w-1/3"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          type="submit"
          className="border-solid bg-green-700 text-white text-bold px-8 py-2 rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodos;
