import React, {useState} from 'react'

export default function ProductPageCarousel({imageLinks}) {
    const [firstSlide, setFirstSlide] = useState('active')
    const [secondSlide, setSecondSlide] = useState('')
    const [thirdSlide, setThirdSlide] = useState('')

    const [sliderIcon, setSliderIcon] = useState(true)

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
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class={firstSlide} aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" class={secondSlide} aria-current="true"aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" class={thirdSlide} aria-label="Slide 3"></button>
  </div>
    <div class="carousel-inner " >
      <div class={`carousel-item ${firstSlide} w-100`}>
        <img class="w-100" src={imageLinks[0].imgUrl} alt="..."/>
      </div>
      <div class={`carousel-item ${secondSlide} w-100 `}>
        <img class="w-100" src={imageLinks[1].imgUrl} alt="..."/>
      </div>
      {imageLinks[2] && (<div class={`carousel-item ${thirdSlide} w-100`} >
        <img class="w-100" src={imageLinks[2].imgUrl}  alt="..."/>
      </div>)}
      {
        !imageLinks[2] && (
          <div class={`carousel-item ${thirdSlide} w-100`} >
        <img class="w-100" src={imageLinks[1].imgUrl}  alt="..."/>
      </div>
          )
      }
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
