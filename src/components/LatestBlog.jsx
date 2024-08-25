import React from "react";
import { Link } from "react-router-dom";

const LatestBlog = ({ imageUrl, title, id }) => {
  return (
    <div className="mt-2">
      <Link to={`/blog/${id}`}>
        <div className="max-w-xs h-20 flex bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-20 flex-shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="flex-grow p-2">
            <p className="text-start text-gray-800 font-semibold truncate">
              {title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LatestBlog;
