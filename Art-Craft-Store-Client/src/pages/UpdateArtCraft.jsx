import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProviders/AuthProviders';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateArtCraft = () => {

    const {users} = useContext(AuthContext);
    const laodedItem = useLoaderData()
    // console.log(laodedItem);
    const {id} = useParams()

    const [formData, setFormData] = useState(laodedItem);
    const navigate = useNavigate();

    useEffect( () => {
        fetch(`https://art-craft-store-server-one.vercel.app/artcraftstore/detailsProduct/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setFormData(data)
        })
    },[formData,id])
  
    

    const handleUpdateCraftItems = e => {
		e.preventDefault();
		const form = e.target;
		const itemName = form.itemName.value;
		const subcategory = form.subcategory.value;
		const shortDescription = form.shortDescription.value;
		const price = form.price.value;
		const rating = form.rating.value;
		const photo = form.photo.value;
		const customization = form.customization.value;
		const processingTime = form.processingTime.value;
		const stockStatus = form.stockStatus.value;
		
		const updateCraftItems = { itemName, subcategory, shortDescription, price, rating, photo, customization, processingTime, stockStatus };
		console.log(updateCraftItems);

        fetch(`https://art-craft-store-server-one.vercel.app/artcraftstore/detailsProduct/${laodedItem._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateCraftItems)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: "Update Successfully!",
                    text: "Click ok to see updated details.",
                    imageUrl: users?.photoURL ? `${users.photoURL}` : "https://unsplash.it/400/200",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                  });
                
                  setFormData('');
                  navigate(`/viewdetails/${id}`)

            }
            
        })
    }
    

    return (
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
	<form onSubmit={handleUpdateCraftItems} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1" bis_skin_checked="1">
				<p className="font-medium">Update Art&Craft Inormation</p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3" bis_skin_checked="1">
				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">User Name</label>
					<input readOnly type="text" name="name" defaultValue={users?.displayName || ""} placeholder="name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Email</label>
					<input readOnly type="email" name="email" defaultValue={users?.email || ""} placeholder="kabir12@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Item Name</label>
					<input type="text" defaultValue={formData.itemName} name="itemName" placeholder="item name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Subcategory Name</label>
					<input defaultValue={formData.subcategory} type="text" name="subcategory" placeholder="subcategory name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Short Description</label>
					<input defaultValue={formData.shortDescription} name="shortDescription" type="text" required placeholder="short description" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Price</label>
					<input defaultValue={formData.price} type="number" name="price" required placeholder="500" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Rating</label>
					<select defaultValue={formData.rating} name="rating" className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required>
  						<option disabled value=''>rating?</option>
 						 	<option value=''>0</option>
 						 	<option>1</option>
						 	<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
				</div>

				<div className="col-span-full" bis_skin_checked="1">
					<label className="text-sm">photoURL</label>
					<input defaultValue={formData.photo} type="text" name="photo" required placeholder="https:://" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-2" bis_skin_checked="1">
					<label className="text-sm">Customization</label>
					<select defaultValue={formData.customization} name="customization" required className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
  						<option disabled >customization?</option>
 						 	<option>no</option>
						 	<option>yes</option>
						</select>
				</div>
				

				<div className="col-span-full sm:col-span-2" bis_skin_checked="1">
					<label className="text-sm">Processing Time</label>
					<input defaultValue={formData.processingTime} name="processingTime" required type="text" placeholder="4 hour / 3 days" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-2" bis_skin_checked="1">
					<label className="text-sm">Stock Status</label>
					<select defaultValue={formData.stockStatus} name="stockStatus" required className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
  						<option disabled value=''>stockStatus</option>
 						 	<option>In stock</option>
						 	<option>Made to Order</option>
						</select>
				</div>
				<div className="col-span-full flex justify-center items-center" bis_skin_checked="1">
					<button className="btn btn-primary w-full">Update</button>
				</div>
			</div>
		</fieldset>
		
	</form>
</section>
    );
};

export default UpdateArtCraft;

