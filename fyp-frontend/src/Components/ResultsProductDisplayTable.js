import React from 'react'
import ResultsProductDisplayTiles from './ResultsProductDisplayTiles'

export default function ResultsProductDisplayTable({listOfProducts, skuSetter}) {

  return (
    <div className="container">
        <div className="row row-gap-3">
        {/* <ProductDisplayTiles></ProductDisplayTiles>
        <ProductDisplayTiles></ProductDisplayTiles>
        <ProductDisplayTiles></ProductDisplayTiles>
        <ProductDisplayTiles></ProductDisplayTiles> */}
        {listOfProducts && listOfProducts.map((product) => (
          <ResultsProductDisplayTiles key={product.id} item={product} skuSetter={skuSetter}/>
        ))}
        </div>
      </div>
  )
}