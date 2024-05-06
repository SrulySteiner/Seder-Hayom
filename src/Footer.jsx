import React from 'react';
import logo from './assets/SefariaLogo.png'

function Footer(){
    return(
        <div class="flex flex-col justify-center">
            <img class="object-scale-down h-12 w-24" src={logo} alt="logo"/>
            <span class="text-sm">For issues and bugs contact: <a class="text-sm hover:underline decoration-sky">sssulysteiner@gmail.com</a></span>
        </div>
    );
}

export default Footer;
