import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(5);

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchLatestBlog();
  }, []);

  const loadBlogsData = async (start, end, increase, operation) => {
    const totalBlog = await axios.get("http://localhost:5174/blogs");
    setTotalBlog(totalBlog.data.length);

    const response = await axios.get(
      `http://localhost:5174/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      if (operation === "delete") {
        setCurrentPage(0);
      } else {
        setCurrentPage(currentPage + increase);
      }
    } else {
      toast.error("Something went wrong loading blogs data!");
    }
  };

  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:5174/blogs");
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(
      `http://localhost:5174/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong getting latest blogs");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete that blog?")) {
      const response = await axios.delete(`http://localhost:5174/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
        loadBlogsData(0, 5, 0, "delete");
      } else {
        toast.error("Something went wrong deleting the blog!");
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ...";
    }
    return str;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData(0, 5, 0);
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:5174/blogs?q=${searchValue}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong searching!");
    }
  };

  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5174/blogs?category=${category}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong searching by category");
    }
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {data.length === 0 && (
            <h2 className="text-center mb-4 text-2xl font-bold">
              No Blog Found
            </h2>
          )}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data &&
                data.map((item, index) => (
                  <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/4">
          <h4 className="text-start text-xl font-bold">Latest Post</h4>
          {latestBlog &&
            latestBlog.map((item, index) => (
              <LatestBlog key={index} {...item} />
            ))}
          <Category options={options} handleCategory={handleCategory} />
        </div>
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          loadBlogsData={loadBlogsData}
          pageLimit={pageLimit}
          data={data}
          totalBlog={totalBlog}
        />
      </div>
    </>
  );
};

export default Home;
