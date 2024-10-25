import { useEffect, useState } from "react";
import Banner from "../../HomePageSection/Banner/Banner";
import CraftItemSection from "../../HomePageSection/CraftItemSection/CraftItemSection";
import Marquee from "react-fast-marquee";
import ContactMe from "../../pages/ContactMe";




const HomePage = () => {

    const [artCrafts, setArtCrafts] = useState([]);

    useEffect(() => {
        fetch('https://art-craft-store-server-one.vercel.app/artcraftstore')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const limitedArtCrafts = data.reverse().slice(0, 6);
            setArtCrafts(limitedArtCrafts);
        })
        .catch((error) => 
            console.error("Error fetching data:", error)
        );
    },[])

   
    return (
        <div>
            <Banner></Banner>
            <Marquee speed={100} pauseOnHover={true} className="text-center text-base mt-4 mb-8">
            <p className="text-xs text-rose-600 sm:text-sm md:text-base lg:text-lg font-bold">Craft Items Section</p>
          </Marquee>
            <div className="mb-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {
                    artCrafts.map(artCraft => <CraftItemSection
                    key={artCraft._id}
                    artCraft={artCraft}
                    artCrafts={artCrafts}
                    setArtCrafts={setArtCrafts}
                    ></CraftItemSection>)
                }
            </div>
           <div className="mb-32">
           <ContactMe></ContactMe>
           </div>
            
        </div>
    );
};

export default HomePage;