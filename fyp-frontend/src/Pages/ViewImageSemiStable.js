import React, {useEffect, useState, useRef} from 'react'
import ReactCrop from 'react-image-crop'
import Sheet from 'react-modal-sheet';
import { Link } from 'react-router-dom';
//Modal Check
import HomeDisplay from '../Components/HomeDisplay';
import 'react-image-crop/dist/ReactCrop.css'
import { Navbar } from '../Components/Navbar';
//CHeck
import DummyProductPage from './DummyProductPage';

const ViewImagePage = () => { 
    const [crop, setCrop] = useState();
    const [previewUrl, setPreviewUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    //Modal Check
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [products, setProducts] = useState()
    const [spinner, setSpinner] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [hideButton, setHideButton] = useState(false)
    const [currentList, setCurrentList] = useState()
    const [buttonEnable, setButtonEnable] = useState("disabled")
    const imageRef = useRef(null);
    //Whole picture
    const [wholePrictureReady, setWholePictureReady] = useState(false)
    const [midCrop, setMidCrop] = useState()
    //current list 
    const [currentItem, setCurrentItem] = useState()
    const canvasRef = useRef(null); 

    useEffect(()=>{
      console.log("Completed Crop is here: ", completedCrop)
      console.log("Crop is here: ", crop)
    }, [completedCrop])

    const handleChangeCurrentList = (detectValue) =>{
      const reset = products.filter((product)=>{
        return product.detection == detectValue
      })
      setCurrentList(reset[0])
      setCurrentItem(detectValue)
    }

    useEffect(() => {
      if (!imageFile) {
        return
      }
      
      setButtonEnable("")
      setPreviewUrl(URL.createObjectURL(imageFile))    


      
      return () => {
        URL.revokeObjectURL(previewUrl)
      }
    }, [imageFile])


    // useEffect(()=>{
    //   if(imageRef.current !== null){
    //     const image = imageRef.current;
    //     const aspect = 16 / 9;
    //     const width = image.naturalWidth;
    //     const height = image.naturalHeight;
    //     console.log("Canvas details : ", width, height)
    //     setCompletedCrop({
    //       unit: 'px', // Can be 'px' or '%'
    //       width: width * 0.8,
    //       height: (width * 0.8) / aspect,
    //       x: width * 0.1,
    //       y: (height - (width * 0.8) / aspect) / 2,
    //       aspect,
    //     }); 
    //   }
    // },[imageRef.current])

    const handleImageChange = (event) => {
      const file = event.target.files[0];
    
      // Check if a file is selected
      if (!file) {
        return;
      }
    
      // Validate file type (including WebP)
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const isValidImage = validImageTypes.includes(file.type);
    
      if (!isValidImage) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
        return;
      }
    
      // Set the image file state
      setImageFile(file);
    };
    

    

    const onCropComplete = (crop) => {
      setCompletedCrop(crop);
    };

    const onCrop = (crop) =>{
      setCrop(crop)
    }
    
    

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


    useEffect(()=>{
      if(wholePrictureReady == true){
        const canvas = canvasRef.current;
      const image = imageRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
  
      const { x, y, width, height } = completedCrop;
      console.log("Here is the completed crop function lets go!", x, y, width, height)
  
      canvas.width = width;
      canvas.height = height;
  
      ctx.drawImage(
        image,
        x * scaleX,
        y * scaleY,
        width * scaleX,
        height * scaleY,
        0,
        0,
        width,
        height
      );
  
      console.log("Drawn")
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        console.log('Cropped image URL:', fileUrl);
        setCroppedImageBlob(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = 'cropped_image.jpg'; // Set desired filename
        downloadLink.click();
      }, 'image/jpeg');

    
    setIsResultOpen(true)
    setSpinner(true)

    setUploaded(true)
    setHideButton(true)
      }

    },[wholePrictureReady])
    
    const createCroppedImage = async () => {
      if (!completedCrop || !canvasRef.current || !imageRef.current) {
        console.log()
        return;
      }
  
      console.log("Canvas details", completedCrop, canvasRef.current, imageRef.current)
      const canvas = canvasRef.current;
      const image = imageRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
  
      const { x, y, width, height } = completedCrop;
      console.log("Here is the completed crop function lets go!", x, y, width, height)
  
      canvas.width = width;
      canvas.height = height;
  
      ctx.drawImage(
        image,
        x * scaleX,
        y * scaleY,
        width * scaleX,
        height * scaleY,
        0,
        0,
        width,
        height
      );
  
      console.log("Drawn")
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        console.log('Cropped image URL:', fileUrl);
        setCroppedImageBlob(blob);
      }, 'image/jpeg');

    
    setIsResultOpen(true)
    setSpinner(true)

    setUploaded(true)
    setHideButton(true)
    };
  

    // useEffect(()=>{
    //   if(isResultOpen == false){
    //     setIsResultOpen(true)
    //   }
    // },[isResultOpen])


    
    function onImageLoad(e) {
      const { naturalWidth: width, naturalHeight: height } = e.currentTarget
    
      const crop ={
        x:0,
        y:0,
        // width:width,
        // height:height,
      width: imageRef.current.clientWidth,
      height: imageRef.current.clientHeight
      }
      setCrop(crop)
    }
  
    return (

<>
<Navbar backNavigation={true}></Navbar>
{!previewUrl && (
  <div className='m-3'>

<input
    type="file"
    className="form-control form-style"
    onChange={handleImageChange}
    id="inputGroupFile01"
  />
  </div>
)}
<div className='d-flex justify-content-center image-container pb-3'>
{previewUrl && (
  <ReactCrop
    crop={crop}
    onChange={onCrop}
    // onImageLoaded={onImageLoaded}
    onComplete={onCropComplete}
  >
    <img ref={imageRef} src={previewUrl} alt="Crop me" onLoad={onImageLoad} />
  </ReactCrop>
)}
</div>
  {/* {!hideButton && <div className='d-flex justify-content-center mb-5'>
   <button className={`btn home-search-button d-flex justify-content-center ${buttonEnable}`} onClick={()=>{
     createCroppedImage()
   }}>Upload Image</button>
  </div>} */}



<div className='d-flex justify-content-center mb-5'>
   <button className={`btn home-search-button d-flex justify-content-center ${buttonEnable}`} onClick={()=>{
    setProducts()
     createCroppedImage()
     
   }}>Upload Image</button>
  </div>

  <canvas ref={canvasRef} style={{display:"none"}}/>
  
    <div className='mt-5'>
    
    {uploaded &&
  
  <Sheet isOpen={isResultOpen} onClose={() => setIsResultOpen(false)} snapPoints={[600, 400, 50, 0]}
    initialSnap={1} >
    <Sheet.Container  className='bottom-modal-sheet-home-bg' >
        <Sheet.Header></Sheet.Header>
      <Sheet.Content>
      <div className='d-flex overflow-auto p-2'>
      {products && 
          products.map((product)=>{
            return(
              <button type="button" className={`btn btn-light ms-2 text-nowrap cart-description ${(product.detection == currentItem)? "text-decoration-underline fw-bold" : ""}`} onClick={()=>handleChangeCurrentList(product.detection)}>{product.detection}</button>
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


{false && <DummyProductPage ></DummyProductPage>}

   </div>
  
</>
    );
  };
  
export default ViewImagePage;
