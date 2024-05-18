import React from 'react'
import ProductDisplayTable from '../Components/ProductDisplayTable'

export default function HomeDisplay({products, heading}) {
  
  return (
    <div className='homepage-products'>
        <p className='fs-3 text-center'>{heading}</p>
      {products && <ProductDisplayTable listOfProducts={products}></ProductDisplayTable>}
      </div>
  )
}
 