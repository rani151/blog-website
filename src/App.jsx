import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/blog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <ToastContainer />
      <Header />
      <Routes>

        {/* <Route path="/login" element={<Login/>} /> */}
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/addblog" element={<AddEditBlog/>} />
        <Route path="/editblog/:id" element={<AddEditBlog  />} />
        <Route path="/blog/:id" element={< Blog/>} />
        <Route path="/about" element={<  About/>} />
        <Route path="*" element={< NotFound />} />
        
      </Routes>
   
    </div>
    </BrowserRouter>
  );
}

export default App;