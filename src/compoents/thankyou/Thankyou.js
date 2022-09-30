import Product from "../products/Product";
import styles from "./thankyou.module.css";
import stylesBtn from "../login/Login.module.css";
import Input from "../buttons/Input";
import { useCookies } from "react-cookie";

const Thankyou = ({ selected, orderId, showPopup, setIsUserLogin, showThankyou }) => {
	const [cookies, removeToken] = useCookies(["userLogin"]);

	const confirm = () => {
		showPopup(true);
		setIsUserLogin(false);
		showThankyou(false);
		removeToken(["userLogin"]);
		removeToken(["userEmail"]);
		// cookies.remove("userLogin", { path: "/" });
		// cookies.remove("userEmail", { path: "/" });
	};

	return (
		<div className={styles.thankyou}>
			<h1>Thankyou</h1>
			<h3>Your order has been confirmed</h3>
			{orderId > 0 ? <h3>OrderId is #{orderId}</h3> : ""}
			<Product data={selected} thankyou={styles.full} />
			<div className={styles.confirm}>
				<Input id='submit' type='button' value='close' className={stylesBtn.input} onClick={confirm} />
			</div>
		</div>
	);
};
export default Thankyou;
