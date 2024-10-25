import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyArtCraftList = () => {
  const { users } = useContext(AuthContext) || {};
  const [itemAdd, setItemAdd] = useState([]);
  const [control, setControl] = useState(false);

  

  useEffect(() => {
    fetch(`https://art-craft-store-server-one.vercel.app/artcraftstore/${users?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItemAdd(data);
      });
  }, [users,control]);

  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://art-craft-store-server-one.vercel.app/artcraftstore/delete/${id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
          console.log(data) 
          if(data.deletedCount > 0){
            setControl(!control)
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })
      }
    });
  }

  

  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {itemAdd?.map((item, index) => (
        <div
          key={item.id || index} 
          className="border max-w-xs mx-auto p-4 shadow-purple-700 hover:shadow-purple-600 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 hover:border-purple-500 hover:shadow-2xl"
        >
          <div className="flex items-center space-x-2 mb-4">
           
            <img
              src={users?.photoURL || ""}
              alt="user"
              className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300"
            />
            <div className="-space-y-1">
              <h2 className="text-sm font-semibold leading-none">
                {users?.displayName || "User Name"}
              </h2>
              <span className="inline-block text-xs leading-none dark:text-gray-600">
                {users?.email || "email@gmail.com"}
              </span>
            </div>
          </div>
          <img
            src={item.photo}
            alt=""
            className="object-cover object-center w-full rounded-md h-48 dark:bg-gray-500"
          />
          <div className="mt-2 mb-1">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {item.itemName}
            </h2>
          </div>
          <p className="dark:text-gray-800 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {item.shortDescription}
          </p>
          <div className="flex flex-col space-y-2 mt-3">
            <Link to={`/updateItem/${item._id}`}><button className="btn w-full btn-sm btn-info">
              Update
            </button></Link>
            <button onClick={() => handleDelete(item._id)} className="btn w-full btn-sm btn-danger">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default MyArtCraftList;
