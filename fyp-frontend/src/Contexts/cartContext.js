import { createContext, useEffect, useState } from "react";
export const CartContext = createContext()
export const CartProvider = ({children})=>{
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    const [cartList, setCartList] = useState()
    const addToCart = (product)=>{
        setCartItems([...cartItems, product])
    }

    const updateQuantity = (productName, sizesArray, updatedQuantity) => {
        setCartItems(prevCart => {
            return prevCart.map(product => {
                if (product.productName === productName) {
                    const updatedItems = [...product.sizes];
                    sizesArray.forEach(({ sizeVal, quantity }) => {
                        // Find the item in the product's items array
                        const itemIndex = updatedItems.findIndex(item => item.sizeVal === sizeVal);
                        if (itemIndex !== -1) {
                            // Update quantity if the sizeVal exists
                            updatedItems[itemIndex].quantity += quantity;
                            
                        } else {
                            // Add sizeVal if it doesn't exist
                            updatedItems.push({ sizeVal, quantity });
                        }
                    });
                    // Update the product's items array with the updatedItems
                    return { ...product, sizes: updatedItems, quantity:product.quantity+updatedQuantity};
                }
                return product; // Return other products unchanged
            });
        });
    };
    

    const getCartItems = () =>{
        return cartItems;
    }

    const getCartItemsCount = () =>{
        if(cartItems.length > 0){
            let val = 0
            cartItems.forEach((item)=>{
                val += item.quantity
            })
            return val
        } else{
            return 0
        }
    }
    
    const getCartTotal = ()=>{
        if(cartItems.length > 0){
            let total  = 0
            cartItems.forEach((item)=>{
                total += item.price * item.quantity
                console.log(item.priceOfProduct*item.quantity)
            })
            return total
        }
    }

    const removeProductFromCart = (sku) =>{
        setCartItems(prevCart => prevCart.filter(item => item.sku !== sku));
    }

    const removeSizeFromCart = (sku, sizeVal) => {
        setCartItems(prevCart => {
            return prevCart.map(product => {
                // Find the product in the cart array based on the SKU
                if (product.sku === sku) {
                    // Find the size object with the matching sizeVal
                    const removedSize = product.sizes.find(size => size.sizeVal === sizeVal);
                    if (removedSize) {
                        // Decrease the product quantity by the quantity of the removed size
                        product.quantity -= removedSize.quantity;
                        // Remove the size object with the matching sizeVal
                        product.sizes = product.sizes.filter(size => size.sizeVal !== sizeVal);
                        // If sizes array is empty after removing the size object, remove the product
                        if (product.sizes.length === 0) {
                            return null; // Returning null will remove the product from the updatedCart
                        }
                    }
                }
                return product; // Return other products unchanged
            }).filter(Boolean); // Filter out null values (products that were removed)
        });
    };
    

    const reduceSizeQuantity = (sku, sizeVal) => {
        setCartItems(prevCart => {
            return prevCart.map(product => {
                // Find the product with the matching SKU
                if (product.sku === sku) {
                    // Find the size object with the matching sizeVal
                    const updatedSizes = product.sizes.map(size => {
                        if (size.sizeVal === sizeVal) {
                            // Reduce the quantity of the size by one
                            size.quantity -= 1;
                            // If quantity becomes 0, remove the size object
                            if (size.quantity === 0) {
                                return null;
                            }
                        }
                        return size;
                    }).filter(Boolean); // Filter out null values (removed sizes)
    
                    // Update the sizes array with the updatedSizes
                    product.sizes = updatedSizes;
    
                    // Reduce the product quantity by one
                    product.quantity -= 1;
    
                    // If product quantity becomes 0, remove the product
                    if (product.quantity === 0) {
                        return null;
                    }
                }
                return product;
            }).filter(Boolean); // Filter out null values (removed products)
        });
    };
    
    
    
    const increaseSizeQuantity = (sku, sizeVal) => {
        setCartItems(prevCart => {
            return prevCart.map(product => {
                // Find the product with the matching SKU
                if (product.sku === sku) {
                    // Find the size object with the matching sizeVal
                    const updatedSizes = product.sizes.map(size => {
                        if (size.sizeVal === sizeVal) {
                            // Increase the quantity of the size by one
                            size.quantity += 1;
                        }
                        return size;
                    });
    
                    // Update the sizes array with the updatedSizes
                    product.sizes = updatedSizes;
    
                    // Increase the product quantity by one
                    product.quantity += 1;
                }
                return product;
            });
        });
    };
    

    
    const getObjectLocation = (obj)=>{
        return cartItems.indexOf(obj)
    }

    const createCartList = () =>{
        if(cartItems.length > 0){
            const list = []
            cartItems.forEach((product)=>{
                product.sizes.forEach((size)=>{
                    const item = {
                        image: product.image,
                        size: size.sizeVal,
                        quantity: size.quantity,
                        productName: product.productName,
                        brandName: product.brandName,
                        sku:product.sku
                    }
                    list.push(item)
                })
            })
            return list
        } else {
            return 0
        }
    }
    useEffect(()=>{
        console.log(createCartList())
    },[cartItems])


    return(
    <CartContext.Provider value={{increaseSizeQuantity, reduceSizeQuantity, removeSizeFromCart, addToCart, getCartItemsCount, getCartItems, getObjectLocation, updateQuantity, getCartTotal, removeProductFromCart, createCartList}}>
        {children}
    </CartContext.Provider>
    )
}





