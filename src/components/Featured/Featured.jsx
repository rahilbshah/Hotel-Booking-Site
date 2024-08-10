import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch'
import './Featured.css'

const Featured = () => {
    let destination="";
    const { data, loading } = useFetch("/hotels/countbyCity?cities=Ahmedabad,Toronto,NewYork","","")
  const navigate=useNavigate();
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
    const images = [
        "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
        "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
        "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    ]
    const { dispatch } = useContext(SearchContext)
    // console.log(data);
    const handleClick = async (e) => {
        destination=data[e]?.city
        console.log(destination);
        if(destination!==""){
            dispatch({ type: "NEW_SEARCH", payload: { destination, dates, option } })
            navigate("/hotels",{state:{destination,dates,option}})
        }
    }
    // console.log(destination);
    return (
        <div className='featured'>
            {loading ? ("Loading Please Wait...") : (
                <>{data && images.map((img,i) =>
                    <div className="featuredItem" key={i} >
                        <img src={img}
                         alt=""
                         className="featuredImg" />
                        <div className="featuredTitles">
                            <h1 style={{cursor:"pointer"}} onClick={()=>handleClick(i)} >{data[i]?.city}</h1>
                            <h2>{data[i]?.count} properties</h2>
                        </div>
                    </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Featured