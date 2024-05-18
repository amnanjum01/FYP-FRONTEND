import React,  { useEffect, useState }  from 'react'
import Sheet from 'react-modal-sheet';
import SearchResult from '../Components/SearchResult';
import ProductPageDescription from '../Components/ProductPageDescription';
import HomeDisplay from '../Components/HomeDisplay'

export default function DummyRunBottomSheets() {
    const [isOpen, setOpen] = useState(false);
    const snapPoints = [100, 200, 300];

    const [productInfo, setProductInfo] = useState()
    const [products, setProducts] = useState()

  const getHomeProducts = async()=>{
    const response = await fetch('http://localhost:5000/products/all-products')
    const data = await response.json()
    setProducts(data.products)
    console.log(data.products)
  }
    const fetchProduct = async() =>{
        const response = await fetch(`http://localhost:5000/products/find-product/BUS004`)
        const data = await response.json()
        setProductInfo(data) 
    }
    useEffect(()=>{
        fetchProduct()
        // getHomeProducts()
    },[])


  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[600, 400, 100, 0]}
        initialSnap={1} >
        <Sheet.Container>
            <Sheet.Header></Sheet.Header>
          <Sheet.Content className='bottom-modal-sheet-bg'>
        
          {productInfo && <ProductPageDescription sizings={productInfo.sizes} description={productInfo.description}></ProductPageDescription>}
          {/* {products && <HomeDisplay products={products}></HomeDisplay>} */}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}
