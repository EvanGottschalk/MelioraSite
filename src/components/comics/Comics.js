import React from 'react'

import meliora_comic_cover_image from '../../image/meliora_comic_cover.png'
import meliora_comic_description_image from '../../image/meliora_comic_description.png'
import mint_button_image from '../../image/mint_comic_button.png'
import play_read_button_image from '../../image/play_read_button.png'
import sign_up_image from '../../image/sign_up_button.png'



import './comics.css'

const Comics = () => {

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.10)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='comics'>
      <div className='comicsLeftContainer'>
        <div className='comicsLeftTop'>
          <div className='comicsImageContainer1'>
            <img data-aos="fade-right" src={meliora_comic_cover_image} alt='' id='comicCoverImage' className='comicsImage comicCoverImage'  />
          </div>
        </div>
      </div>
      <div className='comicsRightContainer'>
        <div className='comicsRightTop'>
          <div className='comicsImageContainer2'>
            <img data-aos="fade-left" src={meliora_comic_description_image} alt='' id='comicDescriptionImage' className='comicsImage comicDescriptionImage' />
          </div>
          <div className='comicsButtonsContainer'>
            {/* <img data-aos="fade-left" src={mint_button_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='comicsMintButton' className='comicsButton comicsMintButton' />
            <img data-aos="fade-left" src={play_read_button_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='comicsDescriptionButton' className='comicsButton comicDescriptionButton' /> */}
            <a href="https://nofunz.one/signup" target='_blank'>
              <img data-aos="fade-left" src={sign_up_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='signUpButton' className='comicsButton signUpButton' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comics
