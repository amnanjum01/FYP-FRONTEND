import React from 'react'
import { Link } from 'react-router-dom'
export default function ResultsProductDisplayTiles({item, skuSetter}) {
    
    return (

    <>
       {item && <Link to="#" className="product-display-table-item col-6 col-lg-3">
        <div className="card rounded-0" onClick={()=>skuSetter(item.sku)}>
    <img className="card-img-top rounded-0" src={item.imagePath[0].imgUrl} alt="Card image cap"/>
    <div className="card-body">
        <h5 className="card-title text-start text-uppercase">{item.brandName}</h5>
        <p className="card-text text-start fw-lighter fs-6">{item.productName} <br/>
         Rs. {item.priceOfProduct}</p>
    </div>
    </div>
       </Link>
        
        
        }
    </>
   
  )
}
