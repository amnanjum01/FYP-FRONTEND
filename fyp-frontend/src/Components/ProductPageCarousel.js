import React, {useState} from 'react'

export default function ProductPageCarousel() {
    const [firstSlide, setFirstSlide] = useState('')
    const [secondSlide, setSecondSlide] = useState('')
    const [thirdSlide, setThirdSlide] = useState('active')

    const handleNext = ()=>{
        if(firstSlide == 'active'){
            setFirstSlide('')
            setSecondSlide('active')
            setThirdSlide('')
        } else if(secondSlide == 'active'){
            setFirstSlide('')
            setSecondSlide('')
            setThirdSlide('active')
        } else if(thirdSlide == 'active'){
            setFirstSlide('active')
            setSecondSlide('')
            setThirdSlide('')
        }
    }

    const handlePrev = ()=>{
        if(firstSlide == 'active'){
            setFirstSlide('')
            setSecondSlide('')
            setThirdSlide('active')
        } else if(secondSlide == 'active'){
            setFirstSlide('active')
            setSecondSlide('')
            setThirdSlide('')
        } else if(thirdSlide == 'active'){
            setFirstSlide('')
            setSecondSlide('active')
            setThirdSlide('')
        }
    }
  return (
    <div id="carouselExampleAutoplaying" class="carousel carousel-custom-padding slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
    <div class="carousel-inner " >
      <div class={`carousel-item ${firstSlide} w-100`}>
        <img class="w-100" src="https://firebasestorage.googleapis.com/v0/b/fyp-data-bagsearch.appspot.com/o/images%20-%202024-05-01T112536.484.jpeg?alt=media&token=165ebc46-5132-4e65-83bd-466d54ddf3ef" alt="..."/>
      </div>
      <div class={`carousel-item ${secondSlide} w-100 `}>
        <img class="w-100" src="https://firebasestorage.googleapis.com/v0/b/fyp-data-bagsearch.appspot.com/o/images%20-%202024-05-01T112536.484.jpeg?alt=media&token=165ebc46-5132-4e65-83bd-466d54ddf3ef" alt="..."/>
      </div>
      <div class={`carousel-item ${thirdSlide} w-100`} >
        <img class="w-100" src="https://firebasestorage.googleapis.com/v0/b/fyp-data-bagsearch.appspot.com/o/IMAGE1.jpeg?alt=media&token=e040e06f-8b33-4efb-82e8-d9d540b842d3"  alt="..."/>
      </div>
    </div>
    <button class="carousel-control-prev btn-success" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={handlePrev}>
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={handleNext}>
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  )
}
