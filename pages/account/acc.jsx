import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import Image from 'next/image';
//import Link from 'next/link';
//import Social_dropdown from '../../components/dropdown/Social_dropdown';
//import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
//import user_data from '../../data/user_data';
//import User_items from '../../components/user/User_items';
//import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
//import { CopyToClipboard } from 'react-copy-to-clipboard';
//import Head from 'next/head';
import Meta from '../../components/Meta';
import {getUser} from "../api/auth/[...thirdweb]"
import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { MediaRenderer ,useAddress} from "@thirdweb-dev/react";
import {Tab , Tabs,TabList,TabPanel} from "react-tabs"


export default  function User ({json}){


const address=useAddress()
	const [itemActive, setItemActive] = useState(1);
	const tabItem = [
		{
			id: 1,
			text: 'on sale',
			icon: 'on-sale',
		},
		{
			id: 2,
			text: 'owned',
			icon: 'owned',
		},
		

		
	]


	const router = useRouter();
	const pid = router.query.user;
	// console.log(pid);

	const [likesImage, setLikesImage] = useState(false);
	const [copied, setCopied] = useState(false);

	const backtojson=JSON.parse(json)
 console.log("nfts",backtojson)

	const handleLikes = () => {
		if (!likesImage) {
			setLikesImage(true);
		} else {
			setLikesImage(false);
		}
	};



	return (
		<>
			<Meta title="User || Xhibiter | NFT Marketplace Next.js Template" />

			
					<h1>meow</h1>
						
       <Tabs className="">
							<TabList className="">

							{tabItem.map(({ id, text, icon }) => {
								return (
									<Tab
										className=""
										role="presentation"
										key={id}
										onClick={() => setItemActive(id)}
									>
										<button
											className={
												itemActive === id
													? 'nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active'
													: 'nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white'
											}
										>
											<svg className="icon mr-1 h-5 w-5 fill-current">
												<use xlinkHref={`/icons.svg#icon-${icon}`}></use>
											</svg>
											<span className="font-display text-base font-medium">{text}</span>
										</button>
									</Tab>
								);
							})}


								</TabList>

								<TabPanel></TabPanel>
								<TabPanel>
			

								</TabPanel>


							</Tabs>


			
		</>
	);
};






export async function getServerSideProps({req,res}) {


 const user = await getUser(req);

  
  if (!user) {
   return {
    redirect: {
      permanent: false,
      destination: "/",
    }
     
  }
 }



 const address =user.address;
 
 const chain = EvmChain.MUMBAI;
 
 await Moralis.start({
     apiKey: 'dQqwOfyiJmUmbpw1HFDevR2hAIVyqci43mab0bY8XzhMm2qMiQH9ZIidjMFiP6Jx',
     // ...and any other configuration
 });
 
 const response = await Moralis.EvmApi.nft.getWalletNFTs({
     address,
     chain,
 });
 console.log(response);
 


 let json=JSON.stringify(response)  


 return {
   props: {json},
 }


}