import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');

      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      toast.error('Error fetching data. Please try again later.');
    }
  };

  console.log('data', data);

  // functions 
  const handleDelete = () =>{} ;
  const excerpt = (str) => {
    if(str.length > 50){
      str = str.substring(0, 50) + " ... "
    }
    return str ;
  } ;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.length === 0 && (
        <h2 className="text-center text-gray-700">No Blogs Found</h2>
      )}
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
  );

};

export default Home;