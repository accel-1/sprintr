import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'next/router';
//import { MetaMaskProvider } from 'metamask-react';
import Meta from '../components/Meta';
//import UserContext from '../components/UserContext';
import { useEffect, useRef } from 'react';
import { ChainId, ThirdwebProvider ,useAddress} from "@thirdweb-dev/react";
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {

	const router = useRouter();
	const pid = router.asPath;
	const scrollRef = useRef({
		scrollPos: 0,
	});


	useEffect(() => {
		// if (pid === '/home/home_8') {
		// 	const html = document.querySelector('html');
		// 	html.classList.remove('light');
		// 	html.classList.add('dark');
		// }
	}, []);

	return (
		<>
			<Meta title="Home 1 || Xhibiter | NFT Marketplace Next.js Template" />
<Provider store={store}>
	
	<ThemeProvider enableSystem={true} attribute="class">
	<ThirdwebProvider

desiredChainId={activeChainId}
authConfig={{
		domain: "example.com",
		authUrl: "/api/auth",
		loginRedirect: "/create",
}}
				
					>
				
								<Layout>
									<Component {...pageProps} />
								</Layout>
						
					</ThirdwebProvider>

				</ThemeProvider>
				</Provider>
			
		</>
	);
}

export default MyApp;
