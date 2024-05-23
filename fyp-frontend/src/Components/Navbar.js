import React, {useState,useEffect, createContext, useContext} from 'react'
import SideMenu from './SideMenu'
import 'react-image-crop/dist/ReactCrop.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../Contexts/cartContext'
import HomePage from '../Pages/HomePage';
import { Accordion } from './SideMenu';

export const ThemeContext = createContext({ showSidebar: '' }); 


export function Navbar() {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [search, setSearch] = useState('')
    const [showSidebar, setShowSidebar] = useState('')
    const {getCartItemsCount} = useContext(CartContext)
    const toggleSidebar = () =>{
        setShowSidebar(showSidebar === '' ? 'show' : '')
    }
  
  return (
   <>
    <nav class="navbar fixed-top mb-3" style={{backgroundColor:"#B07D60"}}>
  <form class="container-fluid d-flex justify-content-between fs-5 fw-semibold text-light">
    
    <button class="btn btn-outline-light m-1" type="button" onClick={toggleSidebar}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F8F9FA" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>

    </button>
<Link to="/" className='navbar-brandname'>BAGSEARCH</Link>



            <Link to={'/my-cart'}>
            <button className="btn btn-outline-light position-relative me-2" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F8F9FA" className="bi bi-bag-check" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>
               {(getCartItemsCount() > 0) && 
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getCartItemsCount()}
              </span>
               }
            </button>
            </Link>
           

  </form>
</nav>

<ThemeContext.Provider value={{ showSidebar, toggleSidebar }}>
    <SideMenu value={showSidebar} />
</ThemeContext.Provider>

   </>
  )
}
  