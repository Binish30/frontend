// import React from "react";
// import './NewsLetter.css'

// const NewsLetter = () =>{
//     return(
//         <div className="newsletter">
//             <h1>Get Exclusive Offers On Your Email</h1>
//             <p>Subscribe to our newsletter and stay updated</p>
//             <div>
//                 <input type="Email" placeholder="Your Email Id" />
//                 <button>Subscribe</button>
//             </div>
//         </div>
//     )
// }

// export default NewsLetter;

// NewsLetter.jsx
import React, { useState } from "react"; 
import './NewsLetter.css';
import { subscribeToNewsletter } from '../../api/apiServices';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    const response = await subscribeToNewsletter(email);
    if(response.success) {
      alert('Subscribed successfully!');
    } else {
      alert('Failed to subscribe!');
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input 
          type="email" 
          placeholder="Your Email Id" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
