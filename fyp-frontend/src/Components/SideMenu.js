import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext } from './Navbar';
import { Link } from 'react-router-dom';
import { CartContext } from '../Contexts/cartContext';
import { functionFindValue } from '../Utils/categoryNameValue';
import { ReactSVG } from 'react-svg'

const AccordionItem  = ({items, title, sideBarIssue}) =>{
    const [ariaExpand, setAriaExpand] = useState(false)
    const [collapsed, setCollapsed] = useState('collapsed')
    const [show, setShow] = useState('')

    const manageToggle = () =>{
        setAriaExpand(ariaExpand == false ? true: false)
        setCollapsed(collapsed == "collapsed" ? '':'collapsed')
        setShow(show == ''?'show':'')
    }
    return(
        <div class="accordion-menu" style={{marginTop:"0"}} >
           {/* <div class="accordion-item accordion-menu"> */}
    <div class="accordion-header d-flex align-items-center ps-2 pe-2"  >
      <div className='icon-design'> 
      {(title == "clothes") && <svg width="16px" height="16px" viewBox="0 0 48 48" fill="#878D70" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 9L18 4H30L39 9L43 24L35 30V44H13V30L5 24L9 9Z" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13 31L13 24" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M35 31L35 24" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}


      {(title == "shoes") && <svg width="16px" height="16px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M29.1829 20C31.264 15.0536 36.3505 10.6667 39 8C40.1039 8.66667 44 10.6037 44 15C44 19 42.5455 22.1111 41 23L35.0127 27.1911C32.3672 29.0429 30.1414 31.4311 28.48 34.2001L25 40H4V36C6.42869 34.6667 13.8206 30.1333 17 28C24 32 27.5 24 29.1829 20Z" stroke="#878D70" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M43 21V40" stroke="#878D70" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}
          </div>
      <button class={`accordion-button fw-light accordion-custom-text accordion-menu ${collapsed} ps-0 text-capitalize`} onClick={manageToggle} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded={`${ariaExpand}`} aria-controls="flush-collapseOne">
        {title}
      </button>
    </div>
    <div id="flush-collapseOne" class={`accordion-collapse collapse ${show}`} data-bs-parent="#accordionFlushExample" >
      <div class="accordion-body d-flex flex-column m-0 accordion-body-color"  style={{color:"#595E4A"}} >
      <div className='d-flex flex-column align-items-start'>
      {items && items.map((item)=>{
        return(
            <p><Link to="/labels" state={{labelName: item.name, categoryName: title}} class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={sideBarIssue}>{functionFindValue(item.name)}</Link></p>
        )
            
      })}
      </div>
      </div>
    </div>
  </div>
    )
}

const Accordion = ({sidebarMove})=>{
    const [contents, setContents] = useState([])
    const [shoesContents, setShoesContents] = useState([])
    const { showSidebar, toggleSidebar } = useContext(ThemeContext);
    const {getCartItemsCount} = useContext(CartContext)

    const getSideMenuTitles = async() =>{
        try {
          const response = await fetch("http://192.168.100.34:5000/products/category-wise-labels/clothes")
          const data = await response.json()
          setContents([data])
        } catch (error) {
          console.log("Server is down.")
        }
    }

    const getSideMenuTitlesShoes = async()=>{
      try {
        const response = await fetch("http://192.168.100.34:5000/products/category-wise-labels/shoes")
        const data = await response.json()
        setShoesContents([data])
      } catch (error) {
        console.log("Server is down.")
      }
      }

    useEffect(()=>{
        getSideMenuTitles()
        getSideMenuTitlesShoes()
    },[])

    return(
        <div class="accordion accordion-flush accordion-menu" id="accordionFlushExample">
          <div className='fw-light accordion-custom-text d-flex align-items-center justify-content-between p-3 shadow search-bar' onClick={sidebarMove}>
          
          <Link to="/image-search" style={{textDecoration:"none", color:"#878D70"}}>
          
            Search</Link> 
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#878D70" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg> */}

<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg>
          </div>
          <Link to="/" style={{textDecoration:"none", color:"white"}}>
          <div className='fw-light accordion-custom-text d-flex align-items-center pe-2 ps-2 pt-3 pb-3' onClick={sidebarMove}>
          <div className='icon-design'> 
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#878D70" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg>
          </div>         
            Home
          </div>
          </Link>
          <Link to="/my-cart" style={{textDecoration:"none", color:"white"}}>
          <div className='fw-light accordion-custom-text justify-content-between d-flex align-items-center pe-2 ps-2 pt-3 pb-3' onClick={sidebarMove}>
          <div className='d-flex'>
          <div className='icon-design'> 
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#878D70" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
</svg>
          </div>
          
          
            My Bag
          </div>
          
          {getCartItemsCount() != 0 && <div className='border-rounded bag-tag'>
              {getCartItemsCount()}
          </div>}
          </div>
          </Link>
  {contents && contents.map((content)=>{
    return(
        <AccordionItem items={content.items} title={content.title} sideBarIssue={sidebarMove}> </AccordionItem>
    )
  })}
  {
    shoesContents  && shoesContents.map((content)=>{
      return(
        <AccordionItem items={content.items} title={content.title} sideBarIssue={sidebarMove}> </AccordionItem>
      )
    })
  }
</div>
    )
}


export default function SideMenu() {
    const { showSidebar, toggleSidebar } = useContext(ThemeContext);
    
  return (
        <div class={`side-menu offcanvas offcanvas-end ${showSidebar}`} tabindex="-1" id="offcanvas" style={{ zIndex: 10000000, position: 'fixed' }} aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title white-font" id="offcanvasLabel">Explore Bagsearch</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleSidebar}></button>
    </div>
    <div class="offcanvas-body">
   <Accordion sidebarMove={toggleSidebar}></Accordion>
    </div>
    </div>
  )
}
