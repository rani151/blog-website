import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Badge from "../components/Badge";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog(id);
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5174/blogs/${id}`);
      const relatedPostData = await axios.get(
        `http://localhost:5174/blogs?category=${response.data.category}&_start=0&_end=3`
      );
      if (response.status === 200 && relatedPostData.status === 200) {
        setBlog(response.data);
        setRelatedPost(relatedPostData.data);
      } else {
        toast.error("Something went wrong getting the blog or related posts");
      }
    } catch (error) {
      toast.error("Something went wrong getting the blog or related posts");
    }
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.substring(0, 60) + " ...";
    }
    return str;
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px",
  };

  return (
    <div className="container mx-auto p-4 border border-teal-200">
      <Link to="/">
        <strong className="float-left mt-3 text-black">Go Back</strong>
      </Link>
      <h2 className="text-gray-500 mt-2 inline-block">
        {blog && blog.title}
      </h2>
      <img
        src={blog && blog.imageUrl}
        className="img-fluid rounded w-full max-h-600"
        alt={blog && blog.title}
      />
      <div className="mt-5">
        <div className="flex items-center h-11 bg-gray-100 p-2">
          <svg
            className="w-6 h-6 mr-2 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2a2 2 0 00-2-2H2a2 2 0 01-2-2V8a2 2 0 012-2h2a2 2 0 002-2V2z"
              clipRule="evenodd"
            />
          </svg>
          <strong className="text-gray-600">{blog && blog.date}</strong>
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <p className="text-lg leading-relaxed mt-5">
          {blog && blog.description}
        </p>
      </div>
      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && <h1 className="text-xl mt-8">Related Posts</h1>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPost
              .filter((item) => item.id !== id)
              .map((item, index) => (
                <div key={index} className="border rounded overflow-hidden shadow-lg">
                  <Link to={`/blog/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{excerpt(item.description)}</p>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
