import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CraftItemSection from "../../HomePageSection/CraftItemSection/CraftItemSection";


const AllArtCraftitem = () => {

	const loadedArtCraft = useLoaderData();

	const [artCrafts, setArtCrafts] = useState(loadedArtCraft);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
			{
				artCrafts.slice().reverse().map(artCraft => <CraftItemSection 
					key={artCraft._id}
					artCraft={artCraft}
					artCrafts={artCrafts}
					setArtCrafts={setArtCrafts}
					>
				</CraftItemSection>)

			}
		</div>
    );
};

export default AllArtCraftitem;