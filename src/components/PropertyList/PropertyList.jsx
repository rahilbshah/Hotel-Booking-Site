import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './PropertyList.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyList = () => {
  const { data, loading } = useFetch("/hotels/countbyType", "", "")
  const { dispatch } = useContext(SearchContext)
  const navigate = useNavigate();
  const [destination] = useState("");
  const [dates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [option] = useState(
    {
      adult: 1,
      children: 0,
      room: 1
    }
  )
  const handleClick = async (e) => {
   const hotelType = data[e]?.type
    // console.log(hotelType);
    const hotelCount = data[e]?.count
    if (hotelType !== "" && hotelCount !== 0) {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, option, hotelType } })
      navigate("/hotels", { state: { destination, dates, option, hotelType } })
    } else if (hotelCount === 0) {
      toast.warn('Sorry,This is not available Right Now', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  // console.log(data);

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]
  // console.log(data);
  return (
    <div className='pList'>
      {loading ? ("Loading Please Wait...") :
        (<>
          {data && images.map((img, i) => (
            <div className="pListItem" key={i}>
              <img
                src={img}
                alt=""
                className="pListImg"
                onClick={() => handleClick(i)}
              />
              <div className="pListTitles">
                <h1 onClick={() => handleClick(i)} style={{ cursor: "pointer" }} >{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
              </div>
            </div>
          ))}
        </>)}
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
  )
}

export default PropertyList