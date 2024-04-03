import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import { connectWallet, runContractFunction, getFunctionParams } from '../../scripts/SmartContractOperator';
import {mintNFT, getOpenSeaLink, getJSONfromIPFS, setUserTokenID, setUserMetadata, setUserAvatarURI} from '../../scripts/SmartContractOperator';


import meliora_comic_cover_image from '../../image/meliora_comic_cover.png'
import meliora_comic_description_image from '../../image/meliora_comic_description.png'
import mint_button_image from '../../image/mint_comic_button.png'
import play_read_button_image from '../../image/play_read_button.png'
import sign_up_image from '../../image/sign_up_button.png'
import blank_button_image from '../../image/blank_button.png'

import './comics.css'

var opensea_link = '';

const Comics = () => {

  let { user_address, setAddress_Context } = useContext(SmartContractContext);
  let { user_balance, setBalance_Context } = useContext(SmartContractContext);
  let { network_name, setNetwork_Context } = useContext(SmartContractContext);
  let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
  let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
  let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);
  let { contract_name, setContractName_Context } = useContext(SmartContractContext);

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.10)';
  };
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  };

  async function mouseClick(event) {
    if (event.target.id === 'comicsMintButton') {
      await setUserWalletInfo();
      const opensea_link_button = document.getElementById("comicsOpenSeaLink");
      opensea_link_button.style.display = 'block';
      const token_ID = await runContractFunction(contract_name, 'mint', [], opensea_link_button);
      console.log('token_ID', token_ID);
      opensea_link = await getOpenSeaLink(contract_name, token_ID);
      opensea_link_button.textContent = "View on OpenSea";
      opensea_link_button.href = opensea_link;
      opensea_link_button.target = '_blank';
    };
  };



  async function setUserWalletInfo() {
    network_name = 'sepolia';
    await setNetwork_Context(network_name);
    const user_wallet_info = await connectWallet(network_name);
    user_address = user_wallet_info['address'];
    await setAddress_Context(user_address);
    user_balance = user_wallet_info['balance'];
    contract_name = 'MelioraComicV1';
    await setContractName_Context(contract_name);
  };

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
            <img data-aos="fade-left" src={mint_button_image} alt='' onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='comicsMintButton' className='comicsButton comicsMintButton' />
            <a href={window.location.href + 'comics/meliora/volume1/play'}>
              <img data-aos="fade-left" src={play_read_button_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='comicsDescriptionButton' className='comicsButton comicDescriptionButton' />
            </a>
            {/* <a href="https://nofunz.one/signup" target='_blank'>
              <img data-aos="fade-left" src={sign_up_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='signUpButton' className='comicsButton signUpButton' />
            </a> */}
            
          </div>
          
        </div>
        
      </div>
      <div className='comicsOpenSeaLinkContainer'>
          <a id='comicsOpenSeaLink' className='comicsOpenSeaLink' href={opensea_link} target='_blank'>Executing</a>
        </div>
    </div>
  )
}

export default Comics
