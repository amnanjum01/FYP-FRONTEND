import React from 'react'
import ResultsProductDisplayTable from './ResultsProductDisplayTable'

export default function ResultsDisplay({products, heading, skuSetter}) {
  
  return (
    <div className='homepage-products'>
        <p className='fs-3 text-center'>{heading}</p>
      {products && <ResultsProductDisplayTable listOfProducts={products} skuSetter={skuSetter}></ResultsProductDisplayTable>}
      </div>
  )
}
 