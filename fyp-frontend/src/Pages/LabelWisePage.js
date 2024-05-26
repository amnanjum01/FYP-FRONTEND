import React, {useState, useEffect} from 'react'
import ProductDisplayTable from '../Components/ProductDisplayTable'
import { Link, useLocation } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'

export default function LabelWisePage() {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const passedState = location.state;
    // const categoryName = "clothes"
    // const labelName = "floral"
    const fetchLabelWiseProducts = async() =>{
        try {
          const response = await fetch(`http://localhost:5000/products/label/${passedState.labelName}`)
          const data = await response.json()
          setProducts(data)
        } catch (error) {
          console.log("Server is down.")
        }
    }

    useEffect(()=>{
        fetchLabelWiseProducts()
    },[])
  return (
   <>
   <Navbar backNavigation={false}>   </Navbar>
   <div>
        <nav aria-label="breadcrumb">
  <ol class="breadcrumb  ps-3">
    <li class="breadcrumb-item fs-1"><Link to="#" className='breadcrumb-text'>{passedState.categoryName}</Link></li>
    <li class="breadcrumb-item fs-1 breadcrumb-text-end active" aria-current="page">{passedState.labelName}</li>
  </ol>
</nav>
        {products && <ProductDisplayTable listOfProducts={products.products}></ProductDisplayTable>}
    </div>
   </>
  )
}
