import React from "react";
import './DescriptionBox.css';

const DescriptionBox = () =>{
    return(
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An e-commerce website is an outline platform that facilitates the buying and selling of products or services over the internet. It servers as a virtual makerketplace where businesses and individuals can showcase their products interacts with customers and conduct transactions without the need for a physical presence. E-commerce website have gained immense popularity due to their convenience, accessinility and the global reach they offer.</p>
                <p>E-Commerce website typically display products or services along with detailed description, images, prices and any available variations (e.g. sizes,colors). Each product has its own dedicated page with revelent informaion.</p>
            </div>
        </div>
    )
}

export default DescriptionBox;