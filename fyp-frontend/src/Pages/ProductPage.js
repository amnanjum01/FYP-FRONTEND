import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import ProductPageCarousel from '../Components/ProductPageCarousel'
import ProductPageDescription from '../Components/ProductPageDescription'

export default function ProductPage() {
    const {sku} = useParams() 
    const [productInfo, setProductInfo] = useState()
    const fetchProduct = async() =>{
        const response = await fetch(`http://localhost:5000/products/find-product/${sku}`)
        const data = await response.json()
        setProductInfo(data) 
    }

    useEffect(()=>{
        fetchProduct()
    },[])

  return (
    <div>
        <ProductPageCarousel></ProductPageCarousel>
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
          {productInfo && <p className='product-info fs-2 fw-medium p-0 text-uppercase'>{productInfo.brandName}</p>}
          {productInfo &&<p className='product-info fs-4 fw-lighter p-0'>{productInfo.productName}</p>}
          {productInfo && <p className='product-info fs-4 fw-normal p-0'>PKR. {productInfo.priceOfProduct}</p>}
          </div>
        </div>
       {productInfo && <ProductPageDescription products={productInfo} sizings={productInfo.sizes} description={productInfo.description}></ProductPageDescription>}
       
    </div>

  )
}