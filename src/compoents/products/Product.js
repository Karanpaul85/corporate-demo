import styles from "./product.module.css";
const Product = ({ data, selectedProduct, thankyou }) => {
	const { id, product_name, img } = data;

	return (
		<div className={`${styles.product} ${thankyou}`} data-id={id} onClick={() => selectedProduct(data)}>
			<div className={styles.productImg}>
				<img src={img} alt={product_name} />
			</div>
			<div className={styles.details}>{product_name}</div>
		</div>
	);
};
export default Product;
