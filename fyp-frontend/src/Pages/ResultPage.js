import React from 'react'
import SearchResult from '../Components/SearchResult'
import { Navbar } from '../Components/Navbar'

export default function ResultPage() {
  return (
    <>
    <Navbar backNavigation={true}></Navbar>
    <div className='search-result-page'>
    <img className='' src="https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw70fc2dee/images/hi-res/ala231232_rust_1.jpg?sw=800&sh=1200" style={{height:"30% !important", width:"100%",}} alt="" />
    <div className='result-buttons'>
    <button type="button" className='btn btn-light result-button'>Kameez</button>
    <button type="button" className='btn btn-light result-button'>Kurta & Shalwar</button>
    </div>
      <SearchResult></SearchResult>
      
    </div>
    </>
  )
}
