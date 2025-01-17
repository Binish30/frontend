// import React, { useEffect, useState } from "react";
// import './NewCollections.css'
// import Item from "../Item/Item";

// const NewCollections = () =>{
//     const [new_collection, setNew_Collection] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetch ('http://localhost:4000/newcollections')
//         .then((response) => response.json())
//         .then((data) => setNew_Collection(data));
//     },[])
    
//     return(
//         <div className="newcollections">
//             <h1>New Collections</h1>
//             <hr />
//             <div className="collections">
//                 {new_collection.map((item,i) => {
//                     return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default NewCollections;

// src/components/NewCollections/NewCollections.jsx
import React, { useEffect, useState } from 'react';
import { fetchNewCollections } from '../../api/apiServices';

const NewCollections = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCollections = await fetchNewCollections();
                console.log('Collections fetched:', fetchedCollections);

                // Check if data is an array before setting state
                if (Array.isArray(fetchedCollections)) {
                    setCollections(fetchedCollections);
                } else {
                    console.error('Fetched data is not an array:', fetchedCollections);
                }
            } catch (error) {
                console.error('Error fetching new collections:', error);
            }
        };

        fetchData();
    }, []);

    if (!Array.isArray(collections)) {
        return <div>No collections available</div>;
    }

    return (
        <div>
            <h2>New Collections</h2>
            <div>
                {collections.map((collection, index) => (
                    <div key={index}>
                        <h3>{collection.name}</h3>
                        <p>{collection.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewCollections;
