import "./Hotel.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import MailList from "../../components/MailList/MailList";
import Footer from "../../components/Footer/Footer";
import {useLocation,useNavigate} from 'react-router-dom';
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/Reserve/Reserve";

const Hotel = () => {
  const location=useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const { data, loading } = useFetch(`/hotels/find/${id}`,`/hotels/find/${id}`,`/hotels/find/${id}`)
  const {dates,option} =useContext(SearchContext)
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  // console.log(data);
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  let days= dayDifference(dates[0]?.endDate,dates[0]?.startDate)
  if(days<1 || isNaN(days) ){
    days=1;
  }
  if(option.room === undefined){
    option.room=1
  }
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos?.length - 1 : slideNumber - 1;
    } else if (direction === "r") {
      newSlideNumber = slideNumber === data.photos?.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  };

  const handleClick=()=>{
    // console.log(data._id);
    if(user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }
  document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft"){
      handleMove("l")
    }else if(e.key==="ArrowRight"){
      handleMove("r")
    }
  })

  return (
    <div style={{width:"96%"}}>
      <Navbar />
      <Header type="list" />
      {loading ? ("Loading Please Wait...") : (<> <div className="hotelContainer">
        {open && (
          <div className="slider">
            <i onClick={() => setOpen(false)} className="fa-solid fa-circle-xmark close"></i>
            <i onClick={() => handleMove("l")} className="fa-solid fa-circle-arrow-left arrow"></i>
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <i  onClick={() => handleMove("r")} className="fa-solid fa-circle-arrow-right arrow"></i>
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
          <i className="fa-solid fa-location-dot"></i>
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days*data.cheapestPrice*option?.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick} >Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div> </>)}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={data._id}/>}
    </div>
  );
};

export default Hotel;