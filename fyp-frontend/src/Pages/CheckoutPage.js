import React, {useState, useContext} from 'react'
import { generateRandomText } from '../Utils/randomTextGeneratorUtils'
import { CartContext } from '../Contexts/cartContext';
import { Link } from 'react-router-dom';
import EmptyCart from '../Components/EmptyCart';
import { Navbar } from '../Components/Navbar';


export default function CheckoutPage() {
    const [name, setName] = useState()
    const [orderId, setOrderId] = useState()
    const [inputForm, setInputForm] = useState(true)
    const [message, setMessage] = useState(false)

    const { createCartList, emptyCart } = useContext(CartContext);

    const handleSubmit = (e)=>{
        e.preventDefault()
        setOrderId("#BG"+generateRandomText(8))
        setInputForm(false)
        setMessage(true)
        emptyCart()
        document.getElementById("checkout-form").reset()
        
    }
  return (
   <>
    <Navbar backNavigation={true}></Navbar>
    {(createCartList().length > 0 && inputForm) &&  <form className='d-flex justify-content-center flex-column align-items-center' id="checkout-form"  onSubmit={handleSubmit}>
      <p className='fw-light fs-1 cart-description'>Checkout</p>
      <div class="input-group mb-3 ps-3 pe-3">
  <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder='Enter your name' onChange={(e)=> setName(e.target.value)} required/>
</div>
<button type="submit" class="btn home-search-button ps-5 pe-5 ms-1 me-1">Place Order</button>
    </form>}

{message && <div class="alert alert-success ms-3 me-3 d-flex flex-column align-items-center" role="alert">
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#198754" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
Order {orderId} has been placed.
<div className='w-100'>
<Link to={'/'}><button type="button" class="btn btn-success w-100">Continue Shopping</button></Link>
</div>
</div>}


{
    (createCartList().length == 0 && message == true && inputForm == false) && 
    <EmptyCart></EmptyCart>
}
   </>
  )
}
