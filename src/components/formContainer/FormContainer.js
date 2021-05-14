import React, { useState } from 'react';
import Form from '../core/form/Form';

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
		<Form
			handleSubmit={handleSubmit}
			inputType={'text'}
			inputPlaceholder={'Add a new Task'}
			handleChange={handleChange}
			inputValue={inputValue}
		/>
	);
}
