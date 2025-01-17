// import React from "react";
// import './RelatedProducts.css';
// import data_product from "../assets/data";
// import Item from "../Item/Item";

// const RelatedProducts = () =>{
//     return(
//         <div className="relatedproducts">
//             <h1>Related Products</h1>
//             <hr />
//             <div className="relatedproducts-item">
//                 {data_product.map((item,i) => {
//                     return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//                 })}
//             </div>
                
//         </div>
//     )
// }

// export default RelatedProducts;

import React, { useState, useEffect } from "react";
import './RelatedProducts.css';
import { getRelatedProducts } from '../../api/apiServices';  // Import your API service
import Item from "../Item/Item";

const RelatedProducts = () => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        // Fetch related products from API
        getRelatedProducts()
            .then(data => setRelatedProducts(data))
            .catch(error => console.error("Error fetching related products:", error));
    }, []);

    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.map((item, i) => {
                    return (
                        <Item
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedProducts;
