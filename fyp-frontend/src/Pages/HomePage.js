import React, { useEffect, useState, createContext } from 'react'
import Sheet from 'react-modal-sheet';
import HomeSearch from '../Components/HomeSearch'
import HomeDisplay from '../Components/HomeDisplay'

 
export default function HomePage() {
  const [products, setProducts] = useState()
  const [isHomeSheetOpen, setHomeSheetOpen] = useState(true);

  const getHomeProducts = async()=>{
    const response = await fetch('http://localhost:5000/products/all-products')
    const data = await response.json()
    setProducts(data.products)
    console.log(data.products)
  }

  const callbackFromChild = (child) =>{
    setHomeSheetOpen(child)
  }

  useEffect(()=>{
    getHomeProducts()
  },[])

  return (
    <div>
       
        <HomeSearch viewProductButtonState={isHomeSheetOpen} viewProductButton={callbackFromChild}></HomeSearch>
        



        <Sheet isOpen={isHomeSheetOpen} onClose={() => setHomeSheetOpen(false)} snapPoints={[600, 400]}
        initialSnap={1} >
        <Sheet.Container  className='bottom-modal-sheet-home-bg' >
            <Sheet.Header></Sheet.Header>
          <Sheet.Content>
          <Sheet.Scroller>{products && <HomeDisplay products={products}></HomeDisplay>}</Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  )
}
