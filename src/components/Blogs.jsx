import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";


const Blogs = ({
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  handleDelete,
}) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h5 className="text-lg font-bold mb-2">{title}</h5>
          <p className="text-gray-700">
            {excerpt(description)}
            <Link to={`/blog/${id}`} className="text-blue-500 ml-1">
              Read More
            </Link>
          </p>
          <Badge>{category}</Badge>
          <div className="flex items-center mt-2">
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link to={`/editBlog/${id}`} className="ml-4 text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20h9m-9 0h-2.586a1 1 0 01-.707-1.707L18 10a1 1 0 011.707.707V17a1 1 0 01-1 1h-6z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
