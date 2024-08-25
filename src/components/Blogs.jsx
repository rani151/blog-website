import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Card, CardImage, CardTitle, CardText, CardBody, Col } from 'react-tailwindcss'; // Import Tailwind CSS components

const Blogs =(
    { 
        imageUrl, 
        title, 
        description, 
        id, 
        excerpt, 
        handleDelete 
    }) => {
  return (
    <Col size="4">
      <Card className="h-100 mt-2" style={{ maxWidth: '22rem' }}>
        <CardImage
          src={imageUrl}
          alt={title}
          position="top"
          className="max-w-full h-48" // Tailwind CSS class for max width and height
        />
        <CardBody>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardText className="text-gray-700">{excerpt(description)}</CardText>
          <Link to={`/blog/${id}`} className="text-blue-500 hover:underline">
            Read More
          </Link>
          
          <span className="flex items-center space-x-2">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
        onClick={() => handleDelete(id)}
      >
        <FaTrash className="mr-2" />
        Delete
      </button>
      <Link to={`/editBlog/${id}`} className="text-blue-500 hover:underline">
        <FaEdit className="mr-2" />
        Edit
      </Link>
    </span>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Blogs;