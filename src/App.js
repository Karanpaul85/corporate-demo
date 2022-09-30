import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import Product from "./compoents/products/Product";
import Login from "./compoents/login/Login";
import UserLogin from "./compoents/loginDiv/UserLogin";
import UserDetails from "./compoents/details/UserDetails";
import { useCookies } from "react-cookie";
import Thankyou from "./compoents/thankyou/Thankyou";

function App() {
	const [proData, setProData] = useState([]);
	const [userLogin, setUserLogin] = useState(true);
	const [isUserLogin, setIsUserLogin] = useState(false);
	const [selected, setSelected] = useState({});
	const [cookies] = useCookies();
	const [showThankyou, setShowThankyou] = useState(false);
	const [orderId, setOrderId] = useState(0);
	const getCookies = cookies && Object.keys(cookies).length ? cookies : "";
	useEffect(() => {
		if (getCookies.userLogin !== "undefined" && getCookies.userEmail !== "undefined") {
			setUserLogin(false);
			setIsUserLogin(true);
		}
		axios.get(`/data/products.json`).then((response) => {
			const data = response.data;
			setProData(data);
		});
	}, [isUserLogin]);

	const selectedProduct = (pro) => {
		setSelected(pro);
		setUserLogin(true);
	};
	return (
		<>
			<div className={styles.App}>
				<div className={styles.container}>
					<div className={styles.proContainer}>
						{proData &&
							proData.length &&
							proData.map((pro) => {
								return <Product data={pro} key={pro.id} selectedProduct={selectedProduct} />;
							})}
					</div>
				</div>
			</div>
			{userLogin && (
				<Login>
					{!isUserLogin && <UserLogin showPopup={setUserLogin} setIsUserLogin={setIsUserLogin} />}
					{isUserLogin && !showThankyou && (
						<UserDetails
							showPopup={setUserLogin}
							setIsUserLogin={setIsUserLogin}
							selected={selected.id}
							setShowThankyou={setShowThankyou}
							getOrderId={setOrderId}
						/>
					)}
					{showThankyou && (
						<Thankyou selected={selected} orderId={orderId} showPopup={setUserLogin} setIsUserLogin={setIsUserLogin} showThankyou={setShowThankyou} />
					)}
				</Login>
			)}
		</>
	);
}

export default App;
