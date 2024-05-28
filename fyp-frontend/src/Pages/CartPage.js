import React, { useContext } from 'react';
import CartPageProductTile from '../Components/CartPageProductTile';
import EmptyCart from '../Components/EmptyCart';
import { CartContext } from '../Contexts/cartContext';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';


const CartPage = () => {
    const { createCartList, getCartTotal } = useContext(CartContext);

    return (
        <>
        <Navbar></Navbar>
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
                <EmptyCart></EmptyCart>
            }

            <hr className='cart-line'></hr>

            {(createCartList().length > 0) &&
              <p className='fs-3 cart-text d-flex justify-content-end pe-3'>Total:  <p className='fw-bolder'>PKR {getCartTotal()}</p></p>
            }


            {
                (createCartList().length > 0) && 
                <div className="d-flex justify-content-center">
                    <Link to='/checkout'>
                    <button type="button" class="btn home-search-button ps-5 pe-5 ms-1 me-1">Proceed to checkout</button>
                    </Link>
                </div>
            }
        </div>
        </>
    );
};

export default CartPage;
