import React from 'react';
import Button from '../core/button/Button';
import styles from './Task.module.css';

export default function Task(props) {
	return (
		<div>
			<span
				style={{ textDecoration: props.task.isCompleted ? 'line-through' : '' }}
			>
				{props.task.content}
			</span>
			<Button onClick={() => props.removeTask(props.task)}>X</Button>
			<Button onClick={() => props.updateTask(props.index)}>Complete</Button>
		</div>
	);
}
