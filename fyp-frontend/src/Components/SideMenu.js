import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext } from './Navbar';
import { Link } from 'react-router-dom';


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
        <div class="accordion-item accordion-menu">
    <h2 class="accordion-header">
      <button class={`accordion-button fw-light accordion-custom-text accordion-menu ${collapsed}`} onClick={manageToggle} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded={`${ariaExpand}`} aria-controls="flush-collapseOne">
        {title.toUpperCase()}
      </button>
    </h2>
    <div id="flush-collapseOne" class={`accordion-collapse collapse ${show}`} data-bs-parent="#accordionFlushExample">
      <div class="accordion-body d-flex flex-column">
      <div className='d-flex flex-column align-items-start'>
      {items && items.map((item)=>{
        return(
            <p><Link to="/labels" state={{labelName: item.name, categoryName: title}} class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={sideBarIssue}>{item.name}</Link></p>
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

    const getSideMenuTitles = async() =>{
        const response = await fetch("http://localhost:5000/products/category-wise-labels/clothes")
        const data = await response.json()
        setContents([data])
    }

    const getSideMenuTitlesShoes = async()=>{
      const response = await fetch("http://localhost:5000/products/category-wise-labels/shoes")
      const data = await response.json()
      setShoesContents([data])
      }

    useEffect(()=>{
        getSideMenuTitles()
        getSideMenuTitlesShoes()
    },[])

    return(
        <div class="accordion accordion-flush accordion-menu" id="accordionFlushExample">
          <div className='fw-light accordion-custom-text d-flex align-items-center' onClick={sidebarMove}>
          <div className='icon-design'> 
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#878D70" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
</svg>
          </div>
          <Link to="/my-cart" style={{textDecoration:"none", color:"white"}}>
          
            My Bag</Link>
          </div>
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
        <div class={`side-menu offcanvas offcanvas-start ${showSidebar}`} tabindex="-1" id="offcanvas" style={{ zIndex: 10000000, position: 'fixed' }} aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Categories</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleSidebar}></button>
    </div>
    <div class="offcanvas-body">
   <Accordion sidebarMove={toggleSidebar}></Accordion>
    </div>
    </div>
  )
}
