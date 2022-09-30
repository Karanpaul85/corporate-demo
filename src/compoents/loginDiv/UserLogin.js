import { useState } from "react";
import Input from "../buttons/Input";
import styles from "../login/Login.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const UserLogin = ({ showPopup, setIsUserLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [err, setErr] = useState(false);
	const [cookies, setCookie] = useCookies();
	const handleChange = (event) => {
		if (event.target.id === "email") {
			setEmail(event.target.value);
		} else if (event.target.id === "password") {
			setPassword(event.target.value);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (email === "" && password === "") {
			setErrMsg("Please enter your details");
			setErr(true);
		} else if (email === "") {
			setErrMsg("Email is required");
			setErr(true);
		} else if (password === "") {
			setErrMsg("Password is required");
			setErr(true);
		} else {
			setErrMsg("");
			setErr(false);
			getUser();
		}
	};

	const getUser = () => {
		axios.get(`/data/userEmails.json`).then((response) => {
			const data = response.data;
			checkUser(data);
		});
	};

	const checkUser = (data) => {
		let isUser = data.some((item) => {
			return item.email === email && item.password === password;
		});
		if (isUser) {
			showPopup(false);
			setIsUserLogin(true);
			let expires = new Date();
			expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000);
			setCookie("userLogin", true, { path: "/", expires });
			setCookie("userEmail", email, { path: "/", expires });
		} else {
			setErrMsg("Incorrect User details");
			setErr(true);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{err && <div className={`${styles.divSec} ${styles.err}`}>{errMsg}</div>}
			<div className={styles.divSec}>
				<Input
					id='email'
					type='email'
					value={email}
					require='true'
					placeholder='Enter Your Email*'
					className={`${styles.input} ${err && email === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input
					id='password'
					type='password'
					value={password}
					require='true'
					placeholder='Enter Your Password*'
					className={`${styles.input} ${err && password === "" ? styles.inputErro : ""}`}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.divSec}>
				<Input id='submit' type='submit' value='Submit' className={styles.input} />
			</div>
		</form>
	);
};
export default UserLogin;
