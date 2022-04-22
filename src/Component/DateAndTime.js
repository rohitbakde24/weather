import React from 'react'
import { useState } from 'react'

const DateAndTime = () => {
    const mydate = new Date().toDateString()
    const mytime = new Date().toLocaleTimeString() 

    const [time,setTime] = useState(mytime);
    const UpdateTime = ()=>{
        let mytime = new Date().toLocaleTimeString(); 
        setTime(mytime)
    }
    setInterval(UpdateTime, 1000);
  return (
    <>
    <h1 style={{color:"#292933"}}>{mytime}</h1>
    </>
  )
}

export default DateAndTime