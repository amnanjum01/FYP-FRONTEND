import React, {useContext} from 'react'
import { CartContext } from '../Contexts/cartContext'
export default function CartPageProductTile({brandName, size, quantity, productName, image, sku}) {
    const {increaseSizeQuantity, reduceSizeQuantity, removeSizeFromCart} = useContext(CartContext)
  return (
    <div class="card mb-3 m-3">
  <div class="row g-0">
    <div class="col-4">
      <img src={image} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-8 border border-0">
      <div class="card-body">
        <h5 class="card-title cart-brandname text-uppercase">{brandName}</h5>
        <p class="card-text cart-description">{size} - {productName}</p>
      </div>


      <div className="d-flex justify-content-center align-items-center position-absolute bottom-0 end-0 mb-1" >
      <div type="button" onClick={()=>reduceSizeQuantity(sku, size)}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#8B4D31" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
</svg></div>
            <div className='counter counter-cart'>{quantity}</div>
            <div type="button" onClick={()=>increaseSizeQuantity(sku, size)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#8B4D31" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
            </div>
      </div>

      <div className="position-absolute top-0 end-0" type="button" onClick={()=>removeSizeFromCart(sku, size)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
      </div>
    </div>
  </div>
</div>
  )
}
