
// // sba3jji0 --- >  cloudnary 
// import React, {useState}from 'react'
// import axios from "axios" ;
// import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';

// const initialState = {
//   title : " " ,
//   description : " " ,
//   imageUrl: " "
// }

// const getDate = () => {
//   let today = new Date();

//   let dd = String(today.getDate()).padStart(2, '0');
//   let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 01
//   let yyyy = today.getFullYear();

// today = mm + '/' + dd + '/' + yyyy;

//   return today;
// };



// function AddEditBlog() {
//   const [formValue ,setFormValue] = useState(initialState);
//   const navigate = useNavigate()
 
//   const {  title , description,  imageUrl} = formValue ;

// //  handleSubmit
// async function handleSubmit(e) {
//   e.preventDefault();

//   // ... validation logic

//   try {
//       const currentDate = getDate();
//       const updatedBlogData = { ...formValue, date: currentDate };

//       const response = await axios.post('http://localhost:5000/blogs', updatedBlogData);

//       if (response.status === 201) {
//           toast.success('Blog Created Successfully');
//       } else {
//           toast.error('Something went wrong');
//       }
//   } catch (error) {
//       // Handle errors here, e.g., log the error or display a user-friendly message
//       console.error('Error creating blog:', error);
//       toast.error('Error creating blog. Please try again later.');
//   }
//   setFormValue({title:' ', description:' ', imageUrl:''})
//   navigate('/')
// }

//   // onInputChange
//   const onInputChange = (e) => {
//     let {name, value} = e.target;
//     setFormValue({...formValue, [name]: value})
//   } ;

// //  onUploadImage

// // const onUploadImage = (file) => {
// //   console.log('file', file);

// //   const formData = new FormData();
// //   formData.append('file', file);
// //   formData.append('upload_preset', 'jnecgtem');
// //    axios.post('http://api.cloudinary.com/v1_1/ddbgwneok/image/upload',formData)
// //     .then((response) => {
// //       console.log("response", response)
// //       toast.success(" Image uploaded ")
// //       setFormValue({...formValue, imageUrl:response.data.url})
// //     })
// //     .catch((error) => {
// //       // console.error("something went wrong");
// //     });
// // };

 

//   return (
//     <form className="grid grid-cols-12 gap-3 mt-10 ml-4 mr-4" onSubmit={handleSubmit}>
//       <p className="text-2xl font-bold col-span-12">Add Blog</p>

//        {/*    Title */}
//       <div className="col-span-12">
//         <label htmlFor="blogTitle" className="block text-gray-700 font-bold mb-2">
//            Title
//         </label>
//         <input
//           type="text"
//           name= "title"
//           className="border rounded-md px-3 py-2 w-full"
//           value={title || " "}
//           onChange={onInputChange}
//           validation = "please provide a title"
          
//         />
//       </div>
//        {/* description */}

//       <div className="col-span-12">
//         <label htmlFor="blogContent" className="block text-gray-700 font-bold mb-2">
//           description
//         </label>
//         <textarea
//         className="border rounded-md px-3 py-2 w-full"
//         rows={4}
//         value={description || " "}
//         name="description"
//         onChange={onInputChange}
//         placeholder="Please provide a description"
       
//        />
       
        
       
//       </div>
     
//      {/* image */}
//       <div className="col-span-12">
//       <label htmlFor="blogImage" className="block text-gray-700 font-bold mb-2">
//       Image 
//       </label>
//   {/* <div className="flex items-center space-x-2">
//   <input
//   type="file"
//   className="border rounded-md px-3 py-2 w-full"
//   name="title"
//   // onChange={(e) => onUploadImage(console.log)}
//   required
//   label="Title"
//   validation="Please provide a title"

// />
    
//   </div> */}
//   <div className="col-span-12">
//   <label htmlFor="blogImage" className="block text-gray-700 font-bold mb-2">
//     Image 
//   </label>
//   <div className="flex items-center space-x-2">
//     <input
//       type="file"
//       className="border rounded-md px-3 py-2 w-full"
//       name="imageUrl" // Changed the name to 'image'
//       // onChange={onUploadImage}
  
//       label="Image"
//     />
//   </div>
// </div>
//       </div>
      
//       <div className="col-span-12  ">
//       <button
//   type="submit"
//   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//   // onClick={onUploadImage}
// >
//   Add
// </button>

// <button
//   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//   onClick={() => { /* Your go back logic here */ }}
// >
//   Go Back
// </button>
//       </div>
//     </form>   

//   );
// }

// export default AddEditBlog;











import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
  imageUrl: '',
};

const getDate = () => {
  let today = new Date();

  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 01
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  return today;
};

function AddEditBlog() {
  const [formValue, setFormValue] = useState(initialState);
  const navigate = useNavigate();

  const { title, description, imageUrl } = formValue;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description) {
      return toast.error('Please fill in all fields.');
    }

    try {
      const formData = new FormData();
      const file = e.target.elements[imageUrl].files[0];

      if (file) {
        formData.append('file', file);
        formData.append('upload_preset', 'sba3jji0'); // Replace with your Cloudinary preset

        const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/ddbgwneok/image/upload', formData);
        setFormValue({ ...formValue, imageUrl: uploadResponse.data.url });
      }

      const currentDate = getDate();
      const updatedBlogData = { ...formValue, date: currentDate };

      const response = await axios.post('http://localhost:5000/blogs', updatedBlogData);

      if (response.status === 201) {
        toast.success('Blog Created Successfully');
        navigate('/');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Error creating blog. Please try again later.');
    }
  }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <form className="grid grid-cols-12 gap-3 mt-10 ml-4 mr-4" onSubmit={handleSubmit}>
      <p className="text-2xl font-bold col-span-12">Add Blog</p>

      <div className="col-span-12">
        <label htmlFor="blogTitle" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="border rounded-md px-3 py-2 w-full"
          value={title}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="col-span-12">
        <label htmlFor="blogContent" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          className="border rounded-md px-3 py-2 w-full"
          rows={4}
          value={description}
          name="description"
          onChange={onInputChange}
          required
          placeholder="Please provide a description"
        />
      </div>

      <div className="col-span-12">
        <label htmlFor="blogImage" className="block text-gray-700 font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          className="border rounded-md px-3 py-2 w-full"
          name="imageUrl"
          onChange={onInputChange}
          required
        />
      </div>

      <div className="col-span-12">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddEditBlog;