import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DarkModeContext } from "../../context/darkModeContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";


const New = ({ inputs, title }) => {
  const [file, setFile] = useState("https://i.ibb.co/MBtjqXQ/no-avatar.gif");
  const [info, setInfo] = useState({})
  const { data } = useFetch(`/users`)
  const { darkMode } = useContext(DarkModeContext)
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    data.map((input) => {
      if (info.username === input.username) {
        toast.warn('Username is Already Taken!', darkMode ? {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { backgroundColor: "black" }
        } : {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    // eslint-disable-next-line array-callback-return
    data.map((input) => {
      if (info.email === input.email) {
        toast.warn('Email is Already Taken!', darkMode ? {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { backgroundColor: "black" }
        } : {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.email, info.username])


  const navigate = useNavigate();

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/microsoft-or-amazon/image/upload", data)
      const { url } = uploadRes.data
      const newUser = { ...info, img: url };
      await axios.post("/auth/register", newUser);
      toast.success('User is Added Successfully',{
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:`${darkMode ? 'dark' : 'light'}`
    });
      setTimeout(() => {
        navigate("/users")
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.warn('Write Details Carefully', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file === "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                  ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : URL.createObjectURL(file)
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} required contentEditable="true" />
                  <span>{input.errorMessage}</span>
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default New;
