import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root.jsx';
import HomePage from './components/Home/HomePage.jsx';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AddCraftItems from './components/AddCraftItems/AddCraftItems.jsx';
import MyArtCraftList from './components/MyArtCraftList/MyArtCraftList.jsx';
import AuthProviders from './AuthProviders/AuthProviders.jsx';
import AllArtCraftitem from './components/AllArtCraftItems/AllArtCraftitem.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import ViewDeatails from './pages/ViewDeatails.jsx';
import UpdateArtCraft from './pages/UpdateArtCraft.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { ToastContainer } from 'react-toastify';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/allartcraftitems",
        element: <AllArtCraftitem></AllArtCraftitem>,
        loader: () => fetch('https://art-craft-store-server-one.vercel.app/artcraftstore'),
      },
      {
        path: "/addcraftitem",
        element: <PrivateRoute><AddCraftItems></AddCraftItems></PrivateRoute>,
      },
      {
        path: "/myartcraftlist",
        element: <PrivateRoute><MyArtCraftList></MyArtCraftList></PrivateRoute>,
        
      },
      {
        path: "/viewdetails/:id",
        element: <PrivateRoute><ViewDeatails></ViewDeatails></PrivateRoute>,
      },
      {
        path: '/updateItem/:id',
        element: <PrivateRoute><UpdateArtCraft></UpdateArtCraft></PrivateRoute>,
        loader: ({params}) => fetch(`https://art-craft-store-server-one.vercel.app/artcraftstore/detailsProduct/${params.id}`)
      },
      {
        path: "/login",
        element: <SignIn></SignIn>,
      },
      {
        path: "/registration",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProviders>
    <RouterProvider router={router} />
    <ToastContainer />
    </AuthProviders> 
  </StrictMode>,
)
