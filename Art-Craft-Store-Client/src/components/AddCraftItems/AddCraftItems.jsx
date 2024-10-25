import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";


const AddCraftItems = () => {

	const {users} = useContext(AuthContext)

	const [artCrafts, setArtCrafts] = useState([]); // Add this line to manage the state

	const handleAddCraftItems = e => {
		e.preventDefault();
		const form = e.target;
		const name = users?.displayName || form.name.value;  // Use the logged-in user's name if available
    	const email = users?.email || form.email.value;  // Use the logged-in user's email
		const itemName = form.itemName.value;
		const subcategory = form.subcategory.value;
		const shortDescription = form.shortDescription.value;
		const price = form.price.value;
		const rating = form.rating.value;
		const photo = form.photo.value;
		const customization = form.customization.value;
		const processingTime = form.processingTime.value;
		const stockStatus = form.stockStatus.value;
		const photoURL = users?.photoURL || "";  // Add the user's photoURL
		
		
		const addCraftItems = { name, email, photoURL, itemName, subcategory, shortDescription, price, rating, photo, customization, processingTime, stockStatus };
		console.log(addCraftItems)

		// * Sending add craft items value to server site
		fetch('https://art-craft-store-server-one.vercel.app/artcraftstore', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(addCraftItems)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.insertedId){
				Swal.fire("Items Added Successfully");

				// Update the list with the newly added item at the top
				setArtCrafts(prevArtCrafts => [addCraftItems, ...prevArtCrafts.slice(0, 5)]);

				form.reset();
			}
		})
	}
    return (
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
	<form onSubmit={handleAddCraftItems} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1" bis_skin_checked="1">
				<p className="font-medium">Add Art&Craft Inormation</p>
				
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3" bis_skin_checked="1">
				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">User Name</label>
					<input type="text" name="name" defaultValue={users?.displayName || ""} placeholder="name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Email</label>
					<input type="email" name="email" defaultValue={users?.email || ""} placeholder="kabir12@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Item Name</label>
					<input type="text" name="itemName" placeholder="item name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Subcategory Name</label>
					<input type="text" name="subcategory" placeholder="subcategory name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Short Description</label>
					<input name="shortDescription" type="text" required placeholder="short description" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Price</label>
					<input type="number" name="price" required placeholder="500" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-3" bis_skin_checked="1">
					<label className="text-sm">Rating</label>
					<select name="rating" className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required>
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
					<input type="text" name="photo" required placeholder="https:://" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-2" bis_skin_checked="1">
					<label className="text-sm">Customization</label>
					<select name="customization" required className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
  						<option disabled >customization?</option>
 						 	<option>no</option>
						 	<option>yes</option>
						</select>
				</div>
				

				<div className="col-span-full sm:col-span-2" bis_skin_checked="1">
					<label className="text-sm">Processing Time</label>
					<input name="processingTime" required type="text" placeholder="4 hour / 3 days" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
				</div>

				<div className="col-span-full sm:col-span-2" bis_skin_checked="1">
					<label className="text-sm">Stock Status</label>
					<select name="stockStatus" required className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
  						<option disabled value=''>stockStatus</option>
 						 	<option>In stock</option>
						 	<option>Made to Order</option>
						</select>
				</div>
				<div className="col-span-full flex justify-center items-center" bis_skin_checked="1">
					<button className="btn btn-primary w-full">Add Items</button>
				</div>
			</div>
		</fieldset>
		
	</form>
</section>
    );
};

export default AddCraftItems;