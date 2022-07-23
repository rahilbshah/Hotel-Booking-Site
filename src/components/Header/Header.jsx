import React, { useState } from 'react'
import './Header.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";
const Header = ({type}) => {

    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false)
    const navigate=useNavigate();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setopenOptions] = useState(false)
    const [option, setOption] = useState(
        {
            adult: 1,
            children: 0,
            room: 1
        }
    )

    const handleOption=(name,operation)=>{
        setOption(prev=>{return{
            ...prev,[name]:operation==="i"?option[name]+1 : option[name]-1,
        }})
    }

    const handleSearch=()=>{
        navigate("/hotels",{state:{destination,date,option}})
    }

    return (
        <div className='header'>
            <div className={type === "list"? "headerContainer listMode" : "headerContainer"}>

                <div className="headerList">
                    <div className="headerListItem active">
                        <i className="fa-solid fa-bed"></i>
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-plane"></i>
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-car"></i>
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-bed"></i>
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-taxi"></i>
                        <span>Airport Taxis</span>
                    </div>
                </div>
                {type !== "list" &&
                    <> <h1 className="headerTitle">
                    A Lifetime Of Discounts? It's Genius.
                </h1>
                <p className="headerDesc">
                    Get Rewarded for Your Travels - Unlock Instant Savings of 10%
                </p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <i className="fa-solid fa-bed headerIcon"></i>
                        <input
                        onClick={()=>{setOpenDate(false); setopenOptions(false)}}
                            type="text"
                            placeholder="Where Are You Going?"
                            className="headerSearchInput"
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <i className="fa-solid fa-calendar-days headerIcon"></i>
                        <span onClick={() => {setOpenDate(!openDate); setopenOptions(false)}} className='headerSearchText'>{`${format(date[0].startDate, "dd/MM/yyyy")} To ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            minDate={new Date()}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date'
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <i className="fa-solid fa-person headerIcon"></i>
                        <span onClick={()=>{setopenOptions(!openOptions); setOpenDate(false)}} className='headerSearchText'>{`${option.adult} Adult ${option.children} Children ${option.room} Room `}</span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={option.adult <= 1}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("adult", "d")}
                                    >
                                        -
                                    </button>
                                    <span className="optionCounterNumber">{option.adult}</span>
                                    <button
                                        className="optionCounterButton"
                                        onClick={() => handleOption("adult", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={option.children <= 0}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("children", "d")}
                                    >
                                        -
                                    </button>
                                    <span className="optionCounterNumber">{option.children}</span>
                                    <button
                                        className="optionCounterButton"
                                        onClick={() => handleOption("children", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={option.room <= 1}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("room", "d")}
                                    >
                                        -
                                    </button>
                                    <span className="optionCounterNumber">{option.room}</span>
                                    <button
                                        className="optionCounterButton"
                                        onClick={() => handleOption("room", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className='headerBtn' onClick={handleSearch}>Search</button>
                    </div>
                </div>
                </>}
            </div>
        </div>
    )
}

export default Header