import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext } from './Navbar';
import { Link } from 'react-router-dom';


const AccordionItem  = ({items, title}) =>{
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
            <p><Link to="/labels" state={{labelName: item.name, categoryName: title}} class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{item.name}</Link></p>
        )
            
      })}
      </div>
      </div>
    </div>
  </div>
    )
}

const Accordion = ()=>{
    const [contents, setContents] = useState([])

    const getSideMenuTitles = async() =>{
        const response = await fetch("http://localhost:5000/products/category-wise-labels/clothes")
        const data = await response.json()
        setContents([data])
        console.log(data)
    }

    useEffect(()=>{
        getSideMenuTitles()
    },[])

    return(
        <div class="accordion accordion-flush accordion-menu" id="accordionFlushExample">
  {contents && contents.map((content)=>{
    return(
        <AccordionItem items={content.items} title={content.title}> </AccordionItem>
    )
  })}
</div>
    )
}


export default function SideMenu() {
    const { showSidebar, toggleSidebar } = useContext(ThemeContext);
    
  return (
        <div>
        <div class={`side-menu offcanvas offcanvas-start ${showSidebar}`} tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Categories</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleSidebar}></button>
    </div>
    <div class="offcanvas-body">
   <Accordion></Accordion>
    </div>
    </div>
    </div>
  )
}
