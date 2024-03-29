import React from 'react'

import melioraComicCover from '../../image/meliora_comic_cover.png'



import './mintgui.css'

const MintGUI = () => {

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='mintgui'>
      <div className='mintguiLeftContainer'>
        <div className='mintguiTextContainer'>
          <div className='mintguiText mintguiTitle' data-aos="fade-right" data-aos-delay="100">Co-founder at NoFun Labs</div>
          <div className='mintguiText mintguiTagline' data-aos="fade-right" data-aos-delay="200" style={{
            textDecoration: 'none',
            color: '#00ef63'}}>- Blockchain Onboarding Solutions -</div>
          <div className='mintguiText' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Start onboarding your next 1,000,000 users now:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/nofunlabs' target="_blank" 
          className='mintguiText mintguiLink' id='nofunlabsLink' onMouseOver={mouseover} onMouseLeave={mouseleave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>evanon.earth/nofunlabs -></a>
          <br></br>
          <div data-aos="fade-right"  data-aos-delay="500" className='mintguiText mintguiTitle'>Advisor at BrightID</div>
          <div data-aos="fade-right" data-aos-delay="600" className='mintguiText mintguiTagline' style={{
            textDecoration: 'none',
            color: '#ff9500'}}>- Decentralized Identity Protocol -</div>
          <div data-aos="fade-right" data-aos-delay="700" className='mintguiText' style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Your identity, your privacy, all in your custody. No "orb" required:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/brightid' target="_blank"
          className='mintguiText mintguiLink' id='brightidLink' onMouseOver={mouseover} onMouseLeave={mouseleave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>evanon.earth/brightid -></a>
          <br></br>
          <div data-aos="fade-right" data-aos-delay="900" className='mintguiText mintguiTitle'>Advisor at Unitap</div>
          <div data-aos="fade-right" data-aos-delay="1000" className='mintguiText mintguiTagline' style={{
            textDecoration: 'none',
            color: '#ea49ff'}}>- Universal Token Distribution Platform -</div>
          <div data-aos="fade-right" data-aos-delay="1100" className='mintguiText' style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Grow your dapp's userbase with free gas and token raffles:</div>
          <a data-aos="flip-down" data-aos-delay="00" href='https://evanon.earth/unitap' target="_blank"
          className='mintguiText mintguiLink' id='unitapLink' onMouseOver={mouseover} onMouseLeave={mouseleave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>evanon.earth/unitap -></a>
        </div>
      </div>
      <div className='mintguiRightContainer'>
        <div className='mintguiRightTop'>
          <div className='mintguiImageContainer'>
            <img data-aos="fade-left" src={melioraComicCover} alt='' className='mintguiImage' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintGUI
