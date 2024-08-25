import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5174/blogs/${id}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong getting single blog");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth()).padStart(2, "0"); // January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }

    const imageValidation = !editMode ? imageUrl : true;

    if (title && description && imageUrl && category) {
      const currentDate = getDate();

      if (!editMode) {
        const updatedBlogData = { ...formValue, date: currentDate };
        const response = await axios.post(
          "http://localhost:5174/blogs",
          updatedBlogData
        );
        if (response.status === 201) {
          toast.success("Blog Created Successfully");
        } else {
          toast.error("Something went wrong in posting to db.json");
        }
      } else {
        const response = await axios.put(
          `http://localhost:5174/blogs/${id}`,
          formValue
        );
        if (response.status === 200) {
          toast.success("Blog Updated Successfully");
        } else {
          toast.error("Something went wrong in updating to db.json");
        }
      }
      setFormValue({ title: "", description: "", category: "", imageUrl: "" });
      navigate("/");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'sba3jji0');
    axios
      .post(
        `http://api.cloudinary.com/v1_1/ddbgwneok/image/upload`,
        formData
      )
      .then((resp) => {
        toast.info("Image Uploaded Successfully to cloudinary");
        setFormValue({ ...formValue, imageUrl: resp.data.url });
      })
      .catch((err) => {
        toast.error("Something went wrong in uploading image to cloudinary!");
      });
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <form
      className="grid gap-4 mt-24"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-bold">{editMode ? "Update Blog" : "Add Blog"}</p>

      <div className="mx-auto p-4 max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={title || ""}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={description || ""}
            onChange={onInputChange}
            rows={4}
            required
          />
        </div>

        {!editMode && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="file"
              type="file"
              onChange={(e) => onUploadImage(e.target.files[0])}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            onChange={onCategoryChange}
            value={category}
          >
            <option value="">Please select category</option>
            {options.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {categoryErrMsg && (
          <div className="text-red-500 text-xs italic">{categoryErrMsg}</div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEditBlog;
