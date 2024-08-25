import React from "react";

const Search = ({ handleSearch, searchValue, onInputChange }) => {
  return (
    <div className="searchForm">
      <form className="flex" onSubmit={handleSearch}>
        <input
          type="search"
          className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Search Blog..."
          value={searchValue}
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
