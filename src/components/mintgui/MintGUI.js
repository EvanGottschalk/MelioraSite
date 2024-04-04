import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import Aos from "aos";
import "aos/dist/aos.css";

import { connectWallet, runContractFunction, getFunctionParams } from '../../scripts/SmartContractOperator';
import {mintNFT, getOpenSeaLink, getJSONfromIPFS, setUserTokenID, setUserMetadata, setUserAvatarURI} from '../../scripts/SmartContractOperator';


import meliora_comic_cover_image from '../../image/meliora_comic_cover.png'
import meliora_comic_description_image from '../../image/meliora_comic_description.png'
import mint_button_image from '../../image/mint_comic_button.png'
import play_read_button_image from '../../image/play_read_button.png'
import sign_up_image from '../../image/sign_up_button.png'
import blank_button_image from '../../image/blank_button.png'

import './mintgui.css'

var opensea_link = '';

const MintGUI = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  let { user_address, setAddress_Context } = useContext(SmartContractContext);
  let { user_balance, setBalance_Context } = useContext(SmartContractContext);
  let { network_name, setNetwork_Context } = useContext(SmartContractContext);
  let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
  let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
  let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);
  let { contract_name, setContractName_Context } = useContext(SmartContractContext);

  network_name = 'sepolia';
  contract_name = 'MelioraComicV1';
  user_address = false;
  var total_minted = 0; //runContractFunction(contract_name, 'getTotalSupply');

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.10)';
  };
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  };

  async function mouseClick(event) {
    await setUserWalletInfo();
    if (event.target.id === 'mintButton1') {
      await executeMint(1);
    } else if (event.target.id === 'mintButton5') {
      await executeMint(5);
    } else if (event.target.id === 'mintButtonCustom') {
      if (Number(document.getElementById("mintButtonCustom").value) >= 0) {
        await executeMint(Number(document.getElementById("mintButtonCustom").value));
      }
    } else if(event.target.id === 'readButton') {
      window.open('https://bafybeictavxgorrl67f2dsvfafu4zfdhts52bg7fystxeiz2bcnxkggb6y.ipfs.nftstorage.link/#p=1', '_blank');
    };
    await updateTotalMinted();
  };

  async function executeMint(amount) {
    const opensea_link_button = document.getElementById("mintguiOpenSeaLink");
    opensea_link_button.style.display = 'block';
    const token_ID = await runContractFunction(contract_name, 'mint', [], opensea_link_button);
    console.log('token_ID', token_ID);
    opensea_link = await getOpenSeaLink(contract_name, token_ID);
    opensea_link_button.textContent = "View on OpenSea";
    opensea_link_button.href = opensea_link;
    opensea_link_button.target = '_blank';
  };

  
  async function setUserWalletInfo() {
    await setNetwork_Context(network_name);
    const user_wallet_info = await connectWallet(network_name);
    user_address = user_wallet_info['address'];
    await setAddress_Context(user_address);
    user_balance = user_wallet_info['balance'];
    await setContractName_Context(contract_name);
    await updateTotalMinted();
    document.getElementById('connectContainer').style.display = 'none';
    document.getElementById('infoContainer').style.display = 'inline-block';
    document.getElementById('mintContainer1').style.display = 'inline-block';
    document.getElementById('mintContainer2').style.display = 'inline-block';
    document.getElementById('mintguiRightContainer').style.width = '45%';
  };

  async function updateTotalMinted() {
    const total_minted_display = document.getElementById('totalMinted');
    total_minted = await runContractFunction(contract_name, 'getCurrentSupply');
    total_minted_display.textContent = 'Total Minted: ' + total_minted.toString();
  };



  return (
    <div className='mintgui'>
      <div className='mintguiLeftContainer'>
        <div className='mintguiLeftTop'>
          <div className='mintguiImageContainer1'>
            <img data-aos="fade-right" src={meliora_comic_cover_image} alt='' id='comicCoverImage' className='mintguiImage comicCoverImage'  />
          </div>
        </div>
      </div>
      <div className='mintguiRightContainer' id='mintguiRightContainer'>
        <div className='mintguiRightInnerContainer'>
          <img data-aos="fade-left" src={meliora_comic_description_image} alt='' id='comicDescriptionImage' className='mintguiImage comicDescriptionImage' />
        </div>
        <div id='connectContainer' className='mintguiConnectContainer buttonGroupContainer' style={(user_address) ? {display: "none"} : {display: "inline-block"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='connectButton' className='mintguiButton connectButton'>
              Connect Wallet
            </span>
          </div>
        </div>
        <div id='infoContainer' className='mintguiInfoContainer buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintPrice' className='mintguiInfo mintButton'>
              Mint Price: .01 ETH
            </span>
            <span data-aos="fade-left" onMouseOver={mouseover} onMouseLeave={mouseleave} id='totalMinted' className='mintguiInfo readButton'>
              Total Minted:
            </span>
          </div>
          <div className='mintButtonContainer buttonContainer'>
            
          </div>
          {/* <img data-aos="fade-left" src={mint_button_image} alt='' onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintguiMintButton' className='mintguiButton mintguiMintButton' />
          <a href={window.location.href + 'mintgui/meliora/volume1/play'}>
            <img data-aos="fade-left" src={play_read_button_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintguiDescriptionButton' className='mintguiButton comicDescriptionButton' />
          </a> */}
        </div>
        <div id='mintContainer1' className='mintguiButtonsContainer1 buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintButton1' className='mintguiButton mintButton'>
              Mint 1 for .01 ETH
            </span>
            <span data-aos="fade-left" onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintButton5' className='mintguiButton readButton'>
              Mint 5 for .05 ETH
            </span>
          </div>
          <div className='mintButtonContainer buttonContainer'>
            
          </div>
          {/* <img data-aos="fade-left" src={mint_button_image} alt='' onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintguiMintButton' className='mintguiButton mintguiMintButton' />
          <a href={window.location.href + 'mintgui/meliora/volume1/play'}>
            <img data-aos="fade-left" src={play_read_button_image} alt='' onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintguiDescriptionButton' className='mintguiButton comicDescriptionButton' />
          </a> */}
        </div>
        <div id='mintContainer2' className='mintguiButtonsContainer2 buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={mouseClick} onMouseOver={mouseover} onMouseLeave={mouseleave} id='mintButtonCustom' className='mintguiButton mintButton'>
              Mint Custom Amount
            </span>
            <span data-aos="fade-left" id='readButton' className='mintguiInputField readButton'>
              <input className='amountEntry' id='amountEntry' placeholder="# of Copies" type="number"/>
            </span>
          </div>
        </div>
      </div>
      <div className='mintguiOpenSeaLinkContainer'>
        <a id='mintguiOpenSeaLink' className='mintguiOpenSeaLink' href={opensea_link} target='_blank'>Executing</a>
      </div>
    </div>
  )
}

export default MintGUI