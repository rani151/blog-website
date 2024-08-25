import React from "react";

const Category = ({ handleCategory, options }) => {
  return (
    <div className="w-72 mt-5 bg-white shadow-lg rounded-lg">
      <h4 className="text-lg font-semibold p-4 border-b">Categories</h4>
      <ul className="divide-y divide-gray-200">
        {options.map((item, index) => (
          <li
            key={index}
            className="p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategory(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
