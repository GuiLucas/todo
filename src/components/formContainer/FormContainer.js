import React, { useState } from 'react';
import { PlusCircle } from 'react-feather';
import Input from '../core/input/Input';
import Button from '../core/button/Button';
import styles from './FormContainer.module.css';

export default function FormContainer(props) {
	const [inputValue, setInputValue] = useState('');

	const handleChange = (value) => {
		setInputValue(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!inputValue) return;

		props.addTask(inputValue);
		setInputValue('');
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				type={'text'}
				placeholder={'Add a new task'}
				value={inputValue}
				onChange={(e) => handleChange(e.target.value)}
			/>
			<Button
				disabled={!inputValue}
				buttonType={'submitButton'}
				onClick={() => handleSubmit}
			>
				<PlusCircle className={inputValue && styles.submitButton} />
			</Button>
		</form>
	);
}
