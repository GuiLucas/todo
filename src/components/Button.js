import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ buttonStyle, type, onClick, disabled, children }) => {
	return (
		<button
			className={styles[buttonStyle]}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
