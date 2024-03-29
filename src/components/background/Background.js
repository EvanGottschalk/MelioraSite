import React from 'react'

import background1 from '../../image/background1.png'
//import background2 from '../../image/background2.png'
//import background3 from '../../image/background3.png'


import './background.css'

const Background = () => {
  
  window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.background1Container');
    let scrollPosition = window.scrollY;

    parallax.style.transform = 'translateY(' + scrollPosition * 0.7 + 'px)';
  });

  return (
    <div className='background1Container'>
      <img src={background1} alt='' className='background1' />
    </div>
  )
}

export default Background