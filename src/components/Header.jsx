import React from "react";
import yummyIcon from '../assets/images/yummy-icon.svg'


const Header = () => {
    return (
        <div className="header">
            <h1 className="yummy">yummy.</h1>
            <img src={yummyIcon} alt="" className="yummy-icon" />
        </div>
    );
};

export default Header;