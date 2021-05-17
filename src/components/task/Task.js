import React from 'react';
import Button from '../core/button/Button';
import { XCircle, CheckCircle } from 'react-feather';
import styles from './Task.module.css';

export default function Task(props) {
	return (
		<div className={styles.task}>
			<p
				className={styles.taskContent}
				style={{
					textDecoration: props.task.isCompleted ? 'line-through' : '',
				}}
			>
				{props.task.content}
			</p>
			<div className={styles.buttonGroup}>
				<Button
					buttonType={'defaultButton'}
					onClick={() => props.removeTask(props.task)}
				>
					<XCircle className={styles.removeButton} />
				</Button>
				{!props.task.isCompleted && (
					<Button
						buttonType={'defaultButton'}
						onClick={() => props.updateTask(props.task)}
					>
						<CheckCircle className={styles.completeButton} />
					</Button>
				)}
			</div>
		</div>
	);
}
