import React from 'react'
import ProductDisplayTiles from './ProductDisplayTiles'

export default function ProductDisplayTable({listOfProducts}) {

  return (
    <div className="container">
        <div className="row row-gap-3">
        {/* <ProductDisplayTiles></ProductDisplayTiles>
        <ProductDisplayTiles></ProductDisplayTiles>
        <ProductDisplayTiles></ProductDisplayTiles>
        <ProductDisplayTiles></ProductDisplayTiles> */}
        {listOfProducts && listOfProducts.map((product) => (
          <ProductDisplayTiles key={product.id} item={product} />
        ))}
        </div>
      </div>
  )
}
