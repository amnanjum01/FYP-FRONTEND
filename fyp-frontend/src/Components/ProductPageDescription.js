import React, {useEffect, useState, useContext} from 'react'
import { CartContext } from '../Contexts/cartContext'

export default function ProductPageDescription({products, sizings, description, manageAddToCart}) {
    const [quantity, setQuantity] = useState(0)
    const [size, setSize] = useState(sizings[0].sizeVal)
    const [x, setX] = useState([])
    const {addToCart, getCartItems, updateQuantity} = useContext(CartContext)
    const increment = () =>{
        const val = quantity +1;
        setQuantity(val)
    }

    const decrement = () =>{
        const val = quantity - 1;
        if (quantity > 0) {
            setQuantity(val);
        }
    }

    const handleAddToCart = ()=>{
        if(quantity>0){
            const sizesArray = []
            sizesArray.push({sizeVal:size, quantity:quantity})
            if(sizesArray.length > 0){
                const existingInCart = getCartItems()
                const checkExisting = existingInCart.find((element)=>{
                    return element.productName == products.productName
                })
                if(checkExisting){
                    updateQuantity(products.productName, sizesArray, quantity)
                } else{
                    const add = {
                        productName: products.productName,
                        brandName: products.brandName,
                        sku: products.sku,
                        quantity: quantity,
                        price: products.priceOfProduct,
                        sizes: sizesArray,
                        image: products.imagePath[0].imgUrl
                    }
                    addToCart(add)
                }            
            }  
        } else {
            console.log("Add quantitty")
        }
              
    }

    const bold = 'fw-bold ul'
    const semibold = 'fw-light'

  return (
    <div className='product-description-container container p-5'>
        <div className="d-flex justify-content-between align-items-center">
            <div className='d-flex'>
               {products.sizes && (products.sizes).map((sizing)=>{
                return(
                     <button className={`product-size text-uppercase ${size === sizing.sizeVal ? bold : semibold} pe-3`} onClick={()=>setSize(sizing.sizeVal)}>{sizing.sizeVal}</button>
                )
               })}
            </div>
            <div className='d-flex justify-content-center'>
            <p className='pt-2'><a href="#" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Light link</a></p>
            </div>
        </div>

       {description && <div className='product-description-text'>
            {/**Product description */}
            {description}
        </div>}

        <div className='p-5 product-description-text'>
            Estimated Delivery: 30th June - 15th July 2024
        </div>

        <div className="d-flex justify-content-center align-items-center">
            <div type="button" onClick={decrement}> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FFFFFF" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
</svg></div>
            <div className='counter'>{quantity}</div>
            <div type="button" onClick={increment}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FFFFFF" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
            </div>
            
        </div>
        <div className="d-flex justify-content-center align-items-center p-5">
        <button type="button" className="btn btn-light add-bag-button" onClick={handleAddToCart}>Add To Bag</button>
        </div>
    </div>
  )
}


