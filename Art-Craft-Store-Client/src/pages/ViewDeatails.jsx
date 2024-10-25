import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthProviders/AuthProviders';

const ViewDeatails = () => {
    const {users} = useContext(AuthContext);
    
  
    const { id } = useParams();
    console.log('loeras id is:', id)
    const [details, setDetails] = useState([]);
    

    useEffect(() => {
        fetch(`https://art-craft-store-server-one.vercel.app/artcraftstore/detailsProduct/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDetails(data)
        })
    },[id])
   
    if(users){
       return  <div className="min-h-screen flex justify-center items-start pt-10 mb-20">
  
  <div className="card lg:flex-col flex-col bg-white shadow-md hover:shadow-2xl shadow-fuchsia-700 hover:shadow-fuchsia-700 rounded-lg overflow-hidden w-full max-w-md lg:max-w-3xl h-auto mx-auto transition duration-300 ease-in-out transform hover:scale-105">
    
   
    <figure className="w-full h-64 lg:h-[500px]"> 
      <img
        src={details.photo}
        alt={details.itemName}
        className="w-full h-full object-cover object-center" 
      />
    </figure>

    
    <div className="card-body p-4 lg:p-6 space-y-4">
      
   
      <h3 className="text-xl font-bold text-gray-800">{details.itemName}</h3>
      <h4 className="text-lg font-medium text-gray-600">{details.subcategory}</h4>
      
    
      <p className="text-gray-700 text-sm lg:text-base">{details.shortDescription}</p>

      
      <div className='flex justify-between items-center text-sm lg:text-base text-gray-500'>
        <p>Rating: <span className="font-medium text-gray-700">{details.rating}</span></p>
        <p>Processing Time: <span className="font-medium text-gray-700">{details.processingTime}</span></p>
        <p>Price: <span className="font-medium text-gray-700">{details.price} TAKA</span></p>
      </div>

      
      <div className='flex justify-between items-center text-sm lg:text-base text-gray-500'>
        <p>Customization: <span className="font-medium text-gray-700">{details.customization}</span></p>
        <p>Stock Status: <span className="font-medium text-gray-700">{details.stockStatus}</span></p>
      </div>
      
    </div>
  </div>
</div>
    }
    return <Navigate to='/login'>Sign In</Navigate>
};

export default ViewDeatails;