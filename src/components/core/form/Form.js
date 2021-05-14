import React from 'react';
import Input from '../input/Input';

export default function Form(props) {
	return (
		<form style={{ marginBottom: '2rem' }} onSubmit={props.handleSubmit}>
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
