import React, {useEffect, useState, useRef} from 'react'
import ReactCrop from 'react-image-crop'
import Sheet from 'react-modal-sheet';
import { Link } from 'react-router-dom';
//Modal Check
import HomeDisplay from '../Components/HomeDisplay';
import 'react-image-crop/dist/ReactCrop.css'

const ViewImagePage = () => { 
    const [crop, setCrop] = useState();
    const [previewUrl, setPreviewUrl] = useState()
    const [imageFile, setImageFile] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    //Modal Check
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [products, setProducts] = useState()
    const [spinner, setSpinner] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [hideButton, setHideButton] = useState(false)
    const [currentList, setCurrentList] = useState()

    const canvasRef = useRef(null); 

    const handleChangeCurrentList = (detectValue) =>{
      const reset = products.filter((product)=>{
        return product.detection == detectValue
      })
      setCurrentList(reset[0])
    }

    useEffect(() => {
      if (!imageFile) {
        return
      }
      setPreviewUrl(URL.createObjectURL(imageFile))
    
      return () => {
        URL.revokeObjectURL(previewUrl)
      }
    }, [imageFile])

    const handleImageChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
        setImageFile(event.target.files[0]);
      }
    };

    const onImageLoaded = (image) => {
      if (image) {
        setCrop({
          aspect: 16 / 9,
          width: image.width,
          height: image.height,
          x: 0,
          y: 0,
        });
        console.log("crop set")
      } else {
        console.log("No image");
      }
    };
    
    const onCropChange = (newCrop) => {
      setCrop(newCrop);
    };

    const submit = async()=>{
      const formData = new FormData();
  formData.append('image', croppedImageBlob); // Optional filename

  try {
    const response = await fetch('http://localhost:5000/products/detect', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    // console.log('API response:', data);
    setSpinner(false)
    setProducts(data.products)
    setCurrentList(data.products[0])
    // setIsResultOpen(true)
  } catch (error) {
    console.error('Error sending cropped image:', error);
  }
    }
    useEffect(()=>{
      submit()
    },[croppedImageBlob])
    
    const createCroppedImage = async () => {

      if (!imageFile || !crop || !canvasRef.current){
        console.log("Image File ", imageFile, " crop ", crop, " canvasRef.current ", canvasRef.current)
        return;
      } 
    
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
    
      const image = new Image();
      const imageSrc = URL.createObjectURL(imageFile); // Create a temporary URL for the image
    
      await new Promise((resolve) => {
        image.onload = resolve;
        image.src = imageSrc;
      });
    
      canvas.width = crop.width;
      canvas.height = crop.height;
    
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
    
      canvas.toBlob((blob) => {
        blob.name = 'cropped-image.jpg'; 
        setCroppedImageBlob(blob);
        console.log(`Blob name: ${blob.name}`)
      }, 'image/jpeg');

    
      URL.revokeObjectURL(imageSrc);
      setIsResultOpen(true)
      setSpinner(true)
    };

    useEffect(()=>{
      if(isResultOpen == false){
        setIsResultOpen(true)
      }
    },[isResultOpen])
  
    return (
      <>
     {!previewUrl && <input type="file" class="form-control form-style" onChange={handleImageChange} id="inputGroupFile01"/>}
     
      <ReactCrop
        crop={crop}
        onChange={onCropChange}
        onLoad={onImageLoaded}
        style={{ width: '100%', paddingTop: 'calc(100% / (imageAspectRatio || 1))' }}
      >
       {previewUrl && <div className='position-relative'>
       <img src={previewUrl} className='responsive-image'/>
         {/* <div className='position-absolute top-0 end-0 d-flex flex-column'>
         {products && <button type="button" class="btn btn-gradient mt-2">Hello</button>}
            {
              products && products.map((product)=>{
                return(
                  <button type="button" class="btn btn-gradient mt-2">{product.detection}</button>
                )
              })
            }
         </div> */}
         <div className='position-absolute top-0 end-0 d-flex flex-column justify-content-center align-items-center '>
          
        <Link to="/">
        <button type="button" class="btn btn-gradient mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg> Cancel </button>
        </Link>
         </div>
       </div>
       }
      </ReactCrop>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
     
      {!hideButton && <div className='d-flex justify-content-center'>
      <button className="btn home-search-button d-flex justify-content-center" onClick={()=>{
        createCroppedImage()
        setUploaded(true)
        setHideButton(true)
      }}>Upload Image</button>
      </div>}
      
      {uploaded &&
      
      <Sheet isOpen={isResultOpen} onClose={() => setIsResultOpen(false)} snapPoints={[600, 400]}
        initialSnap={1} >
        <Sheet.Container  className='bottom-modal-sheet-home-bg' >
            <Sheet.Header></Sheet.Header>
          <Sheet.Content>
          <div className='d-flex'>
          {products && 
              products.map((product)=>{
                return(
                  <button type="button" class="btn btn-light ms-2" onClick={()=>handleChangeCurrentList(product.detection)}>{product.detection}</button>
                )
              })
            }
          </div>
          <Sheet.Scroller>
              {spinner && <div class="text-center">
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>}
            {products && <HomeDisplay products={currentList.products} heading={currentList.detection}></HomeDisplay>}
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>}
      </>
    );
  };
  
export default ViewImagePage;