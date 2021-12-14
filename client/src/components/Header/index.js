import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import {    HeaderWrapper,
            HeaderNavLink,
        } from "./StyledHeader";


const Header = () => {

    const [show, setShow] = useState(false)

    // causes header to go transparent on scroll down
    const handleScroll = () => {
        if (window.scrollY > 50){
            setShow(true);
        } else {
            setShow(false);
        }
    }
    // sets event listener to for scrolling for transparent header
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }        
    },[]);

    // start of main return
    return (
        <HeaderWrapper className={show && "blue"}>
            <HeaderNavLink exact to="/">Good Morning.</HeaderNavLink>
        </HeaderWrapper>

    ) //end of main return
}

export default Header;