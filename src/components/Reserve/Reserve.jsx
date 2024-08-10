import { useContext, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './Reserve.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { dates } = useContext(SearchContext);
    const { data } = useFetch(`room/${hotelId}`, `room/${hotelId}`, `room/${hotelId}`)
    const navigate = useNavigate();

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const date = new Date(start.getTime())

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/rooms/availability/${roomId}`, { dates: alldates })
                return res.data;
            }))
            setOpen(false);
            navigate("/");
        } catch (error) {

        }
    }
    // console.log(data.includes(null));
    return (
        <div className='reserve'>
            <div className="rContainer">
                <i className="fa-solid fa-circle-xmark fa-2x rClose" style={{margin:"2px"}} onClick={() => setOpen(false)} ></i>
                {data.length===0 || data.includes(null) ? <span style={{padding:"15px"}} > Sorry! There is No Room Available in This Hotel.</span>
                    : <>
                        <span>Select your rooms:</span>
                        {data.map(item => (
                            <div className="rItem" key={item?._id}>
                                <div className="rItemInfo">
                                    <div className="rTitle">{item?.title}</div>
                                    <div className="rDesc">{item?.desc}</div>
                                    <div className="rMax">
                                        Max people: <b>{item?.maxPeople}</b>
                                    </div>
                                    <div className="rPrice">Price:{item?.price}</div>
                                </div>
                                <div className="rSelectRooms">
                                    {item?.roomNumbers.map((roomNumber) => (
                                        <div className="room" key={roomNumber._id} >
                                            <label>{roomNumber.number}</label>
                                            <input
                                                type="checkbox"
                                                value={roomNumber._id}
                                                onChange={handleSelect}
                                                disabled={!isAvailable(roomNumber)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button onClick={handleClick} className="rButton">
                            Reserve Now!
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Reserve