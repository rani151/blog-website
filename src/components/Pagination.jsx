import React from "react";

const Pagination = ({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalBlog,
}) => {
  const renderPagination = () => {
    if (
      (currentPage === 0 && data.length < 5) ||
      (totalBlog === pageLimit && currentPage === 0)
    ) {
      return null;
    }

    if (currentPage === 0) {
      return (
        <div className="flex justify-center mb-4">
          <ul className="inline-flex -space-x-px">
            <li>
              <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg cursor-default">
                1
              </span>
            </li>
            <li>
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => loadBlogsData(5, 10, 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      );
    } else if (
      currentPage < pageLimit - 1 &&
      data.length === pageLimit &&
      totalBlog - data.length !== pageLimit
    ) {
      return (
        <div className="flex justify-center mb-4">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() =>
                  loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
                }
              >
                Prev
              </button>
            </li>
            <li>
              <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 cursor-default">
                {currentPage + 1}
              </span>
            </li>
            <li>
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() =>
                  loadBlogsData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center mb-4">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() =>
                  loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
                }
              >
                Prev
              </button>
            </li>
            <li>
              <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 cursor-default">
                {currentPage + 1}
              </span>
            </li>
          </ul>
        </div>
      );
    }
  };

  return <div>{renderPagination()}</div>;
};

export default Pagination;
