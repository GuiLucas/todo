import React from 'react';
import styles from './Input.module.css';

export default function Input(props) {
	return (
		<input
			className={styles.textInput}
			type={props.type}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		></input>
	);
}
