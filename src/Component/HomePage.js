import React,{ useState, useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import Coin from "./Coin.js";
import styles from "./HomePage.module.css";
import { DotWave } from "@uiball/loaders";
//Api coin
import {getCoin} from "../Api/Api";
 

const HomePage = () => {

	const [coins,setCoins] = useState([])
	const [search,setSearch] = useState("")
	useEffect(() => {
		 Crisp.configure("30ffe7b2-f06d-42d4-8fd3-3b205a667492");
		const fetchAPI = async () => {
			const data = await getCoin();
			console.log(data)
			setCoins(data)
		}
		fetchAPI()
	},[])
	const searchHandler = (event)=> {
		setSearch(event.target.value)
	}
	const searchCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
	return (
		<div>
		<h1 className={styles.titr}>صرافی ارز دیجیتال</h1>
		<input type="text" className={styles.search} placeholder="جستجوی ارز دیجیتال"  value={search} onChange={searchHandler}/>
		{ 
			coins.length ?

		<div className={styles.coinContainer}>
		{
			 searchCoin.map(coin => <Coin
			 	key={coin.id}
			 	name={coin.name}
			 	image={coin.image}
			 	symbol={coin.symbol}
			 	price={coin.current_price}
			 	marketCap={coin.market_cap}
			 	priceChange={coin.price_change_percentage_24h}
			 	/>)
		}
		</div>
		: <div className={styles.Loading}>
		 <DotWave size={47} color="#F1C93B" speed={1}/>
		</div>
	}
		</div>
		)
};
export default HomePage;