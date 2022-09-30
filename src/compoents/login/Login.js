import style from "./Login.module.css";
const Login = ({ ...props }) => {
	return (
		<div className={style.transBg}>
			<div className={style.innerSec}>{props.children}</div>
		</div>
	);
};
export default Login;
