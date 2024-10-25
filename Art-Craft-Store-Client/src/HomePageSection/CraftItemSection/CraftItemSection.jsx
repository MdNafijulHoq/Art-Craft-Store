import React from 'react';
import { Link } from 'react-router-dom';


const CraftItemSection = ({artCraft, artCrafts, setArtCrafts}) => {
   // * Get user info from the artCraft object
    const { photo, itemName, shortDescription, name, email, photoURL } = artCraft;  


    return (
        <div className="border max-w-xs mx-auto p-6 shadow-purple-700 hover:shadow-purple-600 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 hover:border-purple-500 hover:shadow-2xl" bis_skin_checked="1">
            <div className="flex items-center space-x-2 mb-4" bis_skin_checked="1">
                  {/* Display the user information stored with the item  */}
			<img src={photoURL || ""} alt="user" className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
			<div className="-space-y-1" bis_skin_checked="1">
				<h2 className="text-sm font-semibold leading-none">{name || "User Name"}</h2>
				<span className="inline-block text-xs leading-none dark:text-gray-600">{email || "email@gmail.com"}</span>
			</div>
		</div>
	<img src={photo} alt="" className="object-cover object-center w-full rounded-md h-48 dark:bg-gray-500" />
	<div className="mt-2 mb-1" bis_skin_checked="1">
		<h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{itemName}</h2>
        
	</div>
    <p className="dark:text-gray-800 text-xs overflow-hidden text-ellipsis whitespace-nowrap">{shortDescription}</p>
    <Link to={`/viewdetails/${artCraft._id}`}><button className="btn w-full mt-3 btn-sm btn-info">View Details</button></Link>
	
</div>
    );
};

export default CraftItemSection;