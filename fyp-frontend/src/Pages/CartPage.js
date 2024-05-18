import React, { useContext } from 'react';
import CartPageProductTile from '../Components/CartPageProductTile';
import { CartContext } from '../Contexts/cartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { createCartList, getCartTotal } = useContext(CartContext);

    return (
        <div>
            {(createCartList().length > 0) && 
            <p className='fs-1 cart-text d-flex justify-content-center pt-2'>MY BAG</p>
            
             &&createCartList().map((item, index) => {
                return (
                    <CartPageProductTile
                        key={index}
                        brandName={item.brandName}
                        size={item.size}
                        quantity={item.quantity}
                        productName={item.productName}
                        image={item.image}
                        sku={item.sku}
                    />
                );
            })}

            {createCartList() == 0 &&
                <div className='d-flex flex-column align-items-center justify-content-center pt-4 mt-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#878D70" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
                    </svg>
                    <p className="fs-1 cart-text">Oops! Your cart is empty.</p>
                    <Link to={'/'}>
                    <button className='btn cart-explore-button'>
                        Explore our products
                    </button>
                    </Link>
                </div>
            }

            <hr className='cart-line'></hr>

            {(createCartList().length > 0) &&
              <p className='fs-3 cart-text d-flex justify-content-end pe-3'>Total:  <p className='fw-bolder'>PKR {getCartTotal()}</p></p>
            }
        </div>
    );
};

export default CartPage;
