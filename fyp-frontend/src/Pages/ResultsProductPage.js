import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import ProductPageCarousel from '../Components/ProductPageCarousel'
import ProductPageDescription from '../Components/ProductPageDescription'
import { Navbar } from '../Components/Navbar'

export default function ResultsProductPage({sku, returnBarFunction}) {
    const [productInfo, setProductInfo] = useState()
    const fetchProduct = async() =>{
        try {
          const response = await fetch(`http://localhost:5000/products/find-product/${sku}`)
          const data = await response.json()
          setProductInfo(data) 
        } catch (error) {
          console.log("Server is down!")
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[])

  return (
    
<>
<Navbar backNavigation={false}></Navbar>
<div className='d-flex justify-content-start align-items-center ps-2' style={{backgroundColor:"#212529", color:"#FFFFFF"}} onClick={()=>returnBarFunction(false)}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFFFFF" class="bi bi-arrow-left-circle-fill mt-2 mb-2 me-2" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>

Return to search results
</div>
        {productInfo && <ProductPageCarousel imageLinks={productInfo.imagePath}></ProductPageCarousel>}
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
          {productInfo && <p className='product-info fs-2 fw-medium p-0 text-uppercase'>{productInfo.brandName}</p>}
          {productInfo &&<p className='product-info fs-4 fw-lighter p-0'>{productInfo.productName}</p>}
          {productInfo && <p className='product-info fs-4 fw-normal p-0'>PKR. {productInfo.priceOfProduct}</p>}
          </div>
        </div>
       {productInfo && <ProductPageDescription products={productInfo} sizings={productInfo.sizes} description={productInfo.description}></ProductPageDescription>}
       
    
</>
  )
}