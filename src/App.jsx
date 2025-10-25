import { useState } from 'react'
import Weather from './Components/Weather'
import './App.css'

function App() {
  

  return (
    <>
    <div className='app m-0 p-0 h-screen w-screen bg-slate-100 flex justify-center items-center'>
     <Weather />
    </div>
    </>
  )
}

export default App
