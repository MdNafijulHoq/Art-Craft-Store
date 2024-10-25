import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-343px)] mt-24 mb-8">
                <Outlet></Outlet> 
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;