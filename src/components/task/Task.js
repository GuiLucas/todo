import React from 'react';
import Button from '../core/button/Button';
import { XCircle, CheckCircle } from 'react-feather';
import styles from './Task.module.css';

export default function Task(props) {
	return (
		<div className={styles.task}>
			<span>{props.task.content}</span>
			<Button
				buttonType={'defaultButton'}
				onClick={() => props.removeTask(props.task)}
			>
				<XCircle />
			</Button>
			<Button
				buttonType={'defaultButton'}
				onClick={() => props.updateTask(props.task)}
			>
				<CheckCircle />
			</Button>
		</div>
	);
}
