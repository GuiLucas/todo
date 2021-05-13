import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import styles from './Form.module.css';

export default function Form(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<Input
				type={props.inputType}
				placeholder={props.inputPlaceholder}
				value={props.inputValue}
				onChange={(e) => props.handleChange(e.target.value)}
			/>
			{/* <Button>Add</Button> */}
		</form>
	);
}
