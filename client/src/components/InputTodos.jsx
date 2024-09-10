import React from "react";

const InputTodos = () => {
  return (
    <div className="text-center">
      <h1 className=" text-3xl font-bold text-green-600 mt-5 p-12 ">
        Pern Todo
      </h1>
      <form>
        <input
          type="text"
          placeholder="Enter you're Todo "
          className="text-center border-solid border-2 border-grey-400 rounded-lg large m-4 p-2  w-1/3"
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
