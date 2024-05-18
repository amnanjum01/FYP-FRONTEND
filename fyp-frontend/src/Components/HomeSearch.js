import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

export default function HomeSearch({viewProductButton, viewProductButtonState}) {
  
  return (
    <div className='home-search fs-3'>
        <p>What are you looking for?</p>
        <Link to="/image-search"><button type="button" class="btn home-search-button">Upload Image</button></Link>
        {(viewProductButtonState == false) && <button type="button" class="btn home-search-button mt-3" onClick={()=>{viewProductButton(true)}}>View Products</button>}
    </div>
  )
}
