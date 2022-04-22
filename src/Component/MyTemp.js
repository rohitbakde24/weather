import React, { useEffect, useRef, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import back from './image/back.jpg'
import MyCalender from './MyCalender'
import { WiHumidity,WiStrongWind,WiDayRainWind } from "react-icons/wi";
import { ImLocation } from "react-icons/im";
import { FaTemperatureLow,FaTemperatureHigh} from "react-icons/fa";
import './MyTemp.css'
import DateAndTime from './DateAndTime';

const MyTemp = () => {
    const [city,setCity] =useState("");
    const[normal,newNormal] = useState("")
    const[condition, newCondition] = useState("")
    const[wind,newWind] = useState("")
    const [search,setSearch] = useState("mumbai");
    
    const[nextDay, newnextDay] =useState([])

    useEffect (()=>{
        const fetchApi = async () =>{
            const response = await fetch(`https://weatherdbi.herokuapp.com/data/weather/${search}`)
            const resJson =await response.json();
            setCity(resJson.currentConditions.temp)
            newNormal(resJson)
            newCondition(resJson.currentConditions)
            newWind(resJson.currentConditions.wind)
            newnextDay(resJson.next_days)
        };
        fetchApi();
        },[search]
    )
    const myStyle={
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100vh"
    }
      
        const inputData = useRef();
    
        const GetInput = () =>{
            const data = inputData.current.value
            setSearch(data)
        }
  return (
    <>
    <div style={myStyle} className="bg">
        <Container>
            <Row className='px-5 pt-5'>
                <Col>
                    <div >
                        <h3 className='text-white font'>
                            Best way to know your city weather
                        </h3>
                        <div>
                            <span className='mag'>🔍</span>
                            <input type="text" 
                                placeholder='enter city name...' 
                                className='newinput' 
                                ref={inputData}
                            />
                            <button onClick={GetInput} className="mybtn">Update</button>
                </div>
                    </div>
                </Col>
                <Col className='show-time'>
                    <DateAndTime/>
                </Col>
            </Row> 
            <Row className='p-5'>
                   
                <Col className='show-data' >
                    <p className='text-white'>WEATHER REPORT </p>
                    <div>
                        <span className='temp'>{(city.c)}&#8451;</span>
                        <img src={condition.iconURL} className="myicon"/>
                        <br/>
                            <ImLocation className='mb-2'/>{normal.region}
                            <br/>
                            <tr>
                                <td><WiHumidity className='mb-1 size-icon'/>{condition.humidity}&emsp;&emsp;</td>
                                <td><img src={condition.iconURL} className="comment"/> {condition.comment}</td>
                            </tr>
                            <tr>
                                <td><WiStrongWind/> {wind.km} km</td>
                                <td> precipitation {condition.precip}</td>
                            </tr>
                    </div>
                </Col >
                <Col className='show-data'>
                <table>
                        <tr>
                        <th>Day</th>
                        <th><WiDayRainWind className='ms-1 font-w'/></th>
                        <th><FaTemperatureHigh className='ms-1'/></th>
                        <th><FaTemperatureLow className='ms-1'/></th>
                        </tr>
                    {
                        nextDay.map((value)=>
                        <>

                        
                        <tr>
                            <td>{value.day}&emsp;</td>
                            <td><img src={value.iconURL} className="next-day-img"/>&emsp;&emsp;&emsp;</td>
                            <td>{value.max_temp.c}&emsp;&emsp;</td>
                            <td>{value.min_temp.c}</td>
                        </tr>
                        
                        </>
                        )
                    }
                </table>
                </Col>
                <Col className='show-data'>
                    <MyCalender/>    
                </Col>
            </Row>   
            </Container>     
        </div>
                 
    </>
  )
}

export default MyTemp