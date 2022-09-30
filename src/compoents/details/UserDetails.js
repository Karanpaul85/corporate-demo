import { useEffect, useState } from "react";
import Input from "../buttons/Input";
import styles from "../login/Login.module.css";
import { useCookies } from "react-cookie";

const UserDetails = ({ showPopup, setIsUserLogin, selected, setShowThankyou, getOrderId }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [err, setErr] = useState(false);
	const [cookies, setCookie] = useCookies();
	useEffect(() => {
		setEmail(cookies.userEmail);
	}, [email]);

	const handleChange = (event) => {
		if (event.target.id === "name") {
			setName(event.target.value);
		} else if (event.target.id === "phone") {
			setPhone(event.target.value);
		} else if (event.target.id === "address") {
			setAddress(event.target.value);
		} else if (event.target.id === "city") {
			setCity(event.target.value);
		} else if (event.target.id === "state") {
			setState(event.target.value);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (name === "" && phone === "" && address === "" && city === "" && state === "") {
			setErrMsg("Please enter your details");
			setErr(true);
		} else if (name === "") {
			setErrMsg("Name is required");
			setErr(true);
		} else if (phone === "") {
			setErrMsg("Phone no. is required");
			setErr(true);
		} else if (address === "") {
			setErrMsg("Address is required");
			setErr(true);
		} else if (city === "") {
			setErrMsg("City is required");
			setErr(true);
		} else if (state === "") {
			setErrMsg("State is required");
			setErr(true);
		} else {
			setErrMsg("");
			setErr(false);
			let orderId = Math.floor(Math.random() * 9999999999);
			let userData = { email, name, phone, address, city, state, productId: selected, orderId };
			getOrderId(orderId);
			setShowThankyou(true);
		}
	};

	const closePopup = () => {
		showPopup(false);
	};
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.heading}>
				Enter your Delivery Details{" "}
				<span className={styles.closeBtn} onClick={closePopup}>
					X
				</span>
			</div>
			{err && <div className={`${styles.divSec} ${styles.err}`}>{errMsg}</div>}
			<div className={styles.divSec}>
				<Input
					id='email'
					type='email'
					value={email}
					require='true'
					placeholder='Enter Your Email*'
					disabled='disabled'
					className={`${styles.input} ${err && email === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input
					id='name'
					type='text'
					value={name}
					require='true'
					placeholder='Enter Your Name*'
					className={`${styles.input} ${err && name === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input
					id='phone'
					type='tel'
					value={phone}
					require='true'
					placeholder='Enter Your Phone No.*'
					className={`${styles.input} ${err && phone === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input
					id='address'
					type='text'
					value={address}
					require='true'
					placeholder='Address*'
					className={`${styles.input} ${err && address === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input
					id='city'
					type='text'
					value={city}
					require='true'
					placeholder='City*'
					className={`${styles.input} ${err && city === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input
					id='state'
					type='text'
					value={state}
					require='true'
					placeholder='State*'
					className={`${styles.input} ${err && state === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input id='submit' type='submit' value='Submit' className={styles.input} />
			</div>
		</form>
	);
};
export default UserDetails;
